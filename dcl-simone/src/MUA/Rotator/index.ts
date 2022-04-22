import {MUARotatorSystem} from "./system";
import {Mode, MUARotatorComponent, RotationData} from "./component";


class Rotator {

    rewindLoop(target: Entity,
               angularSpeed: number,
               rotations: RotationData[],
               onRotEnd?: () => void) {
        return target.addComponentOrReplace(new MUARotatorComponent(target, rotations, angularSpeed, Mode.RewindLoop, onRotEnd));
    }

    loop(target: Entity,
         angularSpeed: number,
         rotations: RotationData[],
         onRotEnd?: () => void) {
        return target.addComponentOrReplace(new MUARotatorComponent(target, rotations, angularSpeed, Mode.Loop, onRotEnd));
    }

    to(target: Entity,
       angularSpeed: number,
       to: Quaternion,
       onRotEnd?: () => void) {
        const t = target.getComponent(Transform).rotation
        return this.fromTo(target, angularSpeed, new RotationData(t, 0), new RotationData(to, 0), onRotEnd);
    }


    fromTo(target: Entity,
           angularSpeed: number,
           from: RotationData,
           to: RotationData,
           onRotEnd?: () => void) {
        return this.path(target, angularSpeed, [from, to], onRotEnd);
    }


    path(target: Entity,
         angularSpeed: number,
         rotations: RotationData[],
         onRotEnd?: () => void) {
        return target.addComponentOrReplace(new MUARotatorComponent(target, rotations, angularSpeed, Mode.Once, onRotEnd));
    }


    constructor() {
        engine.addSystem(new MUARotatorSystem())
    }
}

export default new Rotator()