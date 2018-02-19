/**
 * Created by kathy on 19/02/2018.
 */


import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import './datesContainer.css';
import {Panel} from 'react-bootstrap';

import DatesCreater from './datesCreater';

export default class DatesContainer extends React.Component{

    render(){
        return(
            <Panel className="appFrame">
                <h3> Family Calendar</h3>
                <Panel.Body>
                   <DatesCreater />
                </Panel.Body>
            </Panel>
        )
    }
}
