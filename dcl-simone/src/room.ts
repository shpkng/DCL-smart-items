import ButtonCreator from "MUA/Button/index";
import NPCUtils from "MUA/NPC/index"

const root = new Entity("aerocraft")
root.addComponent(new Transform({
    position: new Vector3(1, 0, 1)
}))

const box = new Entity("box")
box.addComponent(new Transform({
    position: new Vector3(5, 0, 0)
}))
box.addComponent(new BoxShape())
box.setParent(root)

const body = new Entity("1")
body.addComponent(new Transform({
    position: new Vector3(0, 0, 0)
}))
body.addComponent(new GLTFShape("models/aerocraft/001.glb"))
body.setParent(root)
//
// const floor = new Entity("2")
// floor.addComponent(new Transform({
//     position: new Vector3(1, 1, 1)
// }))
// floor.addComponent(new GLTFShape("models/aerocraft/002.glb"))
// floor.setParent(root)

const front = new Entity("frontDoor")
front.addComponent(new Transform({
    position: new Vector3(3, 1, 0),
    rotation: Quaternion.Euler(34, 90, 0),
}))
front.addComponent(new GLTFShape("models/aerocraft/door.glb"))
front.setParent(root)

const back = new Entity("backDoor")
back.addComponent(new Transform({
    position: new Vector3(-3, 1, 0),
    rotation: Quaternion.Euler(34, 270, 0)
}))
back.addComponent(new GLTFShape("models/aerocraft/door.glb"))
back.setParent(root)

const left = new Entity("leftDoor")
left.addComponent(new Transform({
    position: new Vector3(0, 1, -3),
    rotation: Quaternion.Euler(34, 180, 0)
}))
left.addComponent(new GLTFShape("models/aerocraft/door.glb"))
left.setParent(root)

const right = new Entity("rightDoor")
right.addComponent(new Transform({
    position: new Vector3(0, 1, 3),
    rotation: Quaternion.Euler(34, 0, 0),
}))

right.addComponent(new GLTFShape("models/aerocraft/door.glb"))
right.setParent(root)

engine.addEntity(root)
