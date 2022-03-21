import { Sequelize } from "sequelize";

const db = new Sequelize("tsrestserver", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //   logging: false,
});

export default db;
