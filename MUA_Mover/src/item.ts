import {MUAMoverSystem} from "./system"
import {MUAMoverComponent} from "./component";

export type Props = {
    speed: number
    stageJson: string
    platform: string
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
            if (ent.name == props.platform)
                target = ent
        }
        const component = host.addComponent(new MUAMoverComponent(props.speed, props.stageJson, target, target.getComponentOrCreate(new Transform())))
        channel.request<string>("stageId", reply => {
            component.setStageInfo(reply)
        })
        channel.reply("stageId", () => component.getStageInfo())
    }
}