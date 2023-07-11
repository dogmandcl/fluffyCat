import { engine, Transform, MeshRenderer, Material, MeshCollider, VisibilityComponent, GltfContainer } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"
import { sceneSizeZ, radiusMultiplier, sceneSizeX, height } from "./resources"

export function createSkybox(){
    // //root
	// let skyboxRoot = engine.addEntity()
	// Transform.create(skyboxRoot, { position: Vector3.create(16, 15, 16) })

	// //front
	// let skyboxPZ = engine.addEntity()
	// Transform.create(skyboxPZ, {
	// 	position: Vector3.create(0, 0, sceneSizeZ / 2 * radiusMultiplier),
	// 	scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
	// 	parent: skyboxRoot
	// })
	// MeshRenderer.setPlane(skyboxPZ)
	// Material.setBasicMaterial(skyboxPZ, {
	// 	texture: Material.Texture.Common({
	// 		src: "images/skybox/" +  "box.jpg"
	// 	})
	// })

	// //back
	// let skyboxNZ = engine.addEntity()
	// Transform.create(skyboxNZ, {
	// 	position: Vector3.create(0, 0, -sceneSizeZ / 2 * radiusMultiplier),
	// 	rotation: Quaternion.fromEulerDegrees(0, 180, 0),
	// 	scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
	// 	parent: skyboxRoot
	// })
	// MeshRenderer.setPlane(skyboxNZ)
	// Material.setBasicMaterial(skyboxNZ, {
	// 	texture: Material.Texture.Common({
	// 		src: "images/skybox/" + "box.jpg"
	// 	})
	// })

	// //Top
	// let skyboxPY = engine.addEntity()
	// Transform.create(skyboxPY, {
	// 	position: Vector3.create(0, height / 2 * radiusMultiplier, 0),
	// 	rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
	// 	scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
	// 	parent: skyboxRoot
	// })
	// MeshRenderer.setPlane(skyboxPY)
	// Material.setBasicMaterial(skyboxPY, {
	// 	texture: Material.Texture.Common({
	// 		src: "images/skybox/" + "box.jpg"
	// 	})
	// })

	// //Bottom
	// let skyboxNY = engine.addEntity()
	// Transform.create(skyboxNY, {
	// 	position: Vector3.create(0, -height / 2 * radiusMultiplier, 0),
	// 	rotation: Quaternion.fromEulerDegrees(90, 0, 0),
	// 	scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
	// 	parent: skyboxRoot
	// })
	// MeshRenderer.setPlane(skyboxNY)
	// Material.setBasicMaterial(skyboxNY, {
	// 	texture: Material.Texture.Common({
	// 		src: "images/skybox/" + "box.jpg"
	// 	})
	// })

	// //Right
	// let skyboxPX = engine.addEntity()
	// Transform.create(skyboxPX, {
	// 	position: Vector3.create(sceneSizeX / 2 * radiusMultiplier, 0, 0),
	// 	rotation: Quaternion.fromEulerDegrees(0, 90, 0),
	// 	scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
	// 	parent: skyboxRoot
	// })
	// MeshRenderer.setPlane(skyboxPX)
	// Material.setBasicMaterial(skyboxPX, {
	// 	texture: Material.Texture.Common({
	// 		src: "images/skybox/" + "box.jpg"
	// 	})
	// })

	// // Left
	// let skyboxNX = engine.addEntity()
	// Transform.create(skyboxNX, {
	// 	position: Vector3.create(-sceneSizeX / 2 * radiusMultiplier, 0, 0),
	// 	rotation: Quaternion.fromEulerDegrees(0, -90, 0),
	// 	scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
	// 	parent: skyboxRoot
	// })
	// MeshRenderer.setPlane(skyboxNX)
	// Material.setBasicMaterial(skyboxNX, {
	// 	texture: Material.Texture.Common({
	// 		src: "images/skybox/" + "box.jpg"
	// 	})
	// })
	// //#endregion
	const sbox = engine.addEntity()
	Transform.create(sbox, {
	  position: Vector3.create(16,16,10),
	  scale: Vector3.create(2, 3, 4)
	})
	GltfContainer.create(sbox, {
	  src: 'models/skybox.glb'
	})
  




//     const box1 = engine.addEntity()
// Transform.create(box1, {
//   position: Vector3.create(16, 2, 4),
//   scale: Vector3.create(28,4,5)
// })
// MeshRenderer.setBox(box1)
// MeshCollider.setBox(box1)



// VisibilityComponent.create(box1, { visible: true})



const box14 = engine.addEntity()
Transform.create(box14, {
  position: Vector3.create(16, 5, 6.7),
  scale: Vector3.create(28,8,5)
})
MeshRenderer.setPlane(box14)
MeshCollider.setPlane(box14)
const box15 = engine.addEntity()
Transform.create(box15, {
  position: Vector3.create(16, 5, 2),
  scale: Vector3.create(28,8,5)
})
MeshRenderer.setPlane(box15)
MeshCollider.setPlane(box15)
//SIDES

const box16= engine.addEntity()
Transform.create(box16, {
  position: Vector3.create(3, 5, 5),
  scale: Vector3.create(6,8,5),
  rotation: Quaternion.create(45,0,45,0)
})
MeshRenderer.setPlane(box16)
MeshCollider.setPlane(box16)


const box17 = engine.addEntity()
Transform.create(box17, {
  position: Vector3.create(28, 5, 5),
  scale: Vector3.create(6,8,5),
  rotation: Quaternion.create(45,0,45,0)
})
MeshRenderer.setPlane(box17)
MeshCollider.setPlane(box17)

VisibilityComponent.create(box17, { visible: false})
VisibilityComponent.create(box14, { visible: false})
VisibilityComponent.create(box15, { visible: false})
VisibilityComponent.create(box16, { visible: false})

}