"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const content = "<p>Do laborum Lorem magna deserunt tempor nulla cupidatat adipisicing officia. Ad qui aliqua aliqua laboris. Anim aliquip nostrud dolore id commodo culpa incididunt eiusmod excepteur amet nisi officia reprehenderit anim. Officia magna enim aliquip tempor laborum voluptate nulla tempor Lorem ea sit. Qui ullamco dolor duis nostrud exercitation quis nisi culpa occaecat occaecat. Et deserunt excepteur enim aliqua ut enim ad ipsum esse ea veniam sit dolore.</p><p>Elit id amet et incididunt reprehenderit est pariatur veniam enim tempor deserunt ut tempor voluptate. Non adipisicing nulla consequat nisi velit ipsum consequat excepteur id elit labore labore elit. Adipisicing aliquip nostrud commodo consectetur incididunt laborum. Sunt anim nostrud laboris aliquip tempor tempor nisi sint tempor et dolor fugiat pariatur ipsum. Anim minim commodo ut dolor magna mollit reprehenderit est enim pariatur id voluptate nulla.</p>";
const description = content.replace("<p>", "").substring(0, 50) + "...";
const blogPosts = [
    {
        id: uuid.v4(),
        title: "First Dan's yogurt shop opened.",
        content,
        imgPath: "http://localhost:3000/file/beef.png",
        description,
        date: new Date(2020, 4, 21).getTime()
    },
    {
        id: uuid.v4(),
        title: "The most desired yogurt in the country.",
        content,
        imgPath: "http://localhost:3000/file/pork.png",
        description,
        date: new Date(2021, 2, 5).getTime()
    },
    {
        id: uuid.v4(),
        title: "A six month success.",
        content,
        imgPath: "/file/chicken.png",
        description,
        date: new Date(2020, 10, 13).getTime()
    }
];
exports.default = blogPosts;
