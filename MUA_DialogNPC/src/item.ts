import {NPC, NPCDelay} from "../npc-scene-utils";


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
        let target = engine.entities[props.target] as Entity

    }

}