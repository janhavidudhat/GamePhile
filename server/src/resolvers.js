const { BoardGame } = require('../models')

const resolvers = {
    Query: {
      GamesForHome: async () => {
        try {
          return await BoardGame.findAll();
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },
    Mutation: {
      async createBoardGame(_, { input }) {
        try {
          const newBoardGame = await BoardGame.create(input);
          return newBoardGame;
        } catch (error) {
          console.error('Error creating board game:', error);
          throw new Error('Failed to create board game');
        }
      },
      async updateBoardGame(_, { id, input }, { models }) {
        const [updated] = await models.BoardGame.update(input, {
          where: { id },
          returning: true,
        });
        if (!updated) {
          throw new Error('Game not found');
        }
        return updated[1]; // The updated game object
      },
    },
  };
  
  module.exports = resolvers;
  