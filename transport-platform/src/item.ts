export type Props = {
    speed: number
    stageJson: string
    platform: string
}

class TransportStage {
    pos: Vector3
    rot: Vector3
    stayTime: number

    constructor(pos: Vector3, rot: Vector3, stayTime: number) {
        this.pos = pos
        this.rot = rot
        this.stayTime = stayTime
    }
}

export default class TransportPlatform implements IScript<Props> {
    speed: number = 0
    stages: TransportStage[] = []
    platform: Entity
    // from pos {stage} to pos {stage + 1}
    stageId: number = 0
    duration: number = 0
    transform: Transform

    init(args: { inventory: IInventory; }): void {
    }

    spawn(host: Entity, props: Props, channel: IChannel): void {
        this.stages = JSON.parse(props.stageJson)
        this.speed = props.speed
        this.platform = engine.entities[props.platform] as Entity
        this.transform = this.platform.addComponentOrReplace(new Transform())
        const box = host.addComponentOrReplace(new BoxShape())
        box.visible = false
        channel.request<string>("stageId", reply => {
            let strs = reply.split(',')
            this.stageId = parseInt(strs[0])
            this.duration = parseFloat(strs[1])
        })
        channel.reply("stageId", () => `${this.stageId},${this.duration}`)
    }

    update(dt: number): void {
        let curStage = this.stages[this.stageId]
        let nextStageId = this.stages.length > this.stageId + 1 ? this.stageId + 1 : this.stageId - 1
        let nextStage = this.stages[nextStageId]
        let thisX = curStage.pos.x;
        let nextX = nextStage.pos.x;
        let thisY = curStage.pos.y;
        let nextY = nextStage.pos.y;
        let thisZ = curStage.pos.z;
        let nextZ = nextStage.pos.z;
        let moveDuration = Math.sqrt((thisX - nextX) * (thisX - nextX)
            + (thisY - nextY) * (thisY - nextY)
            + (thisZ - nextZ) * (thisZ - nextZ)) / this.speed
        this.duration += dt;
        if (this.duration < moveDuration) {
            this.transform.position = new Vector3((thisX + (nextX - thisX) * (this.duration / moveDuration)),
                (thisY + (nextY - thisY) * (this.duration / moveDuration)),
                (thisZ + (nextZ - thisZ) * (this.duration / moveDuration)))
        } else if (this.duration < moveDuration + curStage.stayTime) {
            this.transform.position = nextStage.pos
        } else {
            this.transform.position = nextStage.pos
            this.duration -= moveDuration;
            this.duration -= curStage.stayTime;
            this.stageId = nextStageId;
            this.update(0)
        }
    }
}