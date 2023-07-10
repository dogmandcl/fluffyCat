import {
    Entity,
    engine,
    Transform,
    GltfContainer,
    AudioSource,
    PointerEvents,
    PointerEventType,
    InputAction,
    UiTransform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { EnemyShip, Expire, MoveTransformComponent, ShipShapes } from './components/customComponents'
import { InterpolationType } from './helper/interpolation'

export * from "@dcl/sdk"

import * as utils from '@dcl-sdk/utils'
import { createCoin } from './coin'
import { endGame, SPEED } from './startButton'

// Create a box with disabled collision




// Configuration
const TRAVEL_DISTANCE = 28

const MAX_TRAVEL_SPEED_OFFSET = 0.2


export function spawnEnemy(shape: ShipShapes, x: number, y: number, z: number): Entity {
    const enemy = engine.addEntity()


    utils.timers.setTimeout(
  function() {const coin = createCoin('models/coin.glb', Vector3.create(x, y, z), Vector3.create(1.5, 3, 1.5), Vector3.create(0, 1, 0))
  MoveTransformComponent.create(coin, {
    start: { x: x, y: y +1 , z: z },
    end: { x: x, y: y + 1, z: z - TRAVEL_DISTANCE },
    speed: SPEED / 10 + Math.random() * (MAX_TRAVEL_SPEED_OFFSET / 10),
    normalizedTime: 0,
    lerpTime: 0,
    hasFinished: false,
    interpolationType: InterpolationType.EASEINSINE
})},
  1000
)





  

    utils.triggers.oneTimeTrigger(
       enemy,
        utils.LAYER_2,
        utils.LAYER_1,
        [{ type: 'box',scale: {x:3,y:2,z:2} }],
        () => {
         destroyEnemy(enemy),
         endGame()
        }
      )

      




    Transform.create(enemy, {
        position: Vector3.create(x, y, z)
    })

    GltfContainer.create(enemy, {
        src: shape
    })

    MoveTransformComponent.create(enemy, {
        start: { x: x, y: y, z: z },
        end: { x: x, y: y, z: z - TRAVEL_DISTANCE },
        speed: SPEED / 10 + Math.random() * (MAX_TRAVEL_SPEED_OFFSET / 10),
        normalizedTime: 0,
        lerpTime: 0,
        hasFinished: false,
        interpolationType: InterpolationType.EASEINSINE
    })

    PointerEvents.create(enemy, {
        pointerEvents: [
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_PRIMARY,
                    showFeedback: false
                }
            }
        ]
    })

    EnemyShip.create(enemy)
    return enemy
}

export function destroyEnemy(entity: Entity) {
    MoveTransformComponent.deleteFrom(entity)
    EnemyShip.deleteFrom(entity)
    GltfContainer.createOrReplace(entity, {
        src: 'models/gspikeBall.glb'
    })
    AudioSource.create(entity, {
      audioClipUrl: 'sounds/explosion.mp3',
      playing: true,
      volume: 2
    })

    Expire.create(entity, {
        timeLeft: 1
    })
}