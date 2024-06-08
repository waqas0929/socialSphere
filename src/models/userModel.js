import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";

const userModel = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  failedLoginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  accountLockUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isPermanentlyLocked:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
});

export default userModel;
