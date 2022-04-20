import {MUAMoverSystem} from "./system"
import {MUAMoverComponent, PositionData} from "./component";

class Patrol {
    Data = PositionData
    Rewind = "rewind"
    Loop = "loop"
    Triggered = "triggered"

    setPatrol(host: Entity,
              speed: number,
              stages: PositionData[],
              mode: string): void {
        host.addComponent(new MUAMoverComponent(speed, stages, mode, host, host.getComponent(Transform)));
    }

    constructor() {
        engine.addSystem(new MUAMoverSystem())
    }
}

export default new Patrol()