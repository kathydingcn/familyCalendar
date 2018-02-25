/**
 * Created by kathy on 22/02/2018.
 */
import React from 'react';

import axios from 'axios';
import './sharedCSS.css';
import {ListGroup,ListGroupItem,Panel, Button} from 'react-bootstrap';
import Shared from './shared';

export default class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            username:'',
            password:''
        }
    }


    render(){
        return(
            <div>

                <Panel className="appFrame">
                    <h3> Please login with family email and user name</h3>
                    <Panel.Body className="panelBody">
                        <div className="inputLabelBlock">
                            <label for="userEmail" ><i className="far fa-envelope"> </i> Family Email:</label>
                            <input name="userEmail" type="email" id="userEmail"  onChange={(e) => {
                                this.setState({email: e.target.value, username:this.state.username,
                                    password: this.state.password})
                            }}/>
                        </div>
                        <div className="inputLabelBlock">
                            <label ><i className="far fa-user"></i> User Name:</label>
                            <input type="text" onChange={(e) => {
                                this.setState({email:this.state.email, username:e.target.value,
                                    password: this.state.password})
                            }}/>
                        </div>
                        <div className="inputLabelBlock">
                            <label><i className="fas fa-key"></i> PassWord:</label>
                            <input type="password" onChange={(e) => {
                                this.setState({email:this.state.email, username:this.state.username,
                                    password: e.target.value})
                            }}/>
                        </div>

                        <div className="inputLabelBlock">
                            <Button  className="btn-primary signupBtn" onClick={()=>{
                                this.props.onTokenChange(this.state.email, this.state.username);
                                this.setState((prevState, props)=>(
                                    {email:prevState.email,
                                        username:prevState.username,
                                        password:prevState.password }
                                ));
                                // console.log('in login this.props', this.props);
                                // this.props.history.push(this.props.location.state.from.pathname);
                            axios.get(`https://still-basin-43768.herokuapp.com/api/userslists/findOne?filter[where][username]=${this.state.username}`)
                                .then((data)=>{
                                alert("Login Success", data.data.username); //need write a common function later
                                console.log('data from query user id', data);
                                })
                                .catch((err)=>{
                                alert("Login Failed...");
                                console.log('err from sign in ',err); throw(err)});

                            }}>  Submit</Button>
                        </div>

                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}
