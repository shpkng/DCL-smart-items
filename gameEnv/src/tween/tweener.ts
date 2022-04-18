import {Ease} from "./ease";

@Component("tweener")
export class Tweener {
    target: string
    x: number
    y: number
    z: number
    curve: Ease
    speed: number
    relative: boolean
    onComplete: Actions

    constructor() {
    }
}