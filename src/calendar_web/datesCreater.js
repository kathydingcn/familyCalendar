/**
 * Created by kathy on 19/02/2018.
 */
import React from 'react';
import axios from 'axios';


import './datesContainer.css';
import {Tab, Tabs, Button} from 'react-bootstrap';

import ShardFuns from './shared/shared';
import EventList from './eventList';

export default class DatesCreater extends React.Component {




    constructor(props) {
        super(props);
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var createFlag = 1; //1: create Li, 0: update Li
        var datesList = this.computeDates(currentMonth, currentYear, createFlag);


        this.state = {
            currentYear: currentYear,
            currentMonth: currentMonth,
            createFlag: createFlag, //1: create Li, 0: update Li
            datesList: datesList,
            circleDays: []
        }
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);


    }

    componentWillMount(){
        var myCircleDays = [];

        axios.get(`https://still-basin-43768.herokuapp.com/api/eventslists?filter[where][email]=${this.props.email}&filter[where][year]=${this.state.currentYear}&filter[where][month]=${this.state.currentMonth}`)
            .then((res) => {
                if(res.data.length > 0){

                    res.data.forEach((item, index)=>{
                        console.log("from datescreate, the active   month day is ========", item.month, item.day);
                        myCircleDays.push(item.day );
                    });
                    console.log("currentMonth is ", this.state.currentMonth);
                    this.setState({
                        currentYear: this.state.currentYear,
                        currentMonth: this.state.currentMonth,
                        createFlag: this.state.createFlag,
                        datesList: this.state.datesList,
                        circleDays: myCircleDays.slice(0)
                    });
                }
            }).catch((err)=>{
            throw(err);
        });
        console.log(' circleDays in componentwillmount', this.state.circleDays);
    }
    handleSelect(eventKey) {
        eventKey.preventDefault();
        alert(`selected ${eventKey}`);
    }


    handlePrev() {

        var currentMonth;
        var currentYear;
        var myCircleDays = [];


        if (this.state.currentMonth === 0) {
            currentMonth = 11;
            currentYear = this.state.currentYear - 1;
        }
        else {
            currentMonth = this.state.currentMonth - 1;
            currentYear = this.state.currentYear;
        }

        var datesList = this.computeDates(currentMonth, currentYear, this.state.createFlag);
        this.setState({
            currentYear: currentYear,
            currentMonth: currentMonth,
            createFlag: this.state.createFlag,
            datesList: datesList,
            circleDays: []
        }, ()=>{
            axios.get(`https://still-basin-43768.herokuapp.com/api/eventslists?filter[where][email]=${this.props.email}&filter[where][year]=${this.state.currentYear}&filter[where][month]=${this.state.currentMonth}`)
                .then((res) => {
                    if(res.data.length > 0){

                        res.data.forEach((item, index)=>{
                            console.log("from datescreate, the active   month day is ========", item.month, item.day);
                            myCircleDays.push(item.day );
                        });
                        console.log("currentMonth is ", this.state.currentMonth);
                        this.setState({
                            currentYear: this.state.currentYear,
                            currentMonth: this.state.currentMonth,
                            createFlag: this.state.createFlag,
                            datesList: this.state.datesList,
                            circleDays: myCircleDays.slice(0)
                        });
                    }
                }).catch((err)=>{
                throw(err);
            });
        });







    }

    handleNext() {
        var currentMonth;
        var currentYear;
        var myCircleDays = [];

        if (this.state.currentMonth === 11) {
            currentMonth = 0;
            currentYear = this.state.currentYear + 1;
        }
        else {
            currentMonth = this.state.currentMonth + 1;
            currentYear = this.state.currentYear;
        }

        var datesList = this.computeDates(currentMonth, currentYear, this.state.createFlag);
        this.setState({
            currentYear: currentYear,
            currentMonth: currentMonth,
            createFlag: this.state.createFlag,
            datesList: datesList,
            circleDays: []
        },()=>{
            axios.get(`https://still-basin-43768.herokuapp.com/api/eventslists?filter[where][email]=${this.props.email}&filter[where][year]=${this.state.currentYear}&filter[where][month]=${this.state.currentMonth}`)
                .then((res) => {
                    if(res.data.length > 0){

                        res.data.forEach((item, index)=>{
                            console.log("from datescreate, the active   month day is ========", item.month, item.day);
                            myCircleDays.push(item.day );
                        });
                        console.log("currentMonth is ", this.state.currentMonth);
                        this.setState({
                            currentYear: this.state.currentYear,
                            currentMonth: this.state.currentMonth,
                            createFlag: this.state.createFlag,
                            datesList: this.state.datesList,
                            circleDays: myCircleDays.slice(0)
                        });
                    }
                }).catch((err)=>{
                throw(err);
            });
        });



    }


    computeDates(currentMonth, currentYear, createFlag) {
        var datesList = [];

        var activeDate = new Date(currentYear, currentMonth);

        activeDate.setDate(1);
        var month = activeDate.getMonth();  //在setDate(1)后面直接获取当月的月份,实际月份为这个月份+1
        var diff = 1 - activeDate.getDay();

        activeDate.setDate(diff);  //计算出日历的开始日期


        for (var i = 0; i < 42; i++) {
            var date = activeDate.getDate();

            if (activeDate.getMonth() !== month) {
                datesList.push({date: date, thisMonth: false});
                // console.log('date is ===not this month=====', date);
            } else {
                datesList.push({date: date, thisMonth: true});
                // console.log('date is ******* ', date);
            }

            activeDate.setDate(date + 1);
        }

        return datesList;
    }

    hasActiveEvent(day){
        console.log('day is -------', day);
        console.log('in hasActiveEvent day,  this.state.circleDays', day, this.state.circleDays);
        if(this.state.circleDays.indexOf(day) === -1){
            return "datesLi activeLi";
        }else
        {
            return "datesLi activeLi myCircle";
        }
    }



    render() {

        // var monthShow = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return (
            <div className="appFrame">
                <Tabs defaultActiveKey={1} id="calendar_tabs" className="tabsFrame">
                    <Tab eventKey={1} title=" My Calendar">

                        <div className="datesFrame">

                            <h6><Button id="prevButton" className="btn" onClick={this.handlePrev}>Prev</Button>
                                <div id="datesTitle">{this.state.currentYear} . {this.state.currentMonth + 1}</div>
                                <Button className="btn" id="nextButton" onClick={this.handleNext}>Next</Button></h6>
                            <ul className="datesUl">
                                <li className="datesLi">Sun</li>
                                <li className="datesLi">Mon</li>
                                <li className="datesLi">Tue</li>
                                <li className="datesLi">Wed</li>
                                <li className="datesLi">Thu</li>
                                <li className="datesLi">Fri</li>
                                <li className="datesLi">Sat</li>
                            </ul>
                            <ul className="datesUl">
                                {this.state.datesList.map((item, index) => {

                                        if (item.thisMonth) {
                                            return <li   className={this.hasActiveEvent(item.date.toString())} key={index}
                                                       onClick={() => {

                                                           var id = ShardFuns.createDateId(this.state.currentYear, this.state.currentMonth, item.date);
                                                           console.log('id is ', id);

                                                           this.props.history.push({
                                                               pathname: `/calendar/eventlist/${id}`,
                                                               state: {dateId: id, email:this.props.email, username:this.props.username}
                                                           });

                                                           console.log('this props', this.props);
                                                           return <EventList history={this.props.history}
                                                                             location={this.props.location}
                                                                                email={this.props.email}
                                                                                username={this.props.username}/>

                                                       }}>
                                                {item.date}</li>;
                                        } else {
                                            return <li key={index} className="datesLi inactiveLi">{item.date}</li>;
                                        }

                                    }
                                )}
                            </ul>

                        </div>
                    </Tab>

                    <Tab eventKey={2} title=" Member1's Calendar">
                        <div className="tabsFrame"> member1's calendar</div>
                    </Tab>
                    <Tab eventKey={3} title=" Member2's Calendar">
                        Member2's Calendar
                    </Tab>
                </Tabs>
            </div>


        )
    }
}

