import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../state/actions/auth'
import { addNewNote } from '../../state/actions/notes'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    const dispatch = useDispatch()
     const {name} = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }
    const handleCreateNote = ()=> {
        dispatch(addNewNote())
    }
    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {name}</span>
                </h3>

                <button className="btn"
                        onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="journal__new-entry"
                 onClick={handleCreateNote}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
