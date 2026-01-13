const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models/user");



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
            console.log(user);
            
            // Validate required fields
            if (!user.email || !user.password || !user.firstName || !user.lastName || !user.phoneNumber) {
                return res.status(400).send({ message: "Missing required fields" });
            }
            
            // check if the user already exists
            const existingUser = await User.findOne({ where: { email: user.email } });
            if (existingUser) {
                return res.status(400).send({ message: "User already exists" });    
            }
            
            // hash the password before saving it to the database.
            const saltRounds = 10;
            const hash = await bcrypt.hash(user.password, saltRounds);
            
            // Prepare user data
            const userData = {
                email: user.email,
                password: hash,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                role: user.role || 'user',
                isDeleted: user.isDeleted !== undefined ? Boolean(user.isDeleted) : false
            };
            
            const newUser = await User.create(userData);
            res.status(201).send({ message: "User created", user: { id: newUser.id, email: newUser.email } });
        } catch (error) {
            console.log('Error creating user:', error);
            // Handle Sequelize validation errors
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).send({ message: "Validation error", errors: error.errors.map(e => e.message) });
            }
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).send({ message: "User with this email already exists" });
            }
            res.status(500).send({ message: "something went wrong, try again later" });
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

    hashPassword :  function(password) {
        const saltRounds = 10;
        return  bcrypt.hashSync(password, saltRounds);
    }
}

module.exports = UserController;