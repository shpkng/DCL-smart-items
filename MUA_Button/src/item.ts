export type Props = {
    onClick?: Actions,
    target: string,
    hint: string
    distance:number
}

export class MUAButton implements IScript<Props> {
    init(args: { inventory: IInventory }) {
    }

    spawn(host: any, props: Props, channel: IChannel) {
        let target
        for (const entity in engine.entities) {
            const ent = engine.entities[entity] as Entity
            if (ent.name == props.target)
                target = ent
        }
        target.addComponent(new OnPointerDown((e) => {
            channel.sendActions(props.onClick)
        }, {
            hoverText: props.hint,
            distance:props.distance
        }))
    }
}