import {MUADialogNPC, Props} from "./item";
import {Spawner} from "../node_modules/decentraland-builder-scripts/spawner";

const npc = new MUADialogNPC()
const spawner = new Spawner<Props>(npc)

const cube = new Entity("cube")
cube.addComponentOrReplace(new GLTFShape("models/cube.glb"))
cube.addComponentOrReplace(new Transform({
  position: new Vector3(8, 1, 8),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(cube)

spawner.spawn("test", new Transform({
        position: new Vector3(8, 0.5, 8)
    }),
    {
        linesJson: "",
        target: "cube"
    })