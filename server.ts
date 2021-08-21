import * as express from 'express';    
import { MongoDBConnection } from './mongo';
   
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


export class AppServer {
    private _APP: any;
    constructor(private PORT: number, private dbConnection: MongoDBConnection) {
        this._APP = express();
    }

    start() {
        this.connectToDatabase().then(this.startServer.bind(this))
    }
    
    connectToDatabase() {
        return this.dbConnection.connectToDB();
    }
    
    startServer() {
        this._APP.listen(this.PORT, () => {
            console.log('Listening at ', this.PORT)
        });
        this._APP.use(express.json());
    }

    get APP() {
        return this._APP;
    }
}
