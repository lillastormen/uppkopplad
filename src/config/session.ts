import dotenv from "dotenv";
import session from "express-session";
import MySQLSession from "express-mysql-session";
import { reqEnv } from "../db/mysql.ts";

dotenv.config();

export function createSession() {
  const mySQLStore = MySQLSession(session);

  const store = new mySQLStore({
    host: reqEnv("DB_HOST"),
    port: Number(process.env.DB_PORT),
    user: reqEnv("DB_USER"),
    password: reqEnv("DB_PASSWORD"),
    database: reqEnv("DB_DATABASE"),
  });

  return session({
    name: "sid",
    secret: process.env.SESSION_SECRET! as string,
    resave: false,
    saveUninitialized: false,
    store,
    rolling: true, //refresh cookie expiration on each request - stays loggrf in while active
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
}
