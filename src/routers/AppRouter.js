import React,{useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import {firebase} from '../firebase/config';
import { useDispatch } from 'react-redux';
import { login } from '../state/actions/auth';
import { setNotes, startLoadingNotes } from '../state/actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) =>{
           if(user?.uid){
               dispatch(login(user.uid, user.displayName))
               setLogged(true)

               dispatch(startLoadingNotes(user.uid))
           }else{
               setLogged(false)
           }
           setChecking(false)
        });
        /* return () => {
            cleanup
        } */
    }, [dispatch, checking])

    if(checking) return <h1> Espere un momento...</h1>
    return (
        <Router>
            <div>
                <Switch>
                    <Route 
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <Route 
                        exact
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
