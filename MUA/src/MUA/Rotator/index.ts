import {MUARotatorSystem} from "./system";
import {MUARotatorComponent} from "./component";


class RotateUtils {
    AxisX = "x"
    AxisY = "y"
    AxisZ = "z"

    constructor() {
        engine.addSystem(new MUARotatorSystem())
    }

    setRotation(host: Entity, angularSpeed: number,
                axis: string): void {
        host.addComponent(new MUARotatorComponent(angularSpeed, axis, host))
    }
}

export default new RotateUtils()