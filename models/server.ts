import express, { Application } from "express";
import useRoutes from "../routes/user";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: String;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.dbConnetion();
    this.middlewares();
    this.routes();
  }

  //Conectar DB
  async dbConnetion() {
    try {
      await db.authenticate();
      console.log("Base de datos conectada!");
      await db.sync({ force: true });
      console.log("Modelos sincronizados con exito.");
    } catch (error) {
      throw new Error(<string>error);
    }
  }

  middlewares() {
    //cors
    this.app.use(cors());
    // Parse body
    this.app.use(express.json());
    // Public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, useRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
