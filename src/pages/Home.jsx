import React from 'react'
import {motion , AnimatePresence} from 'framer-motion'
import { useSnapshot } from 'valtio'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion'

import state from '../store'
import CustomButton from '../components/CustomButton'


const Home = () => {

  const snapShotForState = useSnapshot(state);


  return (
    <AnimatePresence>
      {
        snapShotForState.intro && (
          <motion.div className='home mx-6' {...slideAnimation("left")}>
            <motion.div className='logo' {...slideAnimation('down')}>
              <img className='w-8 h-8 object-contain' src='..\..\public\threejs.png' alt='3D T-Shirt Customizer'></img>
            </motion.div>
            <motion.div {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className='font-bold text-7xl'>
                LET'S DO IT
                </h1>
              </motion.div>
              <motion.div {...headContentAnimation}>
                <p className='max-w-md text-gray-500 font-normal text-base'>
                Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                </p>
              </motion.div>
            </motion.div>


            <CustomButton {...slideAnimation("left")} text="Customize It" handleClick={function (){
              state.intro=false;
            }}></CustomButton>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default Home
