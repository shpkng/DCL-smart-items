export class RotationData {
    rot: Quaternion
    stayTime: number
    name?: string

    constructor(rot: Quaternion, stayTime: number, name?: string) {
        this.rot = rot
        this.stayTime = stayTime
        this.name = name
    }
}

export enum Mode {
    Once,
    RewindLoop,
    Loop
}

@Component("MUARotatorComponent")
export class MUARotatorComponent {
    private rotationData: RotationData[] = []
    private angularSpeed: number = 0
    private target: Entity
    private index: number = 0
    private nextIndex: number = 1
    private duration: number = 0
    private transform: Transform
    private mode: Mode
    private backwards: boolean = false
    private stopped: boolean = false
    private rotDuration: number
    private onRotEnd: (() => void) | undefined

    constructor(target: Entity, rotations: RotationData[], angularSpeed: number, mode: Mode, onRotEnd?: () => void) {
        this.target = target
        this.rotationData = rotations
        this.angularSpeed = angularSpeed
        this.mode = mode
        this.onRotEnd = onRotEnd
        this.transform = target.getComponent(Transform)
        // have to init the rotDuration here
        this.rotDuration = Quaternion.Angle(this.rotationData[0].rot, this.rotationData[1].rot) / this.angularSpeed
    }

    update(dt: number): void {
        if (this.stopped) {
            return
        }

        let curRot = this.rotationData[this.index]
        let nextRot = this.rotationData[this.nextIndex]

        this.duration += dt
        if (this.duration < this.rotDuration) {
            this.transform.rotation = Quaternion.Slerp(curRot.rot, nextRot.rot, this.duration / this.rotDuration)
        } else if (this.duration < this.rotDuration + curRot.stayTime) {
            this.transform.rotation = curRot.rot
        } else {
            this.transform.rotation = nextRot.rot
            this.duration -= this.rotDuration
            this.duration -= curRot.stayTime
            switch (this.mode) {
                case Mode.Once: {
                    if (this.nextIndex === this.rotationData.length - 1) {
                        this.stopped = true
                        this.onRotEnd?.()
                    } else {
                        this.index++
                        this.nextIndex++
                    }
                }
                    break
                case Mode.Loop: {
                    if (this.nextIndex === this.rotationData.length - 1) {
                        this.index++
                        this.nextIndex = 0
                    } else if (this.index === this.rotationData.length - 1) {
                        this.index = 0
                        this.nextIndex = 1
                        this.onRotEnd?.()
                    } else {
                        this.index++
                        this.nextIndex++
                    }
                }
                    break
                case Mode.RewindLoop: {
                    if (this.backwards) {
                        if (this.nextIndex === 0) {
                            this.nextIndex = 1
                            this.index = 0
                            this.backwards = false
                            this.onRotEnd?.()
                        } else {
                            this.index--
                            this.nextIndex--
                        }
                    } else {
                        if (this.nextIndex === this.rotationData.length - 1) {
                            this.nextIndex = this.rotationData.length - 2
                            this.index = this.rotationData.length - 1
                            this.backwards = true
                        } else {
                            this.index++
                            this.nextIndex++
                        }
                    }
                }
                    break
            }
            this.rotDuration = Quaternion.Angle(this.rotationData[this.index].rot, this.rotationData[this.nextIndex].rot) / this.angularSpeed
        }

    }

    getState(): string {
        const eulerAngles = this.target.getComponent(Transform).eulerAngles
        return `${eulerAngles.x},${eulerAngles.y},${eulerAngles.z}`
    }

    setState(eulerAnglesStr: string): void {
        const eulerAngles = eulerAnglesStr.split(",").map(x => parseFloat(x))
        const transform = this.target.getComponent(Transform)
        transform.rotation = Quaternion.Euler(eulerAngles[0], eulerAngles[1], eulerAngles[2])
    }
}