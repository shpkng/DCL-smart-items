import {Props, MUAMover} from "./item";
import {Spawner} from "../node_modules/decentraland-builder-scripts/spawner"

const platform = new MUAMover()
const spawner = new Spawner<Props>(platform)

const sphere = new Entity("sphere")
sphere.addComponent(new BoxShape())
engine.addEntity(sphere)

spawner.spawn("test", new Transform({
        position: new Vector3(0, 0, 0)
    }),
    {
        speed: 5,
        stageJson: "[{\"pos\":{\"x\":8,\"y\":0.5,\"z\":8},\"stayTime\":1}," +
            "{\"pos\":{\"x\":8,\"y\":5,\"z\":8},\"stayTime\":1}," +
            "{\"pos\":{\"x\":13,\"y\":5,\"z\":13},\"stayTime\":5}," +
            "{\"pos\":{\"x\":13,\"y\":1,\"z\":13},\"stayTime\":1}]",
        platform: "sphere",
        mode: "rewind"
    })
