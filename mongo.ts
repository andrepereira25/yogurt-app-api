//const mongo = require('mongodb').MongoClient;

// mongo.connect(db_connection_url, (err, client) => {
//     if (err) return console.error(err)
//     const db = client.db('blog');
//     const posts = db.collection('posts')
    
// })

import { Collection, Db, MongoClient } from 'mongodb'
export class MongoDBConnection {
    private db_connection: MongoClient;
    private blog_db: Db;
    private posts_collection: Collection<Document>

    constructor(private DB_CONNECTION_URL: string) {
        this.db_connection = new MongoClient(this.DB_CONNECTION_URL);
    }

    connectToDB() {
        
        return this.db_connection.connect().then((client) => {
           this.blog_db = client.db('blog');
           this.posts_collection = this.blog_db.collection('posts');
           console.log('Connection to DB sucessfull!')
        }).catch((e) => {
            console.log('Could not connect to DB: ', e)
        });    
    }

    insertBlogPost() {
        
    }
}