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
        let target = engine.entities[props.platform] as Entity
        const component = host.addComponent(new MUAMoverComponent(props.speed, props.stageJson, target, target.getComponentOrCreate(Transform)))
        channel.request<string>("stageId", reply => {
            component.setStageInfo(reply)
        })
        channel.reply("stageId", () => component.getStageInfo())
    }
}