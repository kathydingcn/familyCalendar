/**
 * Created by kathy on 19/02/2018.
 */
import React from 'react';
import axios from 'axios';


import './datesContainer.css';
import {ListGroup,ListGroupItem,Panel, Button} from 'react-bootstrap';
import Shared from './shared/shared';

export default class EventList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addInput:'',
            addTime:'',
            eventList:[{eventTime:'02:03',eventContent:'go to bed'},{eventTime:'04:33',eventContent:'go shopping'}]
        }
        this.handleAddEvent = this.handleAddEvent.bind(this);

    }

    handleAddEvent(e){
        e.preventDefault();
        this.setState({
            addInput: this.state.addInput,
            addTime: this.state.addTime,
            eventList: [...this.state.eventList, {eventTime:this.state.addTime, eventContent:this.state.addInput}]
        });
        console.log('in handleAddEvent', this.state.addInput, this.state.addTime);
    }

    render(){

        var splitedDateId = Shared.splitDateId(this.props.location.state.dateId);
        return (
            <Panel className="appFrame">
                <Panel.Heading>
                    {splitedDateId.year} . {splitedDateId.month} . {splitedDateId.date}
                </Panel.Heading>

                <Panel.Body>
                    <ListGroup>{
                this.state.eventList.map((item,index)=> {
                    return <ListGroupItem> {item.eventContent} {item.eventTime}
                    <Button className="btn btn-primary">Edit</Button>
                        <Button className="btn btn-danger">Del</Button>
                    </ListGroupItem>
                })
                    }</ListGroup>

            <form>
                <input type="text" placeholder="To Do" onChange={(e)=>{
                    this.setState({
                        addInput: e.target.value,
                        addTime: this.state.addTime
                    });
                }}/>
                <input type="time" placeholder="Time" onChange={(e)=>{
                    this.setState({
                        addInput: this.state.addInput,
                        addTime: e.target.value
                    })
                }}/>
                <button onClick={this.handleAddEvent}> Add </button>
            </form>
                </Panel.Body>
            </Panel>
        )
    }
}