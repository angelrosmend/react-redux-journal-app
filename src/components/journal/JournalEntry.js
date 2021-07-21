import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../state/actions/notes'

export const JournalEntry = (props) => {
    const {id, date, title, body, url} = props
    const noteDate = moment(date)
    const dispatch = useDispatch()
    
    const handleActiveClick = () => {
        dispatch(activeNote(id, props))
    }
    return (
        <div className="journal__entry pointer"
             onClick={handleActiveClick}>
            
           {url &&
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
            ></div>}

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>

        </div>
    )
}
