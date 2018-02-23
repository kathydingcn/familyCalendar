/**
 * Created by kathy on 22/02/2018.
 */
import React from 'react';


import './datesContainer.css';
import {Carousel,img,Panel, Button} from 'react-bootstrap';
import img1 from './shared/img1.png'
import img2 from './shared/img2.png'
import img3 from './shared/img3.png'
import Shared from './shared/shared';

export default class Home extends React.Component{

    render(){
        return(
            <div className="appFrame">
                <Carousel className="CarouselFrame">
                    <Carousel.Item className="CarouselInner">
                        <img width={900} height={325} alt="900x500" src={img1} />
                        <Carousel.Caption >
                           {/* <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={325} alt="900x500" src={img2} />
                        <Carousel.Caption  >
                         {/*   <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={325} alt="900x500" src={img3} />
                        <Carousel.Caption >
                            {/*<h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}