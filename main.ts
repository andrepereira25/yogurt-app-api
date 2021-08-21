import { MongoDBConnection } from './mongo';
import { AppServer } from './server';
const PORT = 3000;
const DB_CONNECTION_URL = "mongodb+srv://bacmy:bring12345!@bacmy.fzooe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongoDB = new MongoDBConnection(DB_CONNECTION_URL)

const server = new AppServer(PORT, mongoDB);

server.start();