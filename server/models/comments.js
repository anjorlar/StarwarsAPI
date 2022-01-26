
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Title, {
      foreignKey: 'titleId',
      onDelete: 'CASCADE',
    });
  };
  return Comment;
};