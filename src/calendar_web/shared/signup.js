import React from 'react';
import axios from 'axios';
import {Button, Panel, Popover} from 'react-bootstrap';
import Popup from './popup';

import './sharedCSS.css';
import Shared from './shared';


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            verifyEmail: 0, // 0 display:none, 1 verifyPass, 2 verifyFail
            verifyUser: 0,
            verifyPwd: 0,
            verifyPwd2: 0,
            popup: {showPopup: false, title: '', content: ''}
        };
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*    isPwdVerified = (verifypwd2)=>{

     if(verifypwd2)
     {return 'verifyPassClass';}
     else
     {return 'verifyFailedClass';}
     };*/

    handleClosePopup() {
        // this.setState(Object.assign({},showPopup,false));
        this.setState({popup: {showPopup: false, title: '', content: ''}});
        this.props.history.push("/signin");
    }

    componentDidMount(){

    }

    handleSubmit(){
        {

            if ((this.state.verifyPwd === 1) && (this.state.verifyEmail === 1) && (this.state.verifyUser === 1) && (this.state.verifyPwd2 === 1)) {
                axios.get(`https://still-basin-43768.herokuapp.com/api/userslists?filter[where][email]=${this.state.email}&filter[where][username]=${this.state.username}`)
                    .then((res) => {
                        if (res.data.length > 0) {
                            // this user already exists, please login
                            this.setState({
                                popup: {
                                    showPopup: true,
                                    title: 'User Existed',
                                    content: 'user already existed, please login directly'
                                }
                            } );

                        } else {
                            // no such user in DB, create new one
                            axios.post('https://still-basin-43768.herokuapp.com/api/userslists', {
                                email: this.state.email,
                                username: this.state.username,
                                password: this.state.password
                            })
                                .then(() => {

                                    this.setState({
                                        popup: {
                                            showPopup: true,
                                            title: 'Congratulations',
                                            content: 'You already sign up successfully! Please Login'
                                        }
                                    } );
                                })
                                .catch((err) => {
                                    throw(err)
                                });
                        }
                    })
                    .catch((err) => {
                        throw(err)
                    });

            } else {
                this.setState({
                    popup: {
                        showPopup: true,
                        title: 'Failed',
                        content: 'Try to sign up again'
                    }
                } );
            }


        }
    }

    componentWillUnmount(){
        console.log('this component will be unmounted');
    }

    render() {
        return (
            <Panel className="appFrame">
                <h3> Register a family email and user name</h3>
                <Panel.Body className="panelBody">
                    <form>
                        <div className="inputLabelBlock">
                            <label htmlFor="userEmail"><i className="far fa-envelope"> </i> Family Email:</label>
                            <input name="userEmail" type="email" id="userEmail" onChange={(e) => {
                                this.setState({
                                    email: e.target.value,
                                    username: this.state.username,
                                    password: this.state.password,
                                    password2: this.state.password2,
                                    verifyEmail: this.state.verifyEmail,
                                    verifyUser: this.state.verifyUser,
                                    verifyPwd: this.state.verifyPwd,
                                    verifyPwd2: this.state.verifyPwd2
                                })
                            }} onBlur={(e) => {
                                if (!e.target.checkValidity(e.target.value)) {
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyEmail: -1,
                                        verifyUser: this.state.verifyUser,
                                        verifyPwd: this.state.verifyPwd,
                                        verifyPwd2: this.state.verifyPwd2
                                    })
                                } else {
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyEmail: 1,
                                        verifyUser: this.state.verifyUser,
                                        verifyPwd: this.state.verifyPwd,
                                        verifyPwd2: this.state.verifyPwd2
                                    })
                                }
                            }}/>
                            {this.state.verifyEmail !== 0 ? this.state.verifyEmail === 1 ? <span>&#10004;</span> :
                                <span>&#10006;</span> : <span></span>}

                        </div>
                        <div className="inputLabelBlock">
                            <label htmlFor="userName"><i className="far fa-user"></i> User Name:</label>
                            <input name="userName" type="text" pattern="^[a-zA-Z][a-zA-Z0-9]{1,15}$" onChange={(e) => {
                                this.setState({
                                    email: this.state.email,
                                    username: e.target.value,
                                    password: this.state.password,
                                    password2: this.state.password2,
                                    verifyEmail: this.state.verifyEmail,
                                    verifyUser: this.state.verifyUser,
                                    verifyPwd: this.state.verifyPwd,
                                    verifyPwd2: this.state.verifyPwd2
                                })
                            }} onBlur={(e) => {
                                if (!e.target.checkValidity(e.target.value)) {
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyEmail: this.state.verifyEmail,
                                        verifyUser: -1,
                                        verifyPwd: this.state.verifyPwd,
                                        verifyPwd2: this.state.verifyPwd2
                                    })
                                } else {
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyEmail: this.state.verifyEmail,
                                        verifyUser: 1,
                                        verifyPwd: this.state.verifyPwd,
                                        verifyPwd2: this.state.verifyPwd2
                                    })
                                }
                            }}/>
                            {this.state.verifyUser !== 0 ? this.state.verifyUser === 1 ? <span>&#10004;</span> :
                                <span>&#10006;</span> : <span></span>}
                        </div>
                        <div className="inputLabelBlock">
                            <label htmlFor="userPwd"><i className="fas fa-key"></i> PassWord:</label>
                            <input name="userPwd" type="password" onChange={(e) => {
                                this.setState({
                                    email: this.state.email,
                                    username: this.state.username,
                                    password: e.target.value,
                                    password2: this.state.password2,
                                    verifyEmail: this.state.verifyEmail,
                                    verifyUser: this.state.verifyUser,
                                    verifyPwd: this.state.verifyPwd,
                                    verifyPwd2: this.state.verifyPwd2
                                })
                            }} onBlur={(e) => {
                                if (!e.target.checkValidity(e.target.value)) {
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyEmail: this.state.verifyEmail,
                                        verifyUser: this.state.verifyUser,
                                        verifyPwd: -1,
                                        verifyPwd2: this.state.verifyPwd2
                                    })
                                } else {
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyEmail: this.state.verifyEmail,
                                        verifyUser: this.state.verifyUser,
                                        verifyPwd: 1,
                                        verifyPwd2: this.state.verifyPwd2
                                    })
                                }
                            }}/>
                            {this.state.verifyPwd !== 0 ? this.state.verifyPwd === 1 ? <span>&#10004;</span> :
                                <span>&#10006;</span> : <span></span>}
                        </div>


                        <div className="inputLabelBlock">
                            <label htmlFor="userPwd2"> PassWord Re-Type: </label>
                            <input name="userPwd2" type="password" onBlur={(e) => {
                                if (this.state.password !== e.target.value) {
                                    console.log('password not consistence');
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyPwd: this.state.verifyPwd,
                                        verifyUser: this.state.verifyUser,
                                        verifyPwd2: -1
                                    });
                                }
                                else {
                                    console.log("consistence");
                                    this.setState({
                                        email: this.state.email,
                                        username: this.state.username,
                                        password: this.state.password,
                                        password2: this.state.password2,
                                        verifyPwd: this.state.verifyPwd,
                                        verifyUser: this.state.verifyUser,
                                        verifyPwd2: 1
                                    });
                                }
                            }}/>
                            {this.state.verifyPwd2 !== 0 ? this.state.verifyPwd2 === 1 ? <span>&#10004;</span> :
                                <span>&#10006; Password Not Match</span> : <span></span>}
                        </div>
                        <div className="inputLabelBlock">
                            <Button className="btn-primary signupBtn" onClick={this.handleSubmit}> Submit </Button>
                        </div>
                        {this.state.popup.showPopup ?
                            <Popup
                                titleText={this.state.popup.title}
                                desString={this.state.popup.content}
                                handleClosePopup={this.handleClosePopup}
                            /> : null}
                    </form>
                </Panel.Body>
            </Panel>
        )
    }
}