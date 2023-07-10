import { engine, GltfContainer, Transform,  AvatarAnchorPointType, AvatarAttach, Material } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { ShipShapes, SpawnerComponent, SpawnerShape} from './components/customComponents'
import { createArissaCharacter } from './modules/arissa'
import { createAvatarSwappingArea, avatarSwappingSystem } from './modules/avatarSwappingArea'
import { createCreate, grabbingSystem } from './startButton'
import { expire } from './systems/expire'
import { moveSystem } from './systems/moveEnemy'
import { initUI } from './UI'
import { createSkybox } from './skybox'
import { createFlyArea } from './flightBox'


createSkybox()








export function main() {

  const ground = engine.addEntity()
  Transform.create(ground, {
    position: Vector3.create(16,-.05,16),
    scale: Vector3.create(1.04, 1, 2.08)
  })
  GltfContainer.create(ground, {
    src: 'models/grass.glb'
  })

  
initUI()

//AVATAR SWAP


  // Instantiate 'Arissa' character animated model
  const arissaCharaEntity = createArissaCharacter()
  const parent = Transform.get(arissaCharaEntity).parent
  if (parent) {
    AvatarAttach.create(parent, {
      anchorPointId: AvatarAnchorPointType.AAPT_POSITION
    })
  }

  // Set avatar modifier area to swap player avatar
  createAvatarSwappingArea(Vector3.create(16, 5, 4), Vector3.create(28, 8, 5), arissaCharaEntity)



  // Register avatar swapping system
  engine.addSystem(avatarSwappingSystem)

  const crate1 = createCreate(Vector3.create(16, 1.5, -10))

  // Portals
  const POSITION_Z = 30

  // --- green ---
  const greenPortal = engine.addEntity()
  Transform.create(greenPortal, {
    position: Vector3.create(16, 4, POSITION_Z)
  })
  GltfContainer.create(greenPortal, {
    src: ''
  })
  SpawnerComponent.create(greenPortal, {
    enemyShape: ShipShapes.GREEN,
    size: 6,
    spawnerShape: SpawnerShape.TRIANGLE,
    timeToNextSpawn: 1
  })

  // --- blue ---
  const bluePortal = engine.addEntity()
  Transform.create(bluePortal, {
    position: Vector3.create(27, 4.2, POSITION_Z)
  })
  GltfContainer.create(bluePortal, {
    src: ''
  })
  SpawnerComponent.create(bluePortal, {
    enemyShape: ShipShapes.BLUE,
    size: 6,
    spawnerShape: SpawnerShape.TRIANGLE,
    timeToNextSpawn: 1
  })

  // --- red ---
  const redPortal = engine.addEntity()
  Transform.create(redPortal, {
    position: Vector3.create(6, 4.5, POSITION_Z)
  })
  GltfContainer.create(redPortal, {
    src: ''
  })
  SpawnerComponent.create(redPortal, {
    enemyShape: ShipShapes.RED,
    size: 6,
    spawnerShape: SpawnerShape.TRIANGLE,
    timeToNextSpawn: 1
  })


	

	





}


createFlyArea()

engine.addSystem(grabbingSystem)

engine.addSystem(moveSystem)

engine.addSystem(expire)