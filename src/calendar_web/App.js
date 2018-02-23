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
                            <NavItem eventKey={4} ref={input=>this.signinItem = input}>
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
            <Route path="/calendar" exact render={(props)=><DatesCreater {...props}/>}/>
            <Route path="/calendar/eventlist/:id" exact render={(props)=><EventList {...props}/>}/>
            <Route path="/signup" exact render={(props)=><SignUp {...props}/>}/>
            <Route path="/signin" exact render={(props)=><SignIn {...props}/>}/>
            <Route path="/signout" exact render={(props)=><SignOut {...props}/>}/>
          </Switch>

            </div>
        </Router>
          <Navbar fixedBottom inverse className="footer_navbar">
              <div className="footer_font">
                  <span>© 2018 Kathy Ding</span>
                  <br/>
                  <span>Powered by kathyding.cn@gmail.com</span>
              </div>

          </Navbar>

      </div>
    );
  }
}

export default App;
