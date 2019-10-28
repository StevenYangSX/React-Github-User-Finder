import React, {Fragment, Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import axios from 'axios';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/pages/About'


class App extends Component{
  
    state = {
      users : [],
      loading: false,
      alert: null,
      user: {},
      repos: []
  }

  async componentDidMount() {
    this.setState({loading: true});
    console.log(process.env.REACT_APP_GITHUB_CILENT_SECRET)
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users : res.data, loading : false})
  }

  searchUsers =  async text => {
    //console.log(text)
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users : res.data.items, loading : false})
  }

  //get one Github user
  getUser = async username => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user : res.data, loading : false})
  }

  //get user's repos
  getUserRepos = async username => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos : res.data, loading : false})
  }

  //clear users from state
  clearUsers = () => {
    this.setState({users: [], loading: false});
  }

  setAlert = (message, type) => {
    this.setState({alert: {msg : message, type: type}});
    setTimeout(()=> this.setState({alert: null}), 4000)
  }

  render() {
    const {users, loading, user, repos} = this.state;
    
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github"/> 
            <div className="container">
              <Alert alert={this.state.alert}/>
              <Switch>
                <Route exact path="/" render={props => (
                  <Fragment>
                    <Search searchUsers={this.searchUsers} 
                      clearUsers={this.clearUsers} 
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}/>
                    <Users loading={loading} users={users}/>
                  </Fragment>
                )}/>
                <Route exact path="/about" component={About}/>
                
                <Route exact path="/user/:login" render={props =>(
                  <User {...props} 
                      getUser={this.getUser} 
                      getUserRepos={this.getUserRepos}
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
 
}

export default App;
