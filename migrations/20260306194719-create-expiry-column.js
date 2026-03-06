'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.addColumn('users','expiresAt', { 
        type: Sequelize.INTEGER 
      });
     
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users','expiresAt');
  }
};
