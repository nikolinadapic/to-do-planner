import React from 'react';
import { DateTime } from 'react-datetime-bootstrap';
import "./inputForm.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
class UpdatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          taskValue:this.props.task,
          descrptValue:this.props.description,
          date:this.props.date,
          time: this.props.time,
          id_post: this.props.id_post
         }
    }
    updateTaskValue(evt){
      this.setState({
        taskValue: evt.target.value
        
      });    
    }
  updateDescrptValue(evt){
      this.setState({
        descrptValue: evt.target.value
        
      });    
    }
    updateDateValue(evt){
      evt = evt.slice(0,-14)
      this.setState({
        date: evt
        
      });    
    }
    updateTimeValue(evt){
      evt = evt.substr(11)
      evt = evt.slice(0,-5)
      this.setState({
        time: evt
      })     
    }
    handleUpdatedPost(){
      var post;

               post = {
                id_post: this.props.id_post,
                task: this.state.taskValue,
                description : this.state.descrptValue,
                date: this.state.date,
                time: this.state.time,
              };
            
            axios.put("http://localhost:9000/updateAPI", post)
            .catch(err=>err); 
        
          
    }
    render() { 
        return ( 
            <div className = "mainFormContainer">
              <span className = "addTaskTitle">UPDATE TASK </span>
            <div class="form-group row">
            <label for="example-text-input" class="addUpdate col-2 col-form-label">Task</label>
            <div class="col-10">
              <input class="form-control" type="text" value={this.state.taskValue} onChange={evt => this.updateTaskValue(evt)}/>
          </div>
          </div>
          <div class="form-group  row">
            <label for="example-search-input" class="addUpdate col-2 col-form-label">Description</label>
            <div class="col-10">
              <input class="form-control" type="search" value={this.state.descrptValue} onChange={evt => this.updateDescrptValue(evt)}/>
            </div>
          </div>
          <div class="form-group  row">
            <label for="example-date-input" class="addUpdate col-2 col-form-label">Date</label>
            <div class="col-10">
            <DateTime pickerOptions={{format:"LL"}}  value={this.state.date} onChange = {evt => this.updateDateValue(evt)}/>
            </div>
          </div>
          <div class="form-group  row">
            <label for="example-time-input" class="addUpdate col-2 col-form-label">Time</label>
            <div class="col-10">
                 <DateTime id="tPick" pickerOptions={{format:"LTS"}}   onChange={evt=>this.updateTimeValue(evt)} />
            </div>
          </div>
          <div class="form-group myGroup row">
            <div class="col-10">
                 <button class = "btn myBtn" onClick = {()=> {
                   this.handleUpdatedPost()
                   }}>UPDATE</button>
            </div>
          </div>
          </div>
         );
    }
}
 
export default UpdatePost;