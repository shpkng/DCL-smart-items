import Patrol from "./MUA/Patrol/index"
import Rotate from "./MUA/Rotator/index"
import NPC from "./MUA/NPC/index"
import Button from "./MUA/Button/index"
import Scene from "./MUA/Scene/index"
import {getUserData} from "@decentraland/Identity"

//region
const npcCube = new Entity("npcCube")
const gltfShape = new GLTFShape("src/MUA/Models/cube.glb")
gltfShape.withCollisions = true
npcCube.addComponent(gltfShape)
npcCube.addComponent(new Transform({
    position: new Vector3(8, 1, 8)
}))
engine.addEntity(npcCube)

const patrolCube = new Entity("patrolCube")
patrolCube.addComponent(new BoxShape())
patrolCube.addComponent(new Transform({
    position: new Vector3(1, 1, 1)
}))
engine.addEntity(patrolCube)

const rotateCube = new Entity("rotateCube")
rotateCube.addComponent(new BoxShape())
rotateCube.addComponent(new Transform({
    position: new Vector3(3, 1, 3)
}))
engine.addEntity(rotateCube)
//endregion

// set patrol path
Patrol.setPatrol(patrolCube, 1, [new Patrol.Data(1, 1, 1, 1), new Patrol.Data(1, 3, 1, 1), new Patrol.Data(1, 5, 1, 1)], Patrol.Rewind)

// set rotation
Rotate.setRotation(rotateCube, 50, Rotate.AxisX)

let data
getUserData().then(e => {
    data = e
    setUpNPC()
})

// create a button
Button.setButton(patrolCube, e => Scene.teleportInScene(new Vector3(5, 5, 5), patrolCube), "Click Me!", 10)

// set up a NPC
function setUpNPC() {
    NPC.create(npcCube, {
        messages: [{
            text: `hello ${data.displayName}`
        }, {
            text: "do you like MUA DAO?",
        }, {
            text: "if you do, why not go to our website!",
            buttons: [{
                goToDialog: "goToWebsite",
                label: "OK",
                // triggeredActions: () => openExternalURL("https://staging.muadao.build/tutorial")
                triggeredActions: () => Scene.teleportInScene(new Vector3(1, 1, 1), rotateCube)
            }, {
                goToDialog: "goodBye",
                label: "Nope",
            }],
            isQuestion: true,
        }, {
            text: "Go to website",
            name: "goToWebsite",
            isEndOfDialog: true,
        }, {
            text: "OK, have fun anyway!",
            name: "goodBye",
            isEndOfDialog: true
        }],
        portrait: "https://s3.bmp.ovh/imgs/2022/04/20/a02dc1d133598176.jpg"
    })
}

