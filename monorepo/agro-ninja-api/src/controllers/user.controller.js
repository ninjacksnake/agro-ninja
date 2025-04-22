const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models/index").User;

const UserController = {
    findById: async function (req, res, next) {
        const id = req.body.id;
        if (!id || id == undefined) {
            res.status(404).send({ message: "User not found" })
        }
        try {
            const user = await User.findByPk(id);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.send(404).send({ message: "something went wrong, try again later" })
        }
    },
    find: async function (req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.log(error)
            res.send(404).send({ message: "something went wrong, try again later" })
        }
    },
    create: async function (req, res, next) {
        try {
            const user = req.body;
            // hash the password before saving it to the database
            const saltRounds = 10;
            bcrypt.hash(user.password, saltRounds, async function (err, hash) {
                if (err) {
                    console.log(err);
                    res.status(404).send({ message: "something went wrong, try again later" })
                }
                user.password = hash;
                user.role == undefined ? user.role = 'user' : user.role = user.role;
                user.isDeleted == undefined ? user.isDeleted = 0 : user.isDeleted = user.isDeleted;
                const newUser = await User.create(user);
                newUser.save();
                res.status(201).send({ message: "User created" })
            });
        } catch (error) {
            console.log(error);
            //TODO: manejar el error de validacion de dat
            res.status(404).send({ message: "something went wrong, try again later" })
        }

    },
    update: async function (req, res, next) {
        try {
            const id = req.body.id;
            console.log(id);
            if (!id || id == undefined) {
                res.send(404).send({ message: "something went wrong, try again later" })
            }
            const userData = req.body;
            const user = await User.findByPk(id);
            user.update(userData);
            user.save();
            res.status(202).send({ message: "User updated" })
        } catch (error) {
            console.log(error);
            res.send(404).send({ message: "something went wrong, try again later" })
        }

    },
    delete: async function (req, res, next) {
        try {
            const id = req.body.id;
            if (!id || id == undefined) {
                res.send(404).send({ message: "something went wrong, try again later" })
            }
            const user = await User.findByPk(id);
            user.isDeleted(1);
            user.save();
            res.status(202).send({ message: "User deleted" })
        } catch (error) {
            res.send(404).send({ message: "something went wrong, try again later" })
        }

    },
}

module.exports = UserController;