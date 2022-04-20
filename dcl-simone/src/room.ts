const root = new Entity("aerocraft")
root.addComponent(new Transform({
    position: new Vector3(1, 1, 1)
}))

const body = new Entity("1")
body.addComponent(new Transform({
    position: new Vector3(1, 1, 1)
}))
body.addComponent(new GLTFShape("models/aerocraft/001.glb"))
body.setParent(root)

const floor = new Entity("2")
floor.addComponent(new Transform({
    position: new Vector3(1, 1, 1)
}))
floor.addComponent(new GLTFShape("models/aerocraft/002.glb"))
floor.setParent(root)

const e3 = new Entity("3")
e3.addComponent(new Transform({
    position: new Vector3(1, 1, 1)
}))
e3.addComponent(new GLTFShape("models/aerocraft/003.glb"))

engine.addEntity(root)
