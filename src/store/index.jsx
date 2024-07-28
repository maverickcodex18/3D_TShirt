import {proxy} from 'valtio'

const state= proxy({
    intro : true,
    logoDecal: '/threejs.png',
    color: 0xFFBF00,
    count:4,
    isLogoTexture:true
})

export default state;
