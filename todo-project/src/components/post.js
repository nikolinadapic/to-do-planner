import React from 'react';
import { Component } from 'react';
import './post.css'
import bin from '../../src/rubbish.png'
import edit from '../../src/edit.png'
import UpdatePostPage from "./updatePostPage"
import axios from 'axios';
import { NavLink } from 'react-router-dom';
class Post extends Component {
    constructor(props) {
        super(props);
        //update checked napravit
        this.state = { 
        checkState:this.props.checked ,
        //delVisibility: this.props.checked == true ? "hidden":"visible",
        edtVisibility: this.props.checked == true ? "hidden":"visible" }
    }
    updatePost(){
        console.log("update")
    }
    updatePostsList(){
        this.props.onUpdateList()
    }
    updateCheckBox(){
        this.props.onCheckedList()
    }
    deletePost(){
        var post = {
            id_post: this.props.id,
            id_user: this.props.id_user
        }
        console.log(post.id_post)
        axios
        .put("http://localhost:9000/deleteAPI", post)
        .then(() => this.updatePostsList())
        .catch(err=>err); 
    }
    updateState(){
        var postCheckbox = {
            id_post: this.props.id,
            id_user: this.props.id_user,
            checked: true
        }  
        this.setState({checkState: true})
        axios
        .put("http://localhost:9000/checkAPI", postCheckbox)
        .then(()=>this.updateCheckBox())
        .catch(err=>err);
      }

    render() { 
        return (
         <div className="Post">
             <div className = "Content">
                <p className="PostTitle">{this.props.title}</p>
                <p className="details">{this.props.date}</p>
                <p className="details">{this.props.time}</p>
                <p className="details">{this.props.description}</p>
             <div>
                
            </div>

             
             </div>
             <div className = "Icons">
             <img className="Icon" src={bin} onClick = {() => this.deletePost() }/>
              <NavLink style = {{visibility : this.state.edtVisibility}} to={{
                  pathname:"/updatePostPage",
                  id_post : this.props.id,
                  task: this.props.title,
                  date: this.props.date,
                  time: this.props.time,
                  description : this.props.description
              }}>
               <img className="Icon" src={edit}  />
             </NavLink>
             <label>
                 {/* onChange dodat u input */}
             <input className="Checkbox" type = "Checkbox" checked = {this.state.checkState} onClick = {() => this.updateState() }/>
             </label>
             </div>
        </div> );
    }
}
 
export default Post;