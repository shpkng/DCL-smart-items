export type Props = {
    onClick?: Actions,
    target: string,
    hint: string
}

export class MUAButton implements IScript<Props> {
    init(args: { inventory: IInventory }) {
    }

    spawn(host: any, props: Props, channel: IChannel) {
        let target = engine.entities[props.target] as Entity
        target.addComponent(new OnPointerDown((e) => {
            channel.sendActions(props.onClick)
        }, {
            hoverText: props.hint
        }))
    }
}