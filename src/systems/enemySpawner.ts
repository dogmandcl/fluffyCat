import { spawnEnemy } from '../enemy'
import { engine, AudioSource, Transform } from '@dcl/sdk/ecs'
import { ShipShapes, SpawnerComponent, SpawnerShape } from '../components/customComponents'
import { BASE_SPAWN_TIME, MAX_TIME_OFFSET } from '../startButton'

// General config

const POSITION_Z = 30

const spaceships = {
    redSpaceship: 'models/spikeBall.glb',
    greenSpaceship: 'models/wall.glb',
    blueSpaceship: 'models/spikeBall.glb'
}

// Randomise the spawn time
function getRandomSpawnTime(): number {
    return BASE_SPAWN_TIME + Math.random() * MAX_TIME_OFFSET
}

export function enemySpawnSystem(dt: number) {
    for (const [entity] of engine.getEntitiesWith(SpawnerComponent)) {
        const spawner = SpawnerComponent.getMutable(entity)

        spawner.timeToNextSpawn -= dt

        if (spawner.timeToNextSpawn < 0) {
            spawner.timeToNextSpawn = getRandomSpawnTime()

            const spawnerTransform = Transform.get(entity)

            var x: number
            var y: number
            var shape: ShipShapes
            switch (spawner.spawnerShape) {
                case SpawnerShape.SQUARE:
                    x = spawnerTransform.position.x - spawner.size / 2 + Math.random() * spawner.size
                    //   y = spawnerTransform.position.y - spawner.size / 2 + Math.random() * spawner.size
                    y = 2
                    shape = ShipShapes.BLUE
                    break
                case SpawnerShape.CIRCLE:
                    const r3 = Math.random()
                    const r4 = Math.random()
                    const sqrtR2 = Math.sqrt(r3)
                    const pointD = [5.514, -1.06]
                    const pointE = [0, 1.289]
                    const pointF = [-5.514, -0.206]
                    x =
                        spawnerTransform.position.x +
                        (1 - sqrtR2) * pointD[0] +
                        sqrtR2 * (1 - r4) * pointE[0] +
                        sqrtR2 * r4 * pointF[0]
                    y =
                        spawnerTransform.position.y +
                        (1 - sqrtR2) * pointD[1] +
                        sqrtR2 * (1 - r3) * pointE[1] +
                        sqrtR2 * r3 * pointF[1]

                    shape = ShipShapes.GREEN
                    break
                case SpawnerShape.TRIANGLE:
                    const r1 = Math.random()
                    const r2 = Math.random()
                    const sqrtR1 = Math.sqrt(r1)
                    const pointA = [4.514, -1.06]
                    const pointB = [0, 1.289]
                    const pointC = [-4.514, -0.206]
                    x =
                        spawnerTransform.position.x +
                        (1 - sqrtR1) * pointA[0] +
                        sqrtR1 * (1 - r2) * pointB[0] +
                        sqrtR1 * r2 * pointC[0]
                    y =
                        spawnerTransform.position.y +
                        (1 - sqrtR1) * pointA[1] +
                        sqrtR1 * (1 - r2) * pointB[1] +
                        sqrtR1 * r2 * pointC[1]

                    shape = ShipShapes.BLUE
                    break
            }

            spawnEnemy(shape, x, y, POSITION_Z)

        }
    }
}