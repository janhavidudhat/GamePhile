'use strict';

/** @type {import('sequelize').Seeder} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('boardGameTable', [
      {
        title: 'Catan',
        description: 'A strategy board game where players collect and trade resources to build roads, settlements, and cities.',
        thumbnail: 'https://divisbyzero.com/wp-content/uploads/2010/01/251396042_2a279b4fc0_b.jpg',
        author: 'Klaus Teuber',
        length: 60,
        numberOfPlayers: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Ticket to Ride',
        description: 'A game where players collect cards of various types of train cars and use them to claim railway routes across a map.',
        thumbnail: 'https://example.com/ticket-to-ride-thumbnail.jpg',
        author: 'Alan R. Moon',
        length: 60,
        numberOfPlayers: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pandemic',
        description: 'A cooperative game where players work together to stop global outbreaks of diseases.',
        thumbnail: 'https://example.com/pandemic-thumbnail.jpg',
        author: 'Matt Leacock',
        length: 45,
        numberOfPlayers: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boardGameTable', null, {});
  },
};
