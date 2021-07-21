import pkg from 'sequelize';

const { DataTypes: DT } = pkg;

export default (sequelize) => {
  return sequelize.define(
    'UserRole',
    {
      userroleid: {
        type: DT.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      roleid: {
        type: DT.INTEGER,
        allowNull: false,
        references: {
          model: 'Role',
          key: 'roleid',
        },
      },
      userid: {
        type: DT.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'User',
          key: 'userid',
        },
      },
      adminid: {
        type: DT.INTEGER,
        references: {
          model: 'User',
          key: 'userid',
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
