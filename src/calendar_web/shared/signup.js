


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
            userName:'',
            passWord:'',
            passWord2:'',
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
                    this.setState({email: e.target.value, userName:this.state.userName,
                        passWord: this.state.passWord, passWord2: this.state.passWord2, verifyPass:true})
                }}/>
            </div>
            <div className="inputLabelBlock">
                <label ><i className="far fa-user"></i> User Name:</label>
                <input type="text" onChange={(e) => {
                    this.setState({email:this.state.email, userName:e.target.value,
                        passWord: this.state.passWord, passWord2: this.state.passWord2, verifyPass:true})
                }}/>
            </div>
            <div className="inputLabelBlock">
                <label><i className="fas fa-key"></i> PassWord:</label>
                <input type="password" onChange={(e) => {
                    this.setState({email:this.state.email, userName:this.state.userName,
                        passWord: e.target.value, passWord2: this.state.passWord2, verifyPass:true})
                }}/>
            </div>
            <div className="inputLabelBlock">
                <label>  PassWord Re-Type: </label>
                <input type="password" className={this.isVerified(this.state.verifyPass)} onBlur={(e) => {
                     if(this.state.passWord !== e.target.value){
                         console.log('password not consistence');
                         this.setState({
                             email:this.state.email,
                             userName:this.state.userName,
                             passWord:this.state.passWord,
                             passWord2:'',
                             verifyPass:false
                         });
                     }
                     else {
                         console.log("consistence");
                         this.setState({
                             email:this.state.email,
                             userName:this.state.userName,
                             passWord:this.state.passWord,
                             passWord2:'',
                             verifyPass:true
                         });
                     }
                }}/>
            </div>
            <div className="inputLabelBlock">
                <Button  className="btn-primary signupBtn" onClick={()=>{
                    // this.props.onTokenChange(this.state.userName);
                    this.setState((prevState, props)=>(
                        {email:prevState.email,
                            userName:prevState.userName,
                            passWord:prevState.passWord,
                            passWord2:prevState.passWord2}
                    ));
                    console.log('in sign up this.props', this.props);
                    // this.props.history.push(this.props.location.state.from.pathname);
/*                    axios.post('https://still-basin-43768.herokuapp.com/api/Users/login',{
                        username:this.state.userName,
                        email: this.state.email,
                        password: this.state.passWord
                    })
                        .then(({data})=>{
                            console.log("data from post is", data);
                            this.props.history.push( "/");
                        })
                        .catch((err)=>{throw(err)});*/

                    axios.post('https://still-basin-43768.herokuapp.com/api/eventslists',{
                        events:[{email:'123@gmail.com',name:'dingding',year:2018,month:2,date:18,time:'0203'},
                            {email:'456@gmail.com',name:'huang',year:2018,month:2,date:23,time:'0434'}]
                    })
                        .then(({data})=>{
                            console.log("data from post is", data);
                            this.props.history.push( "/");
                        })
                        .catch((err)=>{throw(err)});


                }}>  Submit </Button>
            </div>
                </Panel.Body>
            </Panel>
        )
    }
}