

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import CustomButton from '../components/CustomButton';
import Tab from '../components/Tab';
import ColorPicker from '../components/ColorPicker'
import FilePicker from '../components/FilePicker';

const Customizer = () => {
  const snapShotForState=useSnapshot(state);
  const [file, setFile] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
      default:
        return null;
    }
  }


  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;
    console.log(state.logo);
  }


  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }



  return (
    <AnimatePresence>
      {
        !snapShotForState.intro && (
          <>
            <motion.div
              key="custom"
              className="mx-2 absolute top-[2%] translate-y-[-50%] left-0 z-10 gap-4 grid"
              {...slideAnimation('left')}
              >
                <div className="flex items-center min-h-screen">
                  <div className="">
                    {EditorTabs.map((tab) => (
                      <Tab
                        key={tab.name}
                        tab={tab}
                        handleClick={() => {setActiveEditorTab(tab.name)}}
                      />
                    ))}
                    {generateTabContent()}
                </div>
              </div>
            </motion.div>


            <motion.div {...fadeAnimation} className='absolute z-10 top-[5%] right-[2%]'>
              <CustomButton text="Go Back" handleClick={function (){
              state.intro=true;
            }}></CustomButton>
            </motion.div>


            {/* <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={()=>{}}
                handleClick={() => {}}
              />
            ))}
          </motion.div> */}

          </>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer
