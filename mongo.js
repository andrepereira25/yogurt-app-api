"use strict";
//const mongo = require('mongodb').MongoClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnection = void 0;
const mongoose_1 = require("mongoose");
const posts_1 = require("./default_mock_data/posts");
const yogurts_1 = require("./default_mock_data/yogurts");
const BlogPost_1 = require("./mongoose/model/BlogPost");
const Yogurts_1 = require("./mongoose/model/Yogurts");
class MongoDBConnection {
    DB_CONNECTION_URL;
    db_connection;
    blog_db;
    db;
    models = new Map();
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
        return this.db_connection
            .connect(this.DB_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((e) => {
            return e;
        });
    }
    getFlavour(flavour) {
        const model = this.models.get('yogurts');
        return model.find({ flavour: flavour }, this.hideMongoID());
    }
    getFlavours() {
        const model = this.models.get('yogurts');
        const config = this.hideMongoID();
        config['content'] = 0;
        config['imagePath'] = 0;
        config['id'] = 0;
        return model.find({}, config);
    }
    getPosts(size) {
        const model = this.models.get('posts');
        return model.find({}, this.hideMongoID()).sort({ date: -1 }).limit(!isNaN(Number(size)) && Number(size) || null);
    }
    getPost(itemId) {
        const model = this.models.get('posts');
        return model.find({ id: itemId }, this.hideMongoID());
    }
    injest() {
        return Promise.resolve(this.injestData());
    }
    injestData() {
        const postsModel = this.models.get('posts');
        const yogurtsModel = this.models.get("yogurts");
        return Promise.all([postsModel.insertMany(posts_1.default), yogurtsModel.insertMany(yogurts_1.default)]);
    }
    cleanDB() {
        const postsModel = this.models.get('posts');
        const yogurtsModel = this.models.get('yogurts');
        return Promise.all([postsModel.deleteMany(), yogurtsModel.deleteMany()]);
    }
    hideMongoID() {
        return { _id: 0, __v: 0 };
    }
    createModels() {
        this.models.set('posts', this.db_connection.model('posts', BlogPost_1.BlogPostSchema));
        this.models.set('yogurts', this.db_connection.model('yogurts', Yogurts_1.YogurtSchema));
    }
}
exports.MongoDBConnection = MongoDBConnection;
