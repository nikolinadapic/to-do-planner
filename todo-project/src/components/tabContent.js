import React from 'react';
import { Component } from 'react';
import Post from './post';

class TabContent extends Component {
    constructor(props) {
        super(props);
        //this.state = {  }
    }
    render() { 
        return (

        <div className="PostsContainerApp" >
            <Post details = {this.props.details}/>
            
        </div>
               
           
 );
    }
}
 
export default TabContent;