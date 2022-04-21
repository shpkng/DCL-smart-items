import {Dialog, NPC, NPCData} from "./npc-utils/index"

class NPCUtils {
    create(host: Entity, props: {
        messages: Dialog[],
        target?: string,
        idleAnimName?: string,
        faceUser?: boolean,
        turnSpeed?: number,
        portrait?: string,
        walkingAnimName?: string,
        path?: Vector3[],
        bubbleHeight?: number,
        textBubble?: boolean
    }): void {
        let data: NPCData = {
            idleAnim: props.idleAnimName,
            faceUser: props.faceUser,
            turningSpeed: props.turnSpeed,
            portrait: props.portrait,
            walkingAnim: props.walkingAnimName,
            bubbleHeight: props.bubbleHeight,
            textBubble: props.textBubble,
            onlyClickTrigger: true
        }
        let npc = new NPC(host, () => {
            npc.talk(props.messages, 0)
        }, data)
        if (props.path !== undefined) {
            npc.followPath({
                path: props.path,
                curve: true,
                loop: true
            })
        }
        engine.removeEntity(host)
    }
}

export default new NPCUtils()
