import express from "express";
import sbd from "./databaseConn.js";

const router = express.Router();

process.on('uncaughtException', function (err) {
  console.log(err);
});

export default router