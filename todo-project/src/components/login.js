import React, { Component } from "react";
import "./login.css"
import { NavLink } from 'react-router-dom';
import axios from 'axios';
export  default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse:false,
        id:"",
        linkTo:"",
        pwdValue:"",
        usernameValue:""
      };
    }
    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.json())
            .then(res => {
              this.setState({ apiResponse: res.equivalence, id: res.id })
              if(this.state.apiResponse === true){
                    
                this.setState({
                  linkTo:"/home"
              })
             
            }
            else{
              this.setState({
                pwdValue: ""
              });
            }
            this.getData()
            })
            .catch(err=>err); 
     
    }
    handleSubmit() {
        if(this.state.usernameValue != "" && this.state.pwdValue != ""){
              const user = {
                username: this.state.usernameValue,
                password:this.state.pwdValue
              };
                axios
                .put("http://localhost:9000/testAPI", user)
                  .then(() => {
                    this.callAPI()
                  })
                  .catch(err => {
                    console.error(err);
                  });

                
        }   
    };
    getData(){
      const myData = {
        username:this.state.usernameValue,
        id: this.state.id
      }
      this.props.onGetData(myData)
    }
    updateInputValue(evt) {
        this.setState({
          usernameValue: evt.target.value
        });    
       
      }

      updatePwdValue(evt) {
        this.setState({
          pwdValue: evt.target.value
        });    
       
      }

    render() {
        return (
            <form className = "mainFormContainer login">
                <h3 class="title">LOG IN</h3>

                <div className="form-group myGroup row">
                    <label  class="col-2 col-form-label label">Username</label>
                    <div class="col-10">
                        <input class="form-control" type="textbox"  id="username"  value={this.state.usernameValue} onChange={evt => this.updateInputValue(evt)}/>
                    </div>
                </div>

                <div className="form-group myGroup row">
                    <label  class="col-2 col-form-label label">Password</label>
                    <div class="col-10">
                        <input class="form-control" type="password" id = "pwd" value={this.state.pwdValue} onChange={evt => this.updatePwdValue(evt)}/>
                    </div>
                </div>


               <button  class="btn myBtn" type = "button" onClick={() => {
                 this.handleSubmit()
                }}>
                 
               <NavLink  to={this.state.linkTo}> Login</NavLink>
                   </button> 
                
                
            </form>
        );
    }
}

