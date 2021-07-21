import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../state/actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch()

    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(startSaveNote( active ))
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
      let file = e.target.files
      
      if(file){
          dispatch( startUploading(file))
      }
    }
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input id="fileSelector"
                   type="file"
                   name="file"
                   onChange={handleFileChange}
                   style={{display: "none"}}/>

            <div>
                <button className="btn"
                        onClick={handlePictureClick}>
                    Picture
                </button>

                <button className="btn"
                        onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
