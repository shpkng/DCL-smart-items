import {movePlayerTo} from "@decentraland/RestrictedActions";

class Scene {
    moveEntity(target: Entity, position: Vector3, lookAt: Vector3 | Entity) {
        if (lookAt instanceof Vector3) {
            Scene.moveToWithVectorLookAt(target, position, lookAt)
        } else {
            let transform = lookAt.getComponent(Transform)
            if (transform !== null) {
                Scene.moveToWithVectorLookAt(target, position, transform.position)
            }
        }
    }

    private static moveToWithVectorLookAt(target: Entity, position: Vector3, lookAt: Vector3) {
        const transform = target.getComponentOrCreate(Transform);
        transform.position = position;
        Quaternion.LookRotation(new Vector3(lookAt.x - position.x, lookAt.y - position.y, lookAt.z - position.z), Vector3.Up())
    }

    teleportInScene(position: Vector3, lookAt: Vector3 | Entity, callback?: any) {
        let promise
        if (lookAt instanceof Vector3) {
            promise = movePlayerTo(position, lookAt)
        } else {
            let transform = lookAt.getComponentOrCreate(Transform)
            promise = movePlayerTo(position, transform.position)
        }
        if (callback) {
            promise.then(callback)
        }
    }

    teleportToAnotherScene(x: number, y: number): void {
        teleportTo(`${x},${y}`)
    }
}

export default new Scene()