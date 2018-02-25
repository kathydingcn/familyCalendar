/**
 * Created by kathy on 19/02/2018.
 */
import React from 'react';
import axios from 'axios';

import {
    Link
} from 'react-router-dom';

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
        this.handleDelItem = this.handleDelItem.bind(this);

    }

    componentWillMount(){
        axios.get('https://still-basin-43768.herokuapp.com/api/eventslists')
            .then((res)=>{
                console.log(res);
                /*this.setState(()=>{
                    return({eventList:res.data})
                });*/
            })
            .catch((error)=>{throw(error)});
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

    handleDelItem(e,eventTime, eventContent){
        e.preventDefault();
        this.setState({
            addInput: this.state.addInput,
            addTime: this.state.addTime,
            eventList: this.state.eventList.filter((item,index)=>{return item.eventTime !== eventTime})
        });
    }

    render(){

        var splitedDateId = Shared.splitDateId(this.props.location.state.dateId);

        console.log('the props in evventlist is ====', this.props);
        return (
            <Panel className="eventListFrame">
                <Panel.Heading className="textCenter">
                    Todo List &nbsp;&nbsp;
                    {splitedDateId.year} . {splitedDateId.month} . {splitedDateId.date}
                </Panel.Heading>

                <Panel.Body>
                    <ListGroup>{
                this.state.eventList.map((item,index)=> {
                    return <ListGroupItem key={index}>
                        <Button className="btn btn-primary eventBtn"><i class="far fa-edit"></i></Button>&nbsp;&nbsp;
                        <Button className="btn btn-danger eventBtn" onClick={(e)=>this.handleDelItem(e,item.eventTime,item.eventContent)}>
                            <i class="far fa-trash-alt"></i></Button>
                        &nbsp;&nbsp;{item.eventContent} &nbsp;&nbsp; {item.eventTime}

                    </ListGroupItem>
                })
                    }</ListGroup>

            <form>
                <Button className="btn btn-primary" onClick={this.handleAddEvent}> <i class="far fa-plus-square"></i> </Button>
                &nbsp;&nbsp;
                <input type="text" placeholder="To Do" onChange={(e)=>{
                    this.setState({
                        addInput: e.target.value,
                        addTime: this.state.addTime
                    });
                }}/>
                &nbsp;&nbsp;

                <input type="time" placeholder="Time" onChange={(e)=>{
                    this.setState({
                        addInput: this.state.addInput,
                        addTime: e.target.value
                    })
                }}/>

            </form>
                </Panel.Body>
                <Panel.Footer className="textCenter" >End</Panel.Footer>
                <div className="textCenter" ><Link to="/calendar" className="btn btn-primary">Submit</Link></div>

            </Panel>

        )
    }
}