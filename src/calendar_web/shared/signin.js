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
                    <h3> &#10035; &#10035; &#10035; Login  &#10035; &#10035; &#10035;</h3>
                    <Panel.Body className="panelBody">
                        <div className="inputLabelBlock">
                            <label htmlFor="userEmail" ><i className="far fa-envelope"> </i> Family Email:</label>
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
                                // this.props.history.push(this.props.location.state.from.pathname);

                            axios.get(`https://still-basin-43768.herokuapp.com/api/userslists?filter[where][username]=${this.state.username}&filter[where][email]=${this.state.email}`)
                                .then((res)=>{
                                if(res){
                                    if(res.data.length > 0){
                                        this.props.onTokenChange(this.state.email, this.state.username, true);
                                        this.props.history.push("/home");
                                    }else{
                                        alert("The username does not exist, please sign up firstly");
                                        this.props.history.push("/signup");
                                    }
                                }

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
