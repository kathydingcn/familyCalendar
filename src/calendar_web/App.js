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

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            {/*<Route path="/" exact component={DatesCreater}/>*/}
            <Route path="/" exact render={(props)=><DatesCreater {...props}/>}/>
            <Route path="/calendar" exact render={(props)=><DatesCreater {...props}/>}/>
            <Route path="/calendar/eventlist/:id" exact render={(props)=><EventList {...props}/>}/>

          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
