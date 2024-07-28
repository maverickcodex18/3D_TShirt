import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
    const snapForState=useSnapshot(state)
  return (
    <div className="absolute left-full ml-3 top-[30%]">
        <SketchPicker disableAlpha color={snapForState.color} onChange={function (color){
            state.color=color.hex
        }}></SketchPicker>
    </div>
  )
}

export default ColorPicker
