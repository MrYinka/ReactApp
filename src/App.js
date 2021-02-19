import React, {Component, Fragment} from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from "axios";
import './App.css';
import Navbar from "./components/layout/Navbar";
import UserItem from "./components/users/UserItem";
import User from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

class App extends Component {

    state = {
        users: [],
        loading: false,
        alert: null
    };

    searchUsers = async text => {
        this.setState({
            loading: true,
        });
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({
            users: res.data.items,
            loading: false
        });
    };

    clearUsers = () => {
        return this.setState({
            users: [],
            loading: false
        });
    };

    setAlert = (msg, type) => {
        this.setState({
            alert: { msg, type }
        });

        setTimeout(()=> {
            this.setState({
                alert:null
            })
        }, 5000)
    };

    resetAlert = () => {
        this.setState({
            alert:null
        })
    }

    render() {
      return (
          <Router>
              <div className='App'>
                  <Navbar title="GitHub Finder" icon="fab fa-github"/>
                  <div className="container">
                      <Alert alert={this.state.alert}/>
                      <Switch>
                          <Route exact path='/' render={props => (
                              <Fragment>
                                  <Search
                                      searchUsers={this.searchUsers}
                                      clearUsers={this.clearUsers}
                                      showClear={this.state.users.length > 0 ? true : false}
                                      setAlert={this.setAlert}
                                      resetAlert={this.resetAlert}
                                  />
                                  <User loading={this.state.loading} users={this.state.users}/>
                              </Fragment>
                          )} />
                          <Route exact path='/about' component={About}/>
                      </Switch>
                  </div>
              </div>
          </Router>
      );
  }
};

export default App;
