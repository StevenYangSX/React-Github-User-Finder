import React, {Fragment, useState} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import axios from 'axios';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/pages/About'


const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
//above lines just the same thing to initilize the state using setState()
  //   state = {
  //     users : [],
  //     loading: false,
  //     alert: null,
  //     user: {},
  //     repos: []
  // }

  // async componentDidMount() {
  //   this.setState({loading: true});
  //   console.log(process.env.REACT_APP_GITHUB_CILENT_SECRET)
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users : res.data, loading : false})
  // }

  const searchUsers =  async text => {
    //console.log(text)
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // this.setState({users : res.data.items, loading : false})
    setUsers(res.data.items);
    setLoading(false);
  }

  //get one Github user
  const getUser = async username => {
    // this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // this.setState({user : res.data, loading : false})
    setUser(res.data);
    setLoading(false);
  }

  //get user's repos
  const getUserRepos = async username => {
    // this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // this.setState({repos : res.data, loading : false})
    setRepos(res.data);
    setLoading(false);
  }

  //clear users from state
  const clearUsers = () => {
    setRepos([]);
    setLoading(false);
  }

  const showAlert = (message, type) => {
    setAlert({message, type});
    setTimeout(()=> setAlert(null), 4000);
  }
    // const {users, loading, user, repos} = this.state; 
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/> 
          <div className="container">
            <Alert alert={alert}/>
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} 
                    clearUsers={clearUsers} 
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}/>
                  <Users loading={loading} users={users}/>
                </Fragment>
              )}/>
              <Route exact path="/about" component={About}/>
              
              <Route exact path="/user/:login" render={props =>(
                <User {...props} 
                    getUser={getUser} 
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos} 
                    loading={loading}/>
              )}/>
            </Switch>
            
          </div>      
      </div>
    </Router>
  );

 
}

export default App;
