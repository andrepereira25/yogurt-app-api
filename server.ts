import * as express from 'express';   
import { Application } from 'express'
import { MongoDBConnection } from './mongo';
import * as cors from 'cors';
import * as multer from 'multer';
import * as uuid from 'uuid';
import * as fs from 'fs';

export class AppServer {
    private _APP: Application;
    private uploadConf: any;
    private upload: any;
    constructor(private PORT: number, private dbConnection: MongoDBConnection) {
        this._APP = express();
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './resources/files/')
            },
            filename: function (req, file, cb) {                
              const uniqueSuffix = uuid.v4();
              cb(null, uniqueSuffix + "-" + file.originalname)
            }
          })
        this.uploadConf = multer({ storage: storage });
        this.upload = this.uploadConf.single('name')
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
        this._APP.use(cors({origin: '*'}));
        this._APP.use(function (req, res, next) {
            res.setHeader(
              'Content-Security-Policy-Report-Only',
              "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
            );
            next();
          });
        this._APP.use(
            function(req,res,next){
                if (req.url.includes('/api/file')) {
                    next();
                    return;
                }
                const random = Math.floor(Math.random() * (3000 - 500 + 1)) + 500; 
                console.log(`A timeout of ${random}ms was added to ${req.url}`)
                setTimeout(next,random)
            }
        );

        this._APP.get('/', this.upload, (req,res) => {
            res.sendFile(__dirname + '/resources/index.html')
        //    res.send({
        //        status: "UP"
        //    })
        })

        this.onUpload();
        this.onGetFiles();
        this.onGetSlideshow();
        this.onSendEmail();
        this.onGetFlavour();
        this.onGetFlavours();
        this.onGetPost();
        this.onGetPosts();
        this.onInjest();
        this.onCleanDB();
    }

    private onUpload() {
        this._APP.post('/api/upload', this.upload, (req,res) => {
            const file = (req as any).file
            if (!file) {
                return res.status(404).send({
                    message: "No file to upload"
                })
            }
            this.upload(req, res, (e) => {
                console.log(e)
            })
            res.send(file);
        })
    }
    private onGetFiles() {
        this._APP.get('/api/file/:name', this.upload, (req,res) => {
            const fileName = req.params.name;
            const directoryPath = "./resources/files/";
            
            res.download(directoryPath + fileName, fileName, (err) => {
                if (err) {
                res.status(500).send({
                    message: "Could not download the file. " + err,
                });
                }
            });
        })
        this._APP.get('/api/file/slideshow/:name', this.upload, (req,res) => {
            
            const fileName = req.params.name;
            const directoryPath = "./resources/files/slideshow/";

            res.download(directoryPath + fileName, fileName, (err) => {
                if (err) {
                res.status(500).send({
                    message: "Could not download the file. " + err,
                });
                }
            });
        })
    }
    private onGetSlideshow() {
        this._APP.get('/api/slideshow', this.upload, (req,res) => {
            const directoryPath = "./resources/files/slideshow";
            
                fs.readdir(directoryPath, (err, files) => {
                    if (err) return res.status(500).send({ message: 'Could not get files'});
                    return res.status(200).send(files.map(file => `http://localhost:${this.PORT}/api/file/slideshow/${file}`))
                });
        })
    }

    private onSendEmail() {
        return this._APP.post('/api/contact', (req, res) => {
            const body = req.body;
            
            if (!body || !body.subject || !body.message || !body.email) {
                return res.status(400).send(this.buildError(400, 'Missing parameter in body'));
            }
            return res.status(200).send(this.buildResponse('SUCCESS', { message: 'Contact request successfull'}))
        })
    }

    private onGetFlavour() {
        return this._APP.get('/api/yogurts/flavours/:flavour', (req, res) => {
            this.dbConnection.getFlavour(req.params.flavour).then((flavour) => {
                res.status(200).send(this.buildResponse('SUCCESS', flavour))
            }).catch(e => {
                res.sendStatus(500);
            });
        })
    }
    private onGetFlavours() {
        return this._APP.get('/api/yogurts/flavours', (req, res) => {
            this.dbConnection.getFlavours().then((flavours) => {
                const data = flavours.map(item => item.flavour)
                res.status(200).send(this.buildResponse('SUCCESS', data, data.length))
            }).catch(e => {
                res.sendStatus(500);
            });
        })
    }

    private onGetPost() {
        return this._APP.get('/api/posts/:id', (req, res) => {
            this.dbConnection.getPost(req.params.id).then((post) => {
                res.status(200).send(this.buildResponse('SUCCESS', post))
            }).catch(e => {
                res.sendStatus(500);
            });
        })
    }

    private onGetPosts() {
        return this._APP.get('/api/posts', (req, res) => {
            const hasUnknownParam = Object.keys(req.query).filter(item => item !== 'size');
            if (hasUnknownParam.length) res.status(400).send(this.buildError(400, 'Unknows param(s) "' + hasUnknownParam.join(', ') + '"'));
            const size: string = (req.query && req.query.size) as string;
            this.dbConnection.getPosts(size).then((posts) => {
                res.status(200).send(this.buildResponse('SUCCESS', posts))
            }).catch(e => {
                res.sendStatus(500);
            });
        })
    }

    private onInjest() {
        this._APP.get('/api/injestion', (req, res) => {
                this.dbConnection.injest().then((injestedData) => {
                    const data = injestedData.flat();
                    res.status(200).send(this.buildResponse('SUCCESS', data, data.length));
                }).catch(e => {                    
                    console.log(e);
                    if (e.code === 11000) {                                              
                        res.status(400).send(this.buildError(e.code, 'Duplicate key "id"'))
                        return;
                    }
                    
                    res.sendStatus(500);
                    
                })
        })
    }
    
    private onCleanDB() {
        this._APP.get('/api/injestion/clean', (req, res) => {
            this.dbConnection.cleanDB().then((deletedData) => {
                const deletedCount = deletedData.map(i => i.deletedCount).reduce((acc, item) => {
                    return acc + item;
                })
                res.status(200).send(this.buildResponse('SUCCESS', {
                    deletedCount
                }));
            }).catch(e => {
                res.status(500).send();
            });
        })
    }

    private buildResponse(status: 'SUCCESS' | 'FAILED', data:any, itemCount?: number) {
        return {
            status,
            itemCount,
            data
        }
    }

    private buildError(key: number, message:string) {
        return {
            key,
            message
        }
    }

    private sortBy(property: string) {
        return (a: any, b: any) => {
            if (a[property] === b[property]) return 0;
            if (a[property] < b[property]) return 1;
            return -1;
        }
    }

    get APP() {
        return this._APP;
    }
}
