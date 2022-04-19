@Component("MUARotatorComponent")
export class MUARotatorComponent {
    angularSpeed: number = 0
    axis: string = "y"
    target: Entity

    constructor(angularSpeed: number, axis: string, target: Entity) {
        this.angularSpeed = angularSpeed
        this.axis = axis
        this.target = target
    }

    update(dt: number): void {
        const transform = this.target.getComponent(Transform)
        if (this.axis === "x") {
            transform.rotation = Quaternion.Euler(transform.eulerAngles.x + this.angularSpeed * dt, transform.eulerAngles.y, transform.eulerAngles.z)
        } else if (this.axis === "y") {
            transform.rotation = Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y + this.angularSpeed * dt, transform.eulerAngles.z)
        } else if (this.axis === "z") {
            transform.rotation = Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y, transform.eulerAngles.z + this.angularSpeed * dt)
        }
    }

    setState(eulerAnglesStr: string): void {
        const eulerAngles = eulerAnglesStr.split(",").map(x => parseFloat(x))
        const transform = this.target.getComponent(Transform)
        transform.rotation = Quaternion.Euler(eulerAngles[0], eulerAngles[1], eulerAngles[2])
    }

    getState(): string {
        const eulerAngles = this.target.getComponent(Transform).eulerAngles
        return `${eulerAngles.x},${eulerAngles.y},${eulerAngles.z}`
    }
}