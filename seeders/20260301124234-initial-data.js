'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('users', [{
        name: 'somiya',
        email: 'somiya@gmail.com',
        password:'bhvbjf',
        createdAt: '2/2/2025',
        updatedAt:'6/3/2025'
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('users', null, {});

  }
};
