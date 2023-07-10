export * from "@dcl/sdk"
import { engine, InputAction, inputSystem, MeshCollider, MeshRenderer, PointerEventType, Transform, VisibilityComponent } from "@dcl/sdk/ecs"
import * as utils from '@dcl-sdk/utils'
import { Vector3 } from "@dcl/sdk/math"
import { movePlayerTo } from "~system/RestrictedActions"
import { endGame } from "./startButton"





export function createFlyArea(){


const box17 = engine.addEntity()
Transform.create(box17, {
  position: Vector3.create(16, 4, 4.5),
  scale: Vector3.create(26,.5,5),
})
MeshRenderer.setBox(box17)
MeshCollider.setBox(box17)

VisibilityComponent.create(box17, { visible: false})


const box18 = engine.addEntity()
Transform.create(box18, {
  position: Vector3.create(16, 1, 4.5),
  scale: Vector3.create(26,4,5),
})


VisibilityComponent.create(box18, { visible: false})
utils.triggers.addTrigger(box18, utils.LAYER_2, utils.LAYER_1, [{type: 'box',position: {x: 0, y: 1, z: 0},scale: {x:16, y:2.8 , z:5}}], () => {
    if(inFlyingArea){
   endGame()
   Transform.createOrReplace(box17,{position: Vector3.create(16, 4, 4.5),scale: Vector3.create(26,.5,5)})

    }
  })
  

// Define start and end positions
let startPos = Vector3.create(16, 2.5, 4.5)
let endPos = Vector3.create(16, 5, 4.5)







let inFlyingArea = false
engine.addSystem(() => {
    const playerPos = Transform.get(engine.PlayerEntity).position

    if(inFlyingArea){
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)){
      console.log('flyingUp')
      utils.tweens.startTranslation(box17, {x: startPos.x, y: startPos.y + 1.5, z:startPos.z}, endPos, 2)
    }
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_UP)){
        console.log('flyingUp')
        utils.tweens.startTranslation(box17, endPos, startPos, 2)
      }
   
}
})




const box = engine.addEntity()



utils.triggers.addTrigger(box17, utils.LAYER_2, utils.LAYER_1, [{type: 'box',position: {x: 0, y: 1, z: 0},scale: {x:16, y:8 , z:5}}], () => {
  inFlyingArea = true
  console.log("hello")
}, () => {
    inFlyingArea = false
})





}