import React, { Component } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types';
const Users = ({users, loading}) => {
    // state = {
    //     users : [
    //         {
    //         "login": "mojombo",
    //         "id": 1,
    //         "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",      
    //         "html_url": "https://github.com/mojombo",
    //         },
    //         {
    //         "login": "defunkt",
    //         "id": 2,             
    //         "avatar_url": "https://avatars0.githubusercontent.com/u/2?v=4",              
    //         "html_url": "https://github.com/defunkt",             
    //         },
    //         {
    //         "login": "pjhyett",
    //         "id": 3,               
    //         "avatar_url": "https://avatars0.githubusercontent.com/u/3?v=4",  
    //         "html_url": "https://github.com/pjhyett",
    //         }
    //     ]
    // } 
    if(loading) {
        return <Spinner/>
    } else {
        return (
            <div style={userStyle}>
                {users.map( user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

Users.protoType = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    display : 'grid',
    gridTemplateColumns : 'repeat(3,1fr)',
    gridGap: '1rem'
}
export default Users
