import ButtonCreator from "MUA/Button/index";
import Mover from "./MUA/Mover/index";
import Rotator from "./MUA/Rotator/index";

enum Status {
    Open,
    Closed,
    Opening,
    Closing
}

export class Room extends Entity {

    private readonly root: Entity;
    private status: Status = Status.Closed;
    private upPosition: Vector3;
    private downPosition: Vector3;
    private body: Entity;
    private front: Entity;
    private back: Entity;
    private left: Entity;
    private right: Entity;

    moveUp(onEnd?: () => void) {
        Mover.to(this.root, 1, this.upPosition, onEnd)
    }

    moveDown(onEnd?: () => void) {
        Mover.to(this.root, 1, this.downPosition, onEnd)
    }

    open(onEnd?: () => void) {
        if (this.status === Status.Open || this.status === Status.Opening)
            return;
        this.status = Status.Opening;
        const angularSpeed = 20
        Rotator.to(this.left, angularSpeed, Quaternion.Euler(120, 180, 0))
        Rotator.to(this.right, angularSpeed, Quaternion.Euler(120, 0, 0))
        Rotator.to(this.front, angularSpeed, Quaternion.Euler(120, 90, 0), onEnd)
        Rotator.to(this.back, angularSpeed, Quaternion.Euler(120, 270, 0), () => {
            this.status = Status.Open
        })
    }

    close(onEnd?: () => void) {
        if (this.status === Status.Closed || this.status === Status.Closing)
            return;
        this.status = Status.Closing;
        const angularSpeed = 20
        Rotator.to(this.left, angularSpeed, Quaternion.Euler(34, 180, 0))
        Rotator.to(this.right, angularSpeed, Quaternion.Euler(34, 0, 0))
        Rotator.to(this.front, angularSpeed, Quaternion.Euler(34, 90, 0), onEnd)
        Rotator.to(this.back, angularSpeed, Quaternion.Euler(34, 270, 0), () => {
            this.status = Status.Closed
        })
    }

    constructor(name: string, downPosition: Vector3, upPosition: Vector3, rotation: Quaternion) {
        super()
        this.upPosition = upPosition
        this.downPosition = downPosition
        this.root = new Entity("aerocraft")
        this.root.addComponent(new Transform({
            position: downPosition,
            rotation: rotation,
        }))
        engine.addEntity(this.root)

        // const buttonUp = this.addPart({
        //     name: "buttonUp",
        //     model: "models/aerocraft/button.glb",
        //     position: upPosition,
        //     rotation: Quaternion.Euler(0, 0, 0),
        // })
        //
        // const buttonDown = this.addPart({
        //     name: "buttonDown",
        //     model: "",
        //     position: new Vector3(0, 0, 0),
        //     rotation: Quaternion.Euler(0, 0, 0),
        // })
        // ButtonCreator.setButton(buttonDown, e => {
        //
        // }, "Go Down")

        const doorPath = "models/aerocraft/door.glb"
        this.front = this.addPart({
            name: "frontDoor",
            model: doorPath,
            position: new Vector3(2.3, 0, 0),
            rotation: Quaternion.Euler(34, 90, 0),
        })

        this.back = this.addPart({
            name: "backDoor",
            model: doorPath,
            position: new Vector3(-2.3, 0, 0),
            rotation: Quaternion.Euler(34, 270, 0),
        })

        this.left = this.addPart({
            name: "leftDoor",
            model: doorPath,
            position: new Vector3(0, 0, -2.3),
            rotation: Quaternion.Euler(34, 180, 0),
        })

        this.right = this.addPart({
            name: "rightDoor",
            model: doorPath,
            position: new Vector3(0, 0, 2.3),
            rotation: Quaternion.Euler(34, 0, 0),
        })


        this.body = this.addPart({
            name: "body",
            model: "models/aerocraft/001.glb",
            position: new Vector3(0, 0, 0),
            rotation: Quaternion.Euler(0, 0, 0),
        })
    }

    addPart(args
                :
                {
                    name: string,
                    model
                        :
                        string,
                    position
                        :
                        Vector3,
                    rotation
                        :
                        Quaternion
                }
    ):
        Entity {
        const t = new Entity(args.name)
        t.addComponent(new GLTFShape(args.model))
        t.addComponent(new Transform({
            position: args.position,
            rotation: args.rotation
        }))
        t.setParent(this.root)
        return t
    }
}
