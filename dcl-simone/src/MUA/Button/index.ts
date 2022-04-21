class MUAButtonCreator {
    setButton(host: Entity, callback: (event: IEvents['pointerDown']) => void, hoverText: string, distance: number) {
        host.addComponent(new OnPointerDown(callback, {
            distance: distance,
            hoverText: hoverText,
        }))
    }
}

export default new MUAButtonCreator()