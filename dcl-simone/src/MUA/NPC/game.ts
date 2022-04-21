import {NPCUtils, Props} from "./index";
////////import {Spawner} from "../node_modules/decentraland-builder-scripts/spawner";
////////
////////const npc = new MUADialogNPC()
////////const spawner = new Spawner<Props>(npc)
////////
////////const cube = new Entity("cube")
////////cube.addComponentOrReplace(new GLTFShape("models/cube.glb"))
////////cube.addComponentOrReplace(new Transform({
////////    position: new Vector3(8, 1, 8),
////////    scale: new Vector3(1, 1, 1)
////////}))
////////engine.addEntity(cube)
////////
////////spawner.spawn("test", new Transform({
////////        position: new Vector3(8, 0.5, 8)
////////    }),
////////    {
////////        linesJson: "[{\"text\":\"Hello,\",\"isEndOfDialog\":false},{\"text\":\"I really lo-ove cats\",\"isEndOfDialog\":true}]",
////////        target: "cube",
////////        portrait: "https://s3.bmp.ovh/imgs/2022/04/20/0893a17b91975a15.gif",
////////        pathJson: "[{\"x\":2,\"y\":0,\"z\":2},{\"x\":2,\"y\":0,\"z\":4},{\"x\":6,\"y\":0,\"z\":2}]",
////////        faceUser:true
////////    })