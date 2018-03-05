/**
 * Created by kathy on 4/03/2018.
 */
import React from 'react';
import {Panel,Button} from 'react-bootstrap';

import './sharedCSS.css';

export default class Popup extends React.Component {
    render() {
        return (
        <Panel className="popup">
            <Panel.Heading className="popup_title">
                {this.props.titleText}
            </Panel.Heading>
            <Panel.Body className="popup_inner">
                {this.props.desString}
                <Button className="btn-primary popup_btn" onClick={this.props.handleClosePopup} >OK</Button>
            </Panel.Body>

        </Panel>

        );
    }
}