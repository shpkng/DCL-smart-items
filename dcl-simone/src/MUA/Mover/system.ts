import {MUAMoverComponent} from "./component";

const componentGroup = engine.getComponentGroup(MUAMoverComponent)

export class MUAMoverSystem implements ISystem {
    update(dt: number) {
        for (let entity of componentGroup.entities) {
            entity.getComponent(MUAMoverComponent).update(dt)
        }
    }
}