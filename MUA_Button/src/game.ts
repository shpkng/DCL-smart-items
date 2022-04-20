import {MUAButton, Props} from "./item";
import {Spawner} from "../node_modules/decentraland-builder-scripts/spawner";

const button = new MUAButton()
const spawner = new Spawner<Props>(button)

const cube = new Entity("cube")
cube.addComponentOrReplace(new BoxShape())
engine.addEntity(cube)

spawner.spawn("test", new Transform({
        position: new Vector3(8, 0.5, 8)
    }),
    {
        target: "cube",
        hint: "Click to interact",
        distance: 5
    })
