'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: "Michael",
      lastName: "Fermin",
      email: "michaelv.fermin@gmail.com",
      password: "12345678", // Consider hashing this password
      role: "admin",
      phoneNumber: "8297286407",
      isDeleted: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Users', null, {});
  }
};
