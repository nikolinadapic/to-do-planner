import React, { Component } from "react";
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            username:""
        }
    }
    
    componentDidMount(){
        this.setState({
            usename: this.props.username,
            id: this.props.id
        })
        console.log("U USER DATA JE " + this.props.username)
    }
    render(){
        return(
            <></>
        )
    }
}
 
export default User;