/**
 * Created by kathy on 19/02/2018.
 */
import React from 'react';
import axios from 'axios';

import {
    Link
} from 'react-router-dom';

import './eventList.css';
import {ListGroup, ListGroupItem, Panel, Button} from 'react-bootstrap';
import Shared from './shared/shared';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExisting: false,
            addInput: '',
            addTime: '',
            todolist: [],
            email: this.props.location.state.email,
            username: this.props.location.state.username,
            year: Shared.splitDateId(this.props.location.state.dateId).year,
            month: Shared.splitDateId(this.props.location.state.dateId).month,
            day: Shared.splitDateId(this.props.location.state.dateId).date,
            id: ''
        }
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleDelItem = this.handleDelItem.bind(this);

    }

    componentWillMount() {
        console.log("==========this.state in will monut", this.state);

        axios.get(`https://still-basin-43768.herokuapp.com/api/eventslists?filter[where][email]=${this.state.email}&filter[where][day]=${this.state.day}&filter[where][username]=${this.state.username}&filter[where][year]=${this.state.year}&filter[where][month]=${this.state.month}`)
            .then((res) => {
                console.log('in will mount res ::', res);
                if (res.data.length !== 0) {
                    console.log("get todolist from db: ", res.data[0].todolist);
                    this.setState({
                        isExisting: true,
                        email: this.state.email,
                        username: this.state.username,
                        year: this.state.year,
                        month: this.state.month,
                        day: this.state.day,
                        todolist: res.data[0].todolist.slice(0),
                        id: res.data[0].id
                    });
                } else {
                    this.setState({
                        isExisting: false,
                        email: this.state.email,
                        username: this.state.username,
                        year: this.state.year,
                        month: this.state.month,
                        day: this.state.day,
                        todolist: this.state.todolist,
                        id: ''
                    });
                    console.log("get 0 record from todolist");
                }

            })
            .catch((error) => {
                throw(error)
            });
    }

    handleAddEvent(e) {
        e.preventDefault();
        this.setState({
            addInput: this.state.addInput,
            addTime: this.state.addTime,
            todolist: [...this.state.todolist, {content: this.state.addInput, time: this.state.addTime}]
        });
        console.log('in handleAddEvent', this.state.addInput, this.state.addTime);
    }

    handleDelItem(e, eventTime, eventContent) {
        e.preventDefault();
        this.setState({
            addInput: this.state.addInput,
            addTime: this.state.addTime,
            todolist: this.state.todolist.filter((item, index) => {
                return item.time !== eventTime
            })
        }, () => {
            console.log('after del item', this.state.todolist);
        });
    }

    handleSubmitEvent(e) {
        e.preventDefault();

        if (this.state.isExisting) {
            axios.put(`https://still-basin-43768.herokuapp.com/api/eventslists/${this.state.id}`, {
                email: this.state.email,
                username: this.state.username,
                year: this.state.year,
                month: this.state.month,
                day: this.state.day,
                todolist: this.state.todolist
            })
                .then((data) => {
                    console.log('update to db result is', data);
                })
                .catch((err) => {
                    console.log('update err to db', err);
                });
        } else {
            axios.post(`https://still-basin-43768.herokuapp.com/api/eventslists/`, {
                email: this.state.email,
                username: this.state.username,
                year: this.state.year,
                month: this.state.month,
                day: this.state.day,
                todolist: this.state.todolist
            })
                .then((data) => {
                    console.log('update to db result is', data);
                })
                .catch((err) => {
                    console.log('update err to db', err);
                })
                .catch((err) => {
                    console.log('update err to db', err);
                });
        }

        this.props.history.push("/calendar");

    }

    render() {

        return (

        <Panel className="panelFrame">
            <Panel.Heading> Family Members Events at {this.state.year} . {parseInt(this.state.month) + 1} . {this.state.day}</Panel.Heading>
            <Panel.Body >
                <div className="calContainer">
                    <div className="myCal"> my calendar
                        <Panel className="eventListFrame">
                            <Panel.Heading className="textCenter">
                                To do List &nbsp;&nbsp;
                            </Panel.Heading>
                            <Panel.Body>
                                <ListGroup>{
                                    this.state.todolist.map((item, index) => {
                                        return <ListGroupItem key={index}>
                                            &nbsp;{item.content} &nbsp;&nbsp; {item.time}

                                            <Button className="btn btn-primary eventBtn"><i
                                                className="far fa-edit"></i></Button>&nbsp;&nbsp;
                                            <Button className="btn btn-danger eventBtn"
                                                    onClick={(e) => this.handleDelItem(e, item.time, item.content)}>
                                                <i className="far fa-trash-alt"></i></Button>
                                            &nbsp;
                                        </ListGroupItem>
                                    })
                                }</ListGroup>

                                <form>
                                    &nbsp;&nbsp;
                                    <input type="text" placeholder="To Do" onChange={(e) => {
                                        this.setState({
                                            addInput: e.target.value,
                                            addTime: this.state.addTime
                                        });
                                    }}/>
                                    &nbsp;&nbsp;

                                    <input type="time" placeholder="Time" onChange={(e) => {
                                        this.setState({
                                            addInput: this.state.addInput,
                                            addTime: e.target.value
                                        })
                                    }}/>
                                    <Button className="btn btn-primary" onClick={this.handleAddEvent}> <i
                                        className="far fa-plus-square"></i> </Button>
                                </form>
                            </Panel.Body>
                            <Panel.Footer className="textCenter">End</Panel.Footer>
                            <div className="textCenter"><Link to="/calendar" className="btn btn-primary"
                                                              onClick={(e) => this.handleSubmitEvent(e)}>Submit</Link></div>

                        </Panel>
                    </div>
                    <div className="gap"></div>
                    <div className="otherCal"> other members' calendar</div>
                </div>
            </Panel.Body>

        </Panel>


        )
    }
}