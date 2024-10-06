const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/MOCK_DATA.json');
class User extends Model{}

// Find the lint for sequelize ;-; or node in general
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true // Enables createdAt and updatedAt fields
    //ironically you decided not to add it in the database
    //cause it confused you
});