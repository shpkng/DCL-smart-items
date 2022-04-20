import {MUARotatorSystem} from "./system";
import {MUARotatorComponent} from "./component";

export type Props = {
    angularSpeed: number,
    axis: string,
    target: string,
}

export class MUARotator implements IScript<Props> {
    init(args: { inventory: IInventory; }): void {
        engine.addSystem(new MUARotatorSystem())
    }

    spawn(host: Entity, props: Props, channel: IChannel): void {
        let target
        for (const entity in engine.entities) {
            const ent = engine.entities[entity] as Entity
            if (ent.name == props.target)
                target = ent
        }
        const component = host.addComponent(new MUARotatorComponent(props.angularSpeed, props.axis, target))
        channel.request<string>("stageId", (reply: string) => {
            component.setState(reply)
        })
        channel.reply("stageId", () => component.getState())
    }
}