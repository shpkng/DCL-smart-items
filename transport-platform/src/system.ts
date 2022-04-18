import {TransportPlatformUpdateComponent} from "./component";


const componentGroup = engine.getComponentGroup(TransportPlatformUpdateComponent)

export class TransportPlatformSystem implements ISystem {
    update(dt: number) {
        for (let entity of componentGroup.entities) {
            entity.getComponent(TransportPlatformUpdateComponent).update(dt)
        }
    }
}