"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServer = void 0;
const express = require("express");
//    app.get('/', (req, res) => {
//        posts.find().toArray().then((value) => {
//            console.log(value)
//            res.send(value)
//        });
//     })
//     app.post('/flavour', (req, res) => {
//         posts.insertOne(req.body)
//         .then(result => {
//         console.log(result)
//         })
//         .catch(error => console.error(error))
//         res.send(req.body)
//     })
//     console.log('Connected to Database')
//     })
class AppServer {
    PORT;
    dbConnection;
    _APP;
    constructor(PORT, dbConnection) {
        this.PORT = PORT;
        this.dbConnection = dbConnection;
        this._APP = express();
    }
    start() {
        this.connectToDatabase().then(this.startServer.bind(this));
    }
    connectToDatabase() {
        return this.dbConnection.connectToDB();
    }
    startServer() {
        this._APP.listen(this.PORT, () => {
            console.log('Listening at ', this.PORT);
        });
        this._APP.use(express.json());
    }
    get APP() {
        return this._APP;
    }
}
exports.AppServer = AppServer;
