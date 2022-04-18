import {UpdateSystem} from "./UpdateSystem";
import {Updater} from "./Updater";


export type Props = {
    // enableUpdate: boolean
};

export default class GameEnv implements IScript<Props> {
    init(args: { inventory: IInventory; }): void {
    }

    spawn(host: any, props: Props, channel: IChannel): void {
        host.addComponent(new Updater())
        engine.addSystem(new UpdateSystem())
    }
}