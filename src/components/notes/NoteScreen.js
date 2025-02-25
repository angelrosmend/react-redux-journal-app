import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDelete, startSaveNote } from '../../state/actions/notes'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const {active: note} = useSelector(state => state.notes)

    const [formValues, handleInputChange, reset ] = useForm( note )

    const {body, title, id} = formValues
    
    const activeId = useRef(note.id)

    useEffect(()=> {
        if(note.id !==  activeId.current){
            reset(note)
            activeId.current = note.id
        }
    },[note, reset])

    useEffect(()=> {
        dispatch(activeNote(formValues.id, {...formValues}))
    },[formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDelete(id))
    }


    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                />

                {(note.url)
                 &&
                <div className="notes__image">
                    <img 
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                        alt="imagen"
                    />
                </div>}


            </div>

            <button className="btn btn-danger"
                    onClick={handleDelete}>
                Delete
            </button>

        </div>
    )
}
