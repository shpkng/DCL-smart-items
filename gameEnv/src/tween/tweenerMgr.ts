import {Tweener} from "./tweener"

export type TweenType = 'move' | 'rotate' | 'scale' | 'color'

export class TweenSystem implements ISystem {
    update(dt: number) {
        const myEntityGroup = engine.getComponentGroup(Tweener);
        for (let entity of myEntityGroup.entities) {
            let transform = entity.getComponent(Transform)

        }
    }
}
