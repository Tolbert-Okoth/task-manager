const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');

// Define the relationship
// A User can have many Tasks
User.hasMany(Task, {
  foreignKey: 'userId', // This will add a 'userId' column to the Task table
  onDelete: 'CASCADE', // If a user is deleted, delete their tasks too
});

// A Task belongs to one User
Task.belongsTo(User, {
  foreignKey: 'userId',
});

// Create a 'db' object to export all models and the sequelize connection
const db = {
  sequelize,
  Sequelize,
  User,
  Task,
};

module.exports = db; 