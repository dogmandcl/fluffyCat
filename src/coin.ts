import { AudioSource, engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { score } from './UI'

/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const coinPickupSound = engine.addEntity()
Transform.create(coinPickupSound)
AudioSource.create(coinPickupSound, { audioClipUrl: 'sounds/bird.wav' })


export function createCoin(model: string, position: Vector3, size: Vector3, centerOffset: Vector3): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, { position })

  utils.triggers.oneTimeTrigger(
    entity,
    utils.LAYER_2,
    utils.LAYER_1,
    [{ type: 'box' ,scale: {x:2,y:2,z:2}}],
    () => {
      Transform.getMutable(coinPickupSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(coinPickupSound).playing = true
      engine.removeEntity(entity)
      score.increase(5)

    },
    Color3.Yellow()
  )

  return entity
}





//utils.triggers.enableDebugDraw(true)