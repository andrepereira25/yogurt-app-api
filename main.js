"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const server_1 = require("./server");
const PORT = 3000;
const DB_CONNECTION_URL = "mongodb+srv://bacmy:bring12345!@bacmy.fzooe.mongodb.net/yogurt-app?retryWrites=true&w=majority";
const mongoDB = new mongo_1.MongoDBConnection(DB_CONNECTION_URL);
const server = new server_1.AppServer(PORT, mongoDB);
server.start();
