'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate({ Users }) {
      Transaction.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  Transaction.init(
    {
      operationType: {
        type: DataTypes.ENUM(['INCOME', 'CONSUMPTION']),
        allowNull: false,
      },
      sum: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
