import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img: DataTypes.STRING,
    ownerImg: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    benefits: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Product;