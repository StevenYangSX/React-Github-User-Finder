import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //search users
    const searchUsers =  async text => {
        //console.log(text)
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // this.setState({users : res.data.items, loading : false})
        // setUsers(res.data.items);

        // setLoading(false);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
      }
      
    //get user
    const getUser = async username => {
    // this.setState({loading: true});
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // this.setState({user : res.data, loading : false})
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
        // setLoading(false);
  }
    
    //get repos    
    const getUserRepos = async username => {
    // this.setState({loading: true});
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // this.setState({repos : res.data, loading : false})
        console.log(res.data)
        dispatch({
            tpye:GET_REPOS,
            payload: res.data
        })
  }
    //clear users
    const clearUsers = () => dispatch({type: CLEAR_USERS})
    
    //set loading
      const setLoading = () => dispatch({type: SET_LOADING})
    return <GithubContext.Provider 
    value={{users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser, 
            getUserRepos
                  
            }}>
                {props.children}
    </GithubContext.Provider>
}

export default GithubState;