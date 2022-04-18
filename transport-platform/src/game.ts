import {Props, TransportPlatform} from "./item";
import {Spawner} from "../node_modules/decentraland-builder-scripts/spawner"

const platform = new TransportPlatform()
const spawner = new Spawner<Props>(platform)

const sphere = new Entity("sphere")
sphere.addComponent(new SphereShape())
engine.addEntity(sphere)

spawner.spawn("test", new Transform({
        position: new Vector3(0, 0, 0)
    }),
    {
        speed: 1,
        stageJson: "[{\"x\":0,\"y\":0,\"z\":0},{\"x\":0,\"y\":2,\"z\":0}]",
        platform: "sphere",
        mode: "rewind"
    })
