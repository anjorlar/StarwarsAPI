
module.exports = (sequelize, DataTypes) => {
  const Title = sequelize.define('Title', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Title.associate = (models) => {
    Title.hasMany(models.Comment, {
      foreignKey: 'titleId',
      as: 'Comments',
    });
  };
  return Title;
};