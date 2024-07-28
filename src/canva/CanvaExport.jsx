import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Canva from './Canva';
import { slideAnimation } from '../config/motion';
import state from '../store';

const CanvaExport = () => {
  return (
    <AnimatePresence>
         <motion.div
              {...slideAnimation('right')}
              >
                <Canva></Canva>
              </motion.div>
    </AnimatePresence>
  )
}

export default CanvaExport
