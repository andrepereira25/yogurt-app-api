"use strict";
//const mongo = require('mongodb').MongoClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnection = void 0;
// mongo.connect(db_connection_url, (err, client) => {
//     if (err) return console.error(err)
//     const db = client.db('blog');
//     const posts = db.collection('posts')
// })
const mongodb_1 = require("mongodb");
class MongoDBConnection {
    DB_CONNECTION_URL;
    db_connection;
    blog_db;
    posts_collection;
    constructor(DB_CONNECTION_URL) {
        this.DB_CONNECTION_URL = DB_CONNECTION_URL;
        this.db_connection = new mongodb_1.MongoClient(this.DB_CONNECTION_URL);
    }
    connectToDB() {
        return this.db_connection.connect().then((client) => {
            this.blog_db = client.db('blog');
            this.posts_collection = this.blog_db.collection('posts');
            console.log('Connection to DB sucessfull!');
        }).catch((e) => {
            console.log('Could not connect to DB: ', e);
        });
    }
    insertBlogPost() {
    }
}
exports.MongoDBConnection = MongoDBConnection;
