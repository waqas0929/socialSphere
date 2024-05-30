import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import userModel from "./userModel.js";

const postModel = sequelize.define("post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: { model: userModel, key: "id" },
  },
});

export default postModel;
