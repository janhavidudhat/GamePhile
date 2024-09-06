'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BoardGame extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  BoardGame.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numberOfPlayers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'BoardGame', // Ensure this matches the name used in index.js
    tableName: 'boardGameTable', // Ensure this matches your actual table name
  });

  return BoardGame;
};
