import { Color4 } from '@dcl/sdk/math'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import * as ui from 'dcl-ui-toolkit'
import * as utils from '@dcl-sdk/utils'



export function initUI() {
    ReactEcsRenderer.setUiRenderer(ui.render)
}



export const score = ui.createComponent(ui.UICounter, {
    value: 0,
    startHidden: false,
    xOffset: -150,
    yOffset: 665,
    color: Color4.Black(),
    size: 50,
    fixedDigits: 3,
})





export const highscore = ui.createComponent(ui.UICounter, {
    value: 0,
    startHidden: false,
    xOffset: -375,
    yOffset:  665,
    color: Color4.Black(),
    size: 50,
    fixedDigits: 3,
})



const deathAnnouncement = ui.createComponent(ui.Announcement, {
    value: 'SCORE: \n HIGHSCORE: ',
    startHidden: true,
    duration: 4,
    color: Color4.Red(),
    size: 50,
    xOffset: 0,
    yOffset: -50,
})












const scoreAnnouncement = ui.createComponent(ui.Announcement, {
    value: score.read(),
    startHidden: true,
    duration: 4,
    color: Color4.Red(),
    size: 50,
    xOffset: 250,
    yOffset: 20,
})


const highscoreAnnouncement = ui.createComponent(ui.Announcement, {
    value: highscore.read(),
    startHidden: true,
    duration: 4,
    color: Color4.Red(),
    size: 50,
    xOffset: 250,
    yOffset: -50,
})


const gameOver = ui.createComponent(ui.CenterImage, {
    image: 'images/info.png',
    duration: 3,
    startHidden: true,
    xOffset: 0,
    yOffset: 150,
    width: 400,
    height: 200,
    section: {
      sourceHeight: 100,
      sourceWidth: 220,
      sourceLeft: 350,
      sourceTop: 870,
      atlasWidth: 920,
      atlasHeight: 1000,
    },
  })


  export const instruct = ui.createComponent(ui.CenterImage, {
    image: 'images/info.png',
    duration: 3,
    startHidden: true,
    xOffset: 0,
    yOffset: -200,
    width: 450,
    height: 175,
    section: {
      sourceHeight: 250,
      sourceWidth: 900,
      sourceLeft: 0,
      sourceTop: 0,
      atlasWidth: 920,
      atlasHeight: 1000,
    },
  })




  const scoreIcon = ui.createComponent(ui.SmallIcon, {
    image: 'images/info.png',
    xOffset: -250,
    yOffset: 650,
    width: 125,
    height: 75,
    section: {
        sourceHeight: 100,
        sourceWidth: 140,
        sourceLeft: 380,
        sourceTop: 290,
        atlasWidth: 920,
        atlasHeight: 1000,
      },
    startHidden: false,
  })

  const highScoreIcon = ui.createComponent(ui.SmallIcon, {
    image: 'images/info.png',
    xOffset: -475,
    yOffset: 650,
    width: 125,
    height: 75,
    section: {
        sourceHeight: 100,
        sourceWidth: 225,
        sourceLeft: 350,
        sourceTop: 470,
        atlasWidth: 920,
        atlasHeight: 1000,
      },
    startHidden: false,
  })

  const announcement = ui.createComponent(ui.Announcement, {
    value: 'Press the green cat ball to start game! \n After you start press E to fly upwards!!',
    startHidden: false,
    duration: 8,
    color: Color4.Green(),
    size: 50,
    xOffset: 0,
    yOffset: -300,
  })






 

export function deathScores() {

    gameOver.show()


    deathAnnouncement.show()
    scoreAnnouncement.value = score.read()

    scoreAnnouncement.show()
    highscoreAnnouncement.value = highscore.read()

    highscoreAnnouncement.show()

    utils.timers.setTimeout(
        function () {
            deathAnnouncement.hide()
            scoreAnnouncement.hide()
            highscoreAnnouncement.hide()
            gameOver.hide()
        },
        4000
    )


}

