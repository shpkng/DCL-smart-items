import {Ease} from "./ease";
import {TweenType} from "./tweenerMgr";
import {Tweener} from "./tweener";

@Component('muadao.transform.MoveTweener')
export class MoveTweener extends Tweener {
    transition: number = 0
    type: TweenType
    channel: IChannel
    origin: Vector3
    sender: string = 'initial'
    timestamp: number

    constructor(args: {
        type: TweenType
        x: number
        y: number
        z: number
        speed: number
        relative: boolean
        onComplete: Actions
        channel: IChannel
        origin: Vector3
        curve?: Ease
        sender?: string
        timestamp?: number
    }) {
        super();
        this.type = args.type
        this.x = args.x
        this.y = args.y
        this.z = args.z
        this.speed = args.speed
        this.relative = args.relative
        this.onComplete = args.onComplete
        this.channel = args.channel
        this.origin = args.origin
        this.curve = args.curve
        this.sender = args.sender
        this.timestamp = args.timestamp
    }
}