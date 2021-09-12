module.exports = (sequelize, Sequelize) => {
  const { Model } = Sequelize;

  class CryptoCompare extends Model {}

  CryptoCompare.init({
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    data: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'CryptoCompare',
    tableName: 'cryptocompares',
    timestamps: false,
  });
  CryptoCompare.getLastData = function () {
    return this.findOne({
      attributes: ['created_at', 'data'],
      order: [['created_at', 'DESC']],
      raw: true,
    });
  };
  return CryptoCompare;
};
