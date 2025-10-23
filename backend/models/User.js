const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Model options
  timestamps: true, // Adds createdAt and updatedAt fields

  // Hooks (logic that runs at a certain lifecycle event)
  hooks: {
    // This hook runs automatically before a new user is created
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

module.exports = User;