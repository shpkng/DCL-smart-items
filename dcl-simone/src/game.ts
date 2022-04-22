import {Room} from "./room";
import Mover from "./MUA/Mover/index";

const room = new Room("1", new Vector3(5, 1, 5), new Vector3(5, 15, 5), Quaternion.Identity);
room.open(() => {

    room.close(() => {
        room.moveUp(() => {
            room.moveDown()
        })
    })
})
