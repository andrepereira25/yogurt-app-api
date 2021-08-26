import * as uuid from "uuid";
import { Yogurt } from "../mongoose/model/Yogurts";

const content = "<p>Do laborum Lorem magna deserunt tempor nulla cupidatat adipisicing officia. Ad qui aliqua aliqua laboris. Anim aliquip nostrud dolore id commodo culpa incididunt eiusmod excepteur amet nisi officia reprehenderit anim. Officia magna enim aliquip tempor laborum voluptate nulla tempor Lorem ea sit. Qui ullamco dolor duis nostrud exercitation quis nisi culpa occaecat occaecat. Et deserunt excepteur enim aliqua ut enim ad ipsum esse ea veniam sit dolore.</p><p>Elit id amet et incididunt reprehenderit est pariatur veniam enim tempor deserunt ut tempor voluptate. Non adipisicing nulla consequat nisi velit ipsum consequat excepteur id elit labore labore elit. Adipisicing aliquip nostrud commodo consectetur incididunt laborum. Sunt anim nostrud laboris aliquip tempor tempor nisi sint tempor et dolor fugiat pariatur ipsum. Anim minim commodo ut dolor magna mollit reprehenderit est enim pariatur id voluptate nulla.</p>"
const yogurtsMocks: Yogurt[] = [
    {
        id: uuid.v4(),
        flavour: "beef",
        content,
        imgPath: "http://localhost:3000/api/file/beef.png"
    },
    {
        id: uuid.v4(),
        flavour: "chicken",
        content,
        imgPath: "http://localhost:3000/api/file/chicken.png"
    },
    {
        id: uuid.v4(),
        flavour: "pork",
        content,
        imgPath: "http://localhost:3000/api/file/pork.png"
    }
]

export default yogurtsMocks;