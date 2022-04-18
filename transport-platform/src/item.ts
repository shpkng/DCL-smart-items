import {TransportPlatformSystem} from "./system"
import {TransportPlatformUpdateComponent} from "./component";

export type Props = {
    speed: number
    stageJson: string
    platform: string
    mode: string
}

export class TransportPlatform implements IScript<Props> {
    init(args: { inventory: IInventory; }): void {
        engine.addSystem(new TransportPlatformSystem())
    }

    spawn(host: Entity, props: Props, channel: IChannel): void {

        let target
        for (const entity in engine.entities) {
            const ent = engine.entities[entity] as Entity
            if (ent.name == props.platform)
                target = ent
        }
        const component = host.addComponent(new TransportPlatformUpdateComponent(props.speed, props.stageJson, target, target.addComponentOrReplace(new Transform())))
        const box = host.addComponentOrReplace(new BoxShape())
        box.visible = false
        channel.request<string>("stageId", reply => {
            component.setStageInfo(reply.split(','))
        })
        channel.reply("stageId", () => component.getStageInfo())
    }

}