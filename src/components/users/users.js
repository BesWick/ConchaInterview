import { useEffect, useState } from 'react'
import axios from 'axios'
import './users.css'

const testData = [
    {
        name: 'Amy Lee',
        value: '#f00',
    },
    {
        name: 'Jackie Chan',
        value: '#0f0',
    },
    {
        name: 'Logan Logan',
        value: '#00f',
    },
    {
        name: 'Miley Cruz',
        value: '#0ff',
    },
    {
        name: 'Alan Wu',
        value: '#f0f',
    },
    {
        name: 'Christopher Malon',
        value: '#ff0',
    },
    {
        name: 'Amy Lee',
        value: '#f00',
    },
    {
        name: 'Jackie Chan',
        value: '#0f0',
    },
    {
        name: 'Logan Logan',
        value: '#00f',
    },
    {
        name: 'Miley Cruz',
        value: '#0ff',
    },
    {
        name: 'Alan Wu',
        value: '#f0f',
    },
    {
        name: 'Christopher Malon',
        value: '#ff0',
    },
]

const API_URL = `https://interviews-backend-api.herokuapp.com/api/v1`
function UsersList({ toggle }) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/users`)
            console.log('DATA', data)
            setUsers(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='popUp'>
            <div className='list'>
                {users.map((data) => (
                    <div key={data.ID} className='listItem'>
                        <div id='userinfo'>{data.name}</div>
                    </div>
                ))}
            </div>
            <input type='button' value='x' id='close' onClick={toggle} />
        </div>
    )
}

export default UsersList
