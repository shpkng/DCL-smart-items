import {Updater} from "./Updater";

const group = engine.getComponentGroup(Updater).entities.map(e => e.getComponent(Updater));

export class UpdateSystem implements ISystem {
    update(dt: number) {
        for (let i = 0; i < group.length; i++) {
            group[i].update(dt);
        }
    }
}