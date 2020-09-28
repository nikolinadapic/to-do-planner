import React from 'react';
import logo from '../../src/menu.png'
import { Component } from 'react';
import './header.css'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { menuStatus:"hidden", username:this.props.username}
    }
     openCloseMenu() {
        if(this.state.menuStatus == "hidden")
            this.setState({
                menuStatus : "visible",
            })
        else
        this.setState({
            menuStatus : "hidden",
        })

    }
    componentDidMount(){
        fetch("http://localhost:9000/usernameAPI")
            .then(res => res.json())
            .catch(err=>err);
    }
    render() { 
        return (
            <div className="wrapper" style = {{height:0, zIndex:"5"}}>
                <nav id="sidebar"  style = {{visibility:this.state.menuStatus, zIndex:"5", position:"fixed" }}>
                    <div className="sidebar-header" >
        <h3 style = {{color:"black"}}>{this.state.username  }</h3>
                    </div>

                    <ul className="list-unstyled components" style = {{color:"black"}}>
                        <li >
                        <NavLink  to="/home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/inputFormPage">Add Task</NavLink>
                        </li>
                        <li>
                            <NavLink to="/statisticsPage">Statistics</NavLink>
                        </li> 
                        
                        <li>
                            <NavLink to="/">Logout</NavLink>
                        </li>
                    </ul>
                </nav>
        
                <div id="content" style = {{ zIndex:"5"}}>
                   

                    <nav className=" navbar fixed-top navbar-dark bg-dark">
                        <button className="navbar-toggler" onClick = {()=>this.openCloseMenu()} type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navTitle">To Do Planner</div>
                </nav>
                </div>
        
        </div> 
          
        );
    }
}
 
export default Header;