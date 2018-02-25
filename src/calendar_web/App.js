import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, MenuItem,NavItem} from 'react-bootstrap';


import './App.css';

import DatesCreater from './datesCreater';
import EventList from './eventList';
import Home from './home';
import SignIn from './shared/signin';
import SignUp from './shared/signup';
import SignOut from './shared/signout';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            token:{email:'', username:''}
        }
        this.handleTokenChange = this.handleTokenChange.bind(this);
    }

    handleTokenChange(email, username){
        console.log('in appjs email username',email, username);
        this.setState({token:{email:email, username:username}}, ()=>{

            ReactDOM.findDOMNode(this.signinItem).innerHTML = "Welcome!  "+ this.state.token.username;
            ReactDOM.findDOMNode(this.signinItem).className = "userNameText";
            ReactDOM.findDOMNode(this.signupItem).innerHTML = '';

        });
    }
  render() {
    return (
      <div>
        <Router>
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Family Management System</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={2}  >
                            <Link to="/calendar">Family Calendar</Link>
                        </NavItem>
                        <NavItem eventKey={3} >
                            <Link to="/expense">Family Expenses</Link>
                        </NavItem>
                    </Nav>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={4} ref={input=>this.signupItem = input}>
                                <Link to="/signup"><i className="fas fa-user-plus" title="sign up"> </i> </Link>
                            </NavItem>
                            <NavItem eventKey={5} ref={input=>this.signinItem = input}>
                                <Link to="/signin"><i className="fas fa-sign-in-alt" title="sign in"> </i></Link>
                            </NavItem>
                            <NavItem eventKey={6} >
                                <Link to="/signout"><i className="fas fa-sign-out-alt"  title="sign out"> </i></Link>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

          <Switch>
            {/*<Route path="/" exact component={DatesCreater}/>*/}
            <Route path="/" exact render={(props)=><Home {...props}/>}/>
            <Route path="/home" exact render={(props)=><Home {...props}/>}/>
            <Route path="/calendar" exact render={(props)=><DatesCreater {...props} email={this.state.token.email} username={this.state.token.username}/>}/>
            <Route path="/calendar/eventlist/:id" exact render={(props)=><EventList {...props} email={this.state.token.email} username={this.state.token.username}/>}/>
            <Route path="/signup" exact render={(props)=><SignUp {...props}/>}/>
              <Route path="/signin" exact render={props=><SignIn {...props} onTokenChange={this.handleTokenChange}/>} />
            <Route path="/signout" exact render={(props)=><SignOut {...props} onTokenChange={this.handleTokenChange}/>}/>
          </Switch>

            </div>
        </Router>
          <Navbar fixedBottom inverse className="footer_navbar">
              <div className="footer_font">
                  <span>© 2018 Kai Ding</span>
                  <br/>
                  <span>Powered by kathyding.cn@gmail.com</span>
              </div>

          </Navbar>

      </div>
    );
  }
}

export default App;
