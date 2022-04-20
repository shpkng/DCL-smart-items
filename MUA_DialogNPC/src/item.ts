import {NPC, NPCDelay} from "./npc-utils/index";


export type Props = {
    linesJson: string,
    target: string,
}

class Lines {
    line: string
}

export class MUADialogNPC implements IScript<Props> {
    init(args: { inventory: IInventory }): void {
    }

    spawn(host: any, props: Props, channel: IChannel): void {
        const message = [
            {
                text: `I really lo-ove cats`,
                isEndOfDialog: true
            }
        ]
        let target
        for (const entity in engine.entities) {
            const ent = engine.entities[entity] as Entity
            if (ent.name == props.target)
                target = ent
        }
        let npc = new NPC(target, () => {
            npc.talk(message, 0)
        })
    }

}