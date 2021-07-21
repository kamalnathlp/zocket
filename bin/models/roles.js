import pkg from 'sequelize';
const { DataTypes: DT } = pkg;

export default (sequelize) => {
  return sequelize.define(
    'Role',
    {
      roleid: {
        type: DT.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: DT.STRING(30),
        allowNull: false,
      },
      role_description: {
        type: DT.STRING(50),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
