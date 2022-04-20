import {Props, MUARotator} from "./item"
import {Spawner} from "../node_modules/decentraland-builder-scripts/spawner"

const rotator = new MUARotator()
const spawner = new Spawner<Props>(rotator)

const cube = new Entity("cube")
cube.addComponent(new BoxShape())
cube.addComponent(new Transform({
    position: new Vector3(1, 1, 1)
}))
engine.addEntity(cube)

spawner.spawn("test", new Transform({
    position: new Vector3(1, 1, 1)
}), {
    angularSpeed: 30,
    axis: "y",
    target: "cube"
})