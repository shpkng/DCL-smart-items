import {MUAMoverSystem} from "./system"
import {MUAMoverComponent, PositionData, Mode} from "./component";

class Mover {
    Data = PositionData

    rewindLoop(target: Entity,
               speed: number,
               stages: PositionData[],
               onPathEnd?: () => void): MUAMoverComponent {
        return target.addComponentOrReplace(new MUAMoverComponent(target, speed, Mode.RewindLoop, stages, onPathEnd))
    }

    loop(target: Entity,
         speed: number,
         positions: PositionData[],
         onPathEnd?: () => void): MUAMoverComponent {
        return target.addComponentOrReplace(new MUAMoverComponent(target, speed, Mode.Loop, positions, onPathEnd));
    }

    to(target: Entity,
       speed: number,
       to: Vector3,
       onPathEnd?: () => void): MUAMoverComponent {
        const t = target.getComponent(Transform).position
        return this.fromTo(target, speed, new PositionData(t.x, t.y, t.z, 0), new PositionData(to.x, to.y, to.z, 0), onPathEnd);
    }

    fromTo(target: Entity,
           speed: number,
           from: PositionData,
           to: PositionData, onPathEnd?: () => void): MUAMoverComponent {
        return this.path(target, speed, [from, to], onPathEnd);
    }

    path(target: Entity,
         speed: number,
         path: PositionData[], onPathEnd?: () => void): MUAMoverComponent {
        return target.addComponentOrReplace(new MUAMoverComponent(target, speed, Mode.Once, path, onPathEnd));
    }

    constructor() {
        engine.addSystem(new MUAMoverSystem())
    }
}

export default new Mover()