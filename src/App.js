import { useState, useEffect } from 'react'
import AudioLayer from './components/audioLayer'
import UsersList from './components/users/users'
import axios from 'axios'

// Firebase.
import firebase from 'firebase/app'
import 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// Styles
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined'
import './App.css' // This uses CSS modules.
import './firebaseui-styling.global.css' // Import globally.
// Load Amaranth typeface
require('typeface-amaranth')

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./firebase-config.json').result

// Instantiate a Firebase app.
const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

// const firebaseApp = firebase.initializeApp(firebaseConfig)

const API_URL = `https://interviews-backend-api.herokuapp.com/api/v1`

//axios config
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        console.log('CONFIG TOKEN', token)
        if (token) {
            console.log('YESSS with token', token)
            config.headers.authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

function App() {
    const storedJwt = localStorage.getItem('token')
    const [jwt, setJwt] = useState(storedJwt || null)
    const [loginUser, setloginUser] = useState(false)
    const [showUsers, setFlag] = useState(false)

    useEffect(() => {
        const fetchKey = async () => {
            try {
                const { data } = await axios.post(`${API_URL}/api-key`)
                console.log(data)
                localStorage.setItem('token', data.key)
                setJwt(data.key)
                if (jwt) {
                    console.log('KEY:', data.key, jwt)
                }
            } catch (err) {
                console.log(err.message)
            }
        }
        if (!storedJwt) {
            fetchKey()
        }
        const unRegisterAuthObserver = firebaseApp
            .auth()
            .onAuthStateChanged((user) => {
                if (user && jwt) {
                    console.log('USER', firebaseApp.auth().currentUser.uid)
                    console.log('STATE CHANGE', jwt)
                    console.log('TOKENNN', localStorage.getItem('token'))
                    postUser(user)
                }
                setloginUser(!!user)
            })
        return () => {
            unRegisterAuthObserver()
        }
    }, [])

    const postUser = async ({ displayName, email, uid }) => {
        console.log('USER INFO: ', displayName, email, uid)
        try {
            const data = await axios.post(`${API_URL}/users`, {
                email: email,
                firebase_uid: uid,
                name: displayName,
            })
            console.log('POST DATA', data)
        } catch (err) {
            console.log('POST err' + err)
        }
    }

    const togglePopup = () => {
        setFlag(!showUsers)
    }

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
                        <div className='topBar'>
                            <p>
                                Hello{' '}
                                {firebaseApp.auth().currentUser.displayName}.
                                You are now signed In!
                            </p>
                            <div className='rightSide'>
                                <a
                                    className='signoutBtn'
                                    onClick={() =>
                                        firebaseApp.auth().signOut()
                                    }>
                                    Sign-out
                                </a>
                                <a onClick={togglePopup} className='signoutBtn'>
                                    Users
                                </a>
                            </div>
                        </div>
                        <AudioLayer />
                    </div>
                )}
                {showUsers && loginUser && (
                    <div className='usersPage'>
                        <UsersList toggle={togglePopup} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
