/**
 * Created by kathy on 22/02/2018.
 */
import React from 'react';

import './sharedCSS.css';
// import {ListGroup,ListGroupItem,Panel, Button} from 'react-bootstrap';
// import Shared from './shared';

export default class SignOut extends React.Component{

    componentWillMount(){
        this.props.onTokenChange('','',false);
        this.props.history.push("/home");
    }
    render(){

        return (
            <div></div>
        )
    }


};
