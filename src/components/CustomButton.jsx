import React from 'react'
import {motion} from 'framer-motion'

const CustomButton = (props) => {
  return (
    <motion.button className={`bg-orange-600 hover:bg-orange-500 rounded-full active:bg-yellow-500*/ p-3 font-bold text-gray-800`}
      whileHover={{scale:1.1}}
      whileTap={{scale:0.8}}
      onClick={props.handleClick}
      >
        {props.text}
    </motion.button>
  )
}

export default CustomButton
