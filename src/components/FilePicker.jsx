// import React from 'react'
// import { useSnapshot } from 'valtio'
// import state from '../store'

// const FilePicker = () => {
//     const snapForState=useSnapshot(state);
//   return (
//     <div>
//         <div className='ImageInput bg-slate-700 absolute left-full ml-3 top-[30%]'>
//             <input className='bg-red-600' id='filePicker' type='file' accept='image/*' onChange={function (image){
//                 const filePicked=image.target.files[0];
//                 const reader=new FileReader();
//                 reader.onloadend =()=>{
//                     const binaryString = reader.result;
//                     const base64String = btoa(binaryString);
//                     state.logo = base64String;
//                     console.log(state.logo);
//                 }
//                 reader.readAsDataURL(filePicked);
//                 // state.logo=URL.createObjectURL(filePicked);
//                 // console.log(state.logo);
//             }}></input>
//             <label htmlFor='filePicker'>Upload Logo</label>
//         </div>
//     </div>
//   )
// }

// export default FilePicker



import React from 'react'

import CustomButton from './CustomButton'

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          text="Upload Logo"
          handleClick={() => readFile('logo')}
        />
      </div>
    </div>
  )
}

export default FilePicker
