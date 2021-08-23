//const mongo = require('mongodb').MongoClient;

// mongo.connect(db_connection_url, (err, client) => {
//     if (err) return console.error(err)
//     const db = client.db('blog');
//     const posts = db.collection('posts')
    
// })

import { Collection, Db, MongoClient } from 'mongodb';
import { Model, Mongoose, Schema } from 'mongoose';
import blogPosts from './default_mock_data/posts';
import yogurtsMocks from './default_mock_data/yogurts';
import { BlogPostSchema } from './mongoose/model/BlogPost';
import { YogurtSchema } from './mongoose/model/Yogurts';
export class MongoDBConnection {
    private db_connection: Mongoose;
    private blog_db: Db
    private db
    private models = new Map<string, Model<any>>();
    private posts_collection: Collection<Document>

    constructor(private DB_CONNECTION_URL: string) {
        this.db_connection = new Mongoose();//new MongoClient(this.DB_CONNECTION_URL);        
        this.db_connection.connection.once('open', _ => {
            console.log('Connection to DB sucessfull at ', this.DB_CONNECTION_URL);
            this.createModels();
        })
        this.db_connection.connection.on('error', e => {
            console.log('Connection error: ', e)
        })
    }
    
    connectToDB() {
        return this.db_connection
                    .connect(
                        this.DB_CONNECTION_URL,
                        {
                            useNewUrlParser: true, 
                            useUnifiedTopology: true
                        }
                    ).then((e) => {
                        return e
                    });    
    }

    getFlavour(flavour:string) {
        const model = this.models.get('yogurts');
        return model.find({ flavour: flavour },this.hideMongoID());
    }
    getFlavours() {
        const model = this.models.get('yogurts');
        const config = this.hideMongoID();
        config['content'] = 0;
        config['imagePath'] = 0;
        config['id'] = 0;  
        return model.find({},config)
    }
    getPosts(size?:string) {
        const model = this.models.get('posts');
        return model.find({},this.hideMongoID()).sort({date: -1}).limit( !isNaN(Number(size)) && Number(size) || null)
    }
    
    getPost(itemId: string) {
        const model = this.models.get('posts');
        return model.find({ id: itemId }, this.hideMongoID())
    }

    injest() {
        return Promise.resolve(this.injestData());
    }

    private injestData() {
        const postsModel = this.models.get('posts');
        const yogurtsModel = this.models.get("yogurts");
            return Promise.all(
                [postsModel.insertMany(blogPosts), yogurtsModel.insertMany(yogurtsMocks)]
            );
            
    }

    cleanDB() {
        const postsModel = this.models.get('posts');
        const yogurtsModel = this.models.get('yogurts');
        return Promise.all(
            [postsModel.deleteMany(),yogurtsModel.deleteMany()]
        );
    }

    private hideMongoID() {
        return {_id: 0, __v: 0};
    }

    private createModels() {
        this.models.set('posts', this.db_connection.model('posts', BlogPostSchema));
        this.models.set('yogurts', this.db_connection.model('yogurts', YogurtSchema));
    }
}