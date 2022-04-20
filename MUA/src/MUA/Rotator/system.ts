import {MUARotatorComponent} from "./component";

const componentGroup = engine.getComponentGroup(MUARotatorComponent)

export class MUARotatorSystem implements ISystem {
    update(dt: number): void {
        for (let entity of componentGroup.entities) {
            entity.getComponent(MUARotatorComponent).update(dt)
        }
    }
}