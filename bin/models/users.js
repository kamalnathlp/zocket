import pkg from 'sequelize';
const { DataTypes: DT } = pkg;

export default (sequelize) => {
  return sequelize.define(
    'User',
    {
      userid: {
        type: DT.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
      },
      email: {
        type: DT.STRING(50),
        allowNull: false,
        unique: true,
      },
      mobile: {
        type: DT.STRING(15),
      },
      first_name: {
        type: DT.STRING(50),
        allowNull: false,
      },
      isAdmin: {
        type: DT.INTEGER(2),
        defaultValue: 0,
      },
      adminId: {
        type: DT.INTEGER(11),
      },
      last_name: { type: DT.STRING(15) },
      middle_name: { type: DT.STRING(30) },
      address: { type: DT.STRING(50) },
      pincode: { type: DT.STRING(15) },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
