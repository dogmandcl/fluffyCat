import { Vector3, Quaternion } from '@dcl/sdk/math';
import  *  as  npc  from  'dcl-npc-toolkit'
import { Dialog } from  'dcl-npc-toolkit'
import { instruct } from './UI';



export function newNPC(){

let  ILoveCats: Dialog[] = [
	{
		text:  `Click the green button to start the game!!!`,
        name: "ILoveCats",
        fontSize: 10,
        portrait: {
      path: 'images/npc.png'
    },
		isEndOfDialog:  true
	}
]

let  myNPC = npc.create(
	{position:  Vector3.create(4,0,36),rotation:Quaternion.Zero(), scale:  Vector3.create(1,1,1)},
	//NPC Data Object
	{
		type:  npc.NPCType.CUSTOM,
		model:  'models/cat.glb',
        faceUser: true,
		onActivate:()=>{console.log('npc activated')
        npc.talk(myNPC, ILoveCats );}
     
	}
)

// npc.getData(myNPC).visible = true
}