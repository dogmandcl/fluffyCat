import {
    engine,
    Entity,
    InputAction,
    inputSystem,
    PointerEventType,
    PointerEvents,
    Transform,
    MeshRenderer,
    MeshCollider,
    AudioSource,
    Material
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { enemySpawnSystem } from './systems/enemySpawner'
import { movePlayerTo } from '~system/RestrictedActions'
import { deathScores, highscore, score } from './UI'
import * as utils from '@dcl-sdk/utils'



// Configuration
export var SPEED = 2.5
export var BASE_SPAWN_TIME = 1.5
export var MAX_TIME_OFFSET = 3
let gameSecs = 0
const gameOverSound = engine.addEntity()
Transform.create(gameOverSound)
AudioSource.create(gameOverSound, { audioClipUrl: 'sounds/gameOver.wav' })

const gameSound = engine.addEntity()
Transform.create(gameSound)
AudioSource.create(gameSound, { audioClipUrl: 'sounds/Carnavalsong.wav' })
const state = {
    grabbed: false
}
let timerId = utils.timers.setInterval(function () {

}, 1000)

// Sounds
const audioSourceEntity = engine.addEntity()

export function playSound(audio: string) {
    AudioSource.createOrReplace(audioSourceEntity, {
        audioClipUrl: audio,
        playing: true
    })
}
export function stopSound(audio: string) {
    AudioSource.createOrReplace(audioSourceEntity, {
        audioClipUrl: audio,
        playing: false
    })
}

export function createCreate(Position: Vector3): Entity {
    const crate = engine.addEntity()
    Transform.create(crate, { position: Position })
    MeshRenderer.setSphere(crate)
    MeshCollider.setSphere(crate)
    Material.setPbrMaterial(crate, {
        albedoColor: Color4.Green(),
        metallic: 0.8,
        roughness: 0.1,
        emissiveIntensity: .5,
      })

    PointerEvents.create(crate, {
        pointerEvents: [
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_PRIMARY,
                    hoverText: 'Start Game!',
                    maxDistance: 5,
                    showFeedback: true
                }
            }
        ]
    })

    return crate
}

const toggleGrabbed = () => {
    state.grabbed = !state.grabbed
    // const sound = state.grabbed ? `sounds/put-down.mp3` : `sounds/pick-up.mp3`
    // playSound(sound)

    return state.grabbed
}

export function grabbingSystem() {
    const objs = engine.getEntitiesWith(PointerEvents, Transform)
    for (const [entity] of objs) {
        const mutableTransform = Transform.getMutable(entity)
        if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
            const grabbed = toggleGrabbed()

            if (grabbed) {
                Transform.getMutable(gameSound).position = Transform.get(engine.PlayerEntity).position
                AudioSource.getMutable(gameSound).playing = true
          

                movePlayerTo({
                    newRelativePosition: Vector3.create(18, 7, 5.6),
                    cameraTarget: Vector3.create(16, 1, 14),
                })
                score.set(0)
                engine.addSystem(enemySpawnSystem)
                timerId = utils.timers.setInterval(function () {
                    score.increase()
                    SPEED += .1
                    MAX_TIME_OFFSET -= .01
                    BASE_SPAWN_TIME -= .01
                    gameSecs += .1

                }, 1000)

                console.log('gamesecs:', gameSecs,'speed:', SPEED, 'offset:', MAX_TIME_OFFSET, 'spawn:', BASE_SPAWN_TIME)






            } else {
                engine.removeSystem(enemySpawnSystem)


            }
        }
    }
}

export function endGame() {
    const grabbed = toggleGrabbed()
    if (score.read() >= highscore.read()) {
        highscore.set(score.read())
    }
    deathScores()
   
    SPEED -=  gameSecs
    MAX_TIME_OFFSET += (gameSecs/10)
    BASE_SPAWN_TIME += (gameSecs/10)
    gameSecs -= gameSecs
    AudioSource.getMutable(gameSound).playing = false

    Transform.getMutable(gameOverSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(gameOverSound).playing = true

    movePlayerTo({
        newRelativePosition: Vector3.create(18, 5, -12),
        cameraTarget: Vector3.create(16, 1, 14),
    })
    engine.removeSystem(enemySpawnSystem)
    utils.timers.clearInterval(timerId)
    console.log('gamesecs:', gameSecs,'speed:', SPEED, 'offset:', MAX_TIME_OFFSET, 'spawn:', BASE_SPAWN_TIME)





}






