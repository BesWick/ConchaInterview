import AudioLayer from './components/audioLayer'

// Firebase.
import firebase from 'firebase/app'
import 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// Styles
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined'
import HeadsetIcon from '@material-ui/icons/Headset'
import './App.css' // This uses CSS modules.
import './firebaseui-styling.global.css' // Import globally.
import { useState, useEffect } from 'react'
// Load Amaranth typeface
require('typeface-amaranth')

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./firebase-config.json').result

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp(firebaseConfig)

function App() {
    const [loginUser, setloginUser] = useState(false)

    useEffect(() => {
        const unRegisterAuthObserver = firebaseApp
            .auth()
            .onAuthStateChanged((user) => {
                setloginUser(!!user)
            })
        return () => {
            unRegisterAuthObserver()
        }
    }, [])

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    }

    return (
        <div className='App'>
            <div className='container'>
                {!loginUser && (
                    <div className='loginPage'>
                        <div className='logo'>
                            <i className='logoIcon'>
                                <HeadsetOutlinedIcon fontSize='large' />
                            </i>{' '}
                            Concha Labs Take Home
                        </div>
                        <div className='caption'>Please Log in </div>
                        <StyledFirebaseAuth
                            className='firebaseUi'
                            uiConfig={uiConfig}
                            firebaseAuth={firebaseApp.auth()}
                        />
                    </div>
                )}
                {loginUser && (
                    <div className='signedIn'>
                        <p>
                            Hello {firebaseApp.auth().currentUser.displayName}.
                            You are now signed In!
                        </p>
                        <AudioLayer />
                        <a
                            className='button'
                            onClick={() => firebaseApp.auth().signOut()}>
                            Sign-out
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
