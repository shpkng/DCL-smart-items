class MUAButtonCreator {
    setButton(target: Entity, callback: (event: IEvents['pointerDown']) => void, hoverText: string, distance?: number) {
        target.addComponent(new OnPointerDown(callback, {
            distance: distance,
            hoverText: hoverText,
        }))
    }
}

export default new MUAButtonCreator()