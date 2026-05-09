import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Branch = sequelize.define(
  "Branch",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: DataTypes.STRING,
    place: DataTypes.STRING,
    img: DataTypes.STRING,
    owner: DataTypes.STRING,
    ownerImg: DataTypes.STRING,
    description: DataTypes.TEXT,
    whyChoose: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    services: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    highlights: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    timing: {
      type: DataTypes.JSON,
      defaultValue: { days: "", hours: "" },
    },
  },
  {
    timestamps: true,
  }
);

export default Branch;