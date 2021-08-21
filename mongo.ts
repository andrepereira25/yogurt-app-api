//const mongo = require('mongodb').MongoClient;

// mongo.connect(db_connection_url, (err, client) => {
//     if (err) return console.error(err)
//     const db = client.db('blog');
//     const posts = db.collection('posts')
    
// })

import { Collection, Db, MongoClient } from 'mongodb';
import { Mongoose } from 'mongoose';
import blogPosts from './default_mock_data/posts';
import { BlogPostSchema } from './mongoose/model/BlogPost';
export class MongoDBConnection {
    private db_connection: Mongoose;
    private blog_db: Db
    private db
    private posts_collection: Collection<Document>

    constructor(private DB_CONNECTION_URL: string) {
        this.db_connection = new Mongoose();//new MongoClient(this.DB_CONNECTION_URL);        
        this.db_connection.connection.once('open', _ => {
            console.log('Connection to DB sucessfull at ', this.DB_CONNECTION_URL);
            this.createModels();
            const post = new posts({
                id: 'ahbsdiabsdo',
                title: 'OLa',
                description: 'jansodad',
                content: 'content',
                date: new Date().getTime()
            });
            post.save((err, res) => {
                if (err) console.log('ERROR' + err);
                console.log(res)
            })
        })
        this.db_connection.connection.on('error', e => {
            console.log('Connection error: ', e)
        })
    }
    
    connectToDB() {
        // return this.db_connection.connect()
        return this.db_connection.connect(this.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((e) => {
          
            
            return e
        });    
    }

    getPosts() {
        return this.posts_collection.find().toArray().then((posts) => {
            console.log(posts);
            return posts;
        })
    }

    private setDefaultMockData() {
        // this.posts_collection.insertMany(blogPosts).then((err, succ) => {
        //     if (err) {
        //         console.log("Couldn't add new items to the database, ", err);
        //     }
        // })
    }

    createModels() {
        this.db_connection.model('posts', BlogPostSchema);
    }
}