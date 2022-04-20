import {MUAMoverSystem} from "./system"
import {MUAMoverComponent} from "./component";

export type Props = {
    speed: number
    stageJson: string
    target: string
    mode: string
}

export class MUAMover implements IScript<Props> {
    init(args: { inventory: IInventory; }): void {
        engine.addSystem(new MUAMoverSystem())
    }

    spawn(host: Entity, props: Props, channel: IChannel): void {
        let target
        for (const entity in engine.entities) {
            const ent = engine.entities[entity] as Entity
            if (ent.name == props.target)
                target = ent
        }
        const component = host.addComponent(new MUAMoverComponent(props.speed, props.stageJson, props.mode, target, target.getComponent(Transform)))
        // [{"pos":{"x":8,"y":0.5,"z":8},"stayTime":1},{"pos":{"x":8,"y":5,"z":8},"stayTime":1},{"pos":{"x":13,"y":5,"z":13},"stayTime":5},{"pos":{"x":13,"y":1,"z":13},"stayTime":1}]
        channel.request<string>("stageId", reply => {
            component.setStageInfo(reply)
        })
        channel.reply("stageId", () => component.getStageInfo())
    }
}