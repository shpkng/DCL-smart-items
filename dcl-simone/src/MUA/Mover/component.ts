export class PositionData {
    pos: Vector3
    stayTime: number
    name?: string

    constructor(x: number, y: number, z: number, stayTime: number, name?: string) {
        this.pos = new Vector3(x, y, z)
        this.stayTime = stayTime
        this.name = name
    }
}

export enum Mode {
    Once,
    RewindLoop,
    Loop
}

@Component("MUAMoverComponent")
export class MUAMoverComponent {
    private readonly speed: number = 0
    private readonly positionData: PositionData[]
    private target: Entity
    private index: number = 0
    private nextIndex: number = 1;
    private duration: number = 0
    private transform: Transform
    private readonly mode: Mode
    private backwards: boolean = false
    private stopped: boolean = false
    private moveDuration: number
    private readonly onPathEnd: (() => void) | undefined;

    constructor(target: Entity, speed: number, mode: Mode, positionData: PositionData[], onPathEnd?: () => void) {
        this.speed = speed
        this.positionData = positionData
        this.target = target
        this.transform = target.getComponentOrCreate(Transform)
        this.mode = mode
        this.stopped = positionData.length < 2
        this.onPathEnd = onPathEnd
        // have to set the position here
        this.moveDuration = Vector3.Distance(this.positionData[0].pos, this.positionData[1].pos) / this.speed
    }

    update(dt: number): void {
        if (this.stopped)
            return

        let curPos = this.positionData[this.index]
        let nextPos = this.positionData[this.nextIndex]

        this.duration += dt;
        if (this.duration < this.moveDuration) {
            this.transform.position = Vector3.Lerp(curPos.pos, nextPos.pos, this.duration / this.moveDuration)
        } else if (this.duration < this.moveDuration + curPos.stayTime) {
            this.transform.position = nextPos.pos
        } else {
            this.transform.position = nextPos.pos
            this.duration -= this.moveDuration;
            this.duration -= curPos.stayTime;
            switch (this.mode) {
                case Mode.Once: {
                    if (this.nextIndex == this.positionData.length - 1) {
                        this.stopped = true
                        this.onPathEnd?.()
                    } else {
                        this.index++
                        this.nextIndex++
                    }
                }
                    break;
                case Mode.Loop: {
                    if (this.nextIndex === this.positionData.length - 1) {
                        this.index++
                        this.nextIndex = 0
                    } else if (this.index === this.positionData.length - 1) {
                        this.index = 0
                        this.nextIndex = 1
                        this.onPathEnd?.()
                    } else {
                        this.index++
                        this.nextIndex++
                    }
                }
                    break;
                case Mode.RewindLoop: {
                    if (this.backwards) {
                        if (this.nextIndex === 0) {
                            this.nextIndex = 1
                            this.index = 0
                            this.backwards = false
                            this.onPathEnd?.()
                        } else {
                            this.index--
                            this.nextIndex--
                        }
                    } else {
                        if (this.nextIndex === this.positionData.length - 1) {
                            this.nextIndex = this.positionData.length - 2
                            this.index = this.positionData.length - 1
                            this.backwards = true
                        } else {
                            this.index++
                            this.nextIndex++
                        }
                    }
                }
                    break;

            }
            this.moveDuration = Vector3.Distance(this.positionData[this.index].pos,
                this.positionData[this.nextIndex].pos) / this.speed
        }
    }

    getStageInfo(): string {
        return `${this.index},${this.duration}`
    }

    setStageInfo(stageInfoStr: string): void {
        const str = stageInfoStr.split(",")
        this.index = parseInt(str[0])
        this.duration = parseFloat(str[1])
    }
}