import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.SQLITE_STORAGE || "/tmp/database.sqlite",
  dialectModule: sqlite3,
  logging: false, // Set to console.log to see SQL queries
});

export { sequelize };
export default sequelize;