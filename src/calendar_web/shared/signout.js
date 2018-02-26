/**
 * Created by kathy on 22/02/2018.
 */
import React from 'react';

import './sharedCSS.css';
import {ListGroup,ListGroupItem,Panel, Button} from 'react-bootstrap';
import Shared from './shared';

export default class SignOut extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        this.props.onTokenChange('','',false);
        this.props.history.push("/home");
        return (
            <div></div>
        )
    }


};
