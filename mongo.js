"use strict";
//const mongo = require('mongodb').MongoClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnection = void 0;
const mongoose_1 = require("mongoose");
const BlogPost_1 = require("./mongoose/model/BlogPost");
class MongoDBConnection {
    DB_CONNECTION_URL;
    db_connection;
    blog_db;
    db;
    posts_collection;
    constructor(DB_CONNECTION_URL) {
        this.DB_CONNECTION_URL = DB_CONNECTION_URL;
        this.db_connection = new mongoose_1.Mongoose(); //new MongoClient(this.DB_CONNECTION_URL);        
        this.db_connection.connection.once('open', _ => {
            console.log('Connection to DB sucessfull at ', this.DB_CONNECTION_URL);
            this.createModels();
        });
        this.db_connection.connection.on('error', e => {
            console.log('Connection error: ', e);
        });
    }
    connectToDB() {
        // return this.db_connection.connect()
        return this.db_connection.connect(this.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((e) => {
            return e;
        });
    }
    getPosts() {
        return this.posts_collection.find().toArray().then((posts) => {
            console.log(posts);
            return posts;
        });
    }
    setDefaultMockData() {
        // this.posts_collection.insertMany(blogPosts).then((err, succ) => {
        //     if (err) {
        //         console.log("Couldn't add new items to the database, ", err);
        //     }
        // })
    }
    createModels() {
        this.db_connection.model('posts', BlogPost_1.BlogPostSchema);
    }
}
exports.MongoDBConnection = MongoDBConnection;
