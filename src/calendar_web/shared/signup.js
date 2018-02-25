


import React from 'react';
import axios from 'axios';
import {Button, Panel} from 'react-bootstrap';


 import './sharedCSS.css';
 import Shared from './shared';


export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            username:'',
            password:'',
            password2:'',
            verifyPass:true
        }
    }
    isVerified = (verifypass)=>{

        if(verifypass)
        {return 'verifyPassClass';}
        else
        {return 'verifyFailedClass';}
    }

    render(){
        return(
            <Panel className="appFrame">
                <h3> Register a family email and user name</h3>
                <Panel.Body className="panelBody">
            <div className="inputLabelBlock">
                <label for="userEmail" ><i className="far fa-envelope"> </i> Family Email:</label>
                <input name="userEmail" type="email" id="userEmail"  onChange={(e) => {
                    this.setState({email: e.target.value, username:this.state.username,
                        password: this.state.password, password2: this.state.password2, verifyPass:true})
                }}/>
            </div>
            <div className="inputLabelBlock">
                <label ><i className="far fa-user"></i> User Name:</label>
                <input type="text" onChange={(e) => {
                    this.setState({email:this.state.email, username:e.target.value,
                        password: this.state.password, password2: this.state.password2, verifyPass:true})
                }}/>
            </div>
            <div className="inputLabelBlock">
                <label><i className="fas fa-key"></i> PassWord:</label>
                <input type="password" onChange={(e) => {
                    this.setState({email:this.state.email, username:this.state.username,
                        password: e.target.value, password2: this.state.password2, verifyPass:true})
                }}/>
            </div>
            <div className="inputLabelBlock">
                <label>  PassWord Re-Type: </label>
                <input type="password" className={this.isVerified(this.state.verifyPass)} onBlur={(e) => {
                     if(this.state.password !== e.target.value){
                         console.log('password not consistence');
                         this.setState({
                             email:this.state.email,
                             username:this.state.username,
                             password:this.state.password,
                             password2:'',
                             verifyPass:false
                         });
                     }
                     else {
                         console.log("consistence");
                         this.setState({
                             email:this.state.email,
                             username:this.state.username,
                             password:this.state.password,
                             password2:'',
                             verifyPass:true
                         });
                     }
                }}/>
            </div>
            <div className="inputLabelBlock">
                <Button  className="btn-primary signupBtn" onClick={()=>{
                    // this.props.onTokenChange(this.state.username);
                    this.setState((prevState, props)=>(
                        {email:prevState.email,
                            username:prevState.username,
                            password:prevState.password,
                            password2:prevState.password2}
                    ));
                    console.log('in sign up this.props', this.props);
                    // this.props.history.push(this.props.location.state.from.pathname);


                    axios.post('https://still-basin-43768.herokuapp.com/api/userslists',{
                         email: this.state.email, username: this.state.username, password: this.state.password
                    })
                        .then(({data})=>{
                            console.log("data from post is", data);
                            this.props.history.push( "/calendar");
                        })
                        .catch((err)=>{throw(err)});


                }}>  Submit </Button>
            </div>
                </Panel.Body>
            </Panel>
        )
    }
}