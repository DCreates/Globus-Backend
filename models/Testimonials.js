import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Testimonial = sequelize.define(
  "Testimonial",
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
    role: DataTypes.STRING,
    company: DataTypes.STRING,
    image: DataTypes.STRING,
    quote: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default Testimonial;