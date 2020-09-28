import React from 'react';
import { DateTime } from 'react-datetime-bootstrap';
import "./inputForm.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          taskValue:"",
          descrptValue:"",
          date:"September 8, 2020",
          time:'',
          category:"",
          id_post:0
         }
         this.titleInput = React.createRef();
         this.descriptionInput = React.createRef();
         this.handleNewPost = this.handleNewPost.bind(this);
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
    updateCategoryValue(arg){
      switch(arg){
        case 1: this.setState({
          category: "home"
          
        }); 
              break;
        case 2: this.setState({
          category: "work"
          
        }); 
              break;
        case 3: this.setState({
          category: "freetime"
          
        }); 
              break;
      }
      
    }
    handleNewPost(){
      var post;
      fetch("http://localhost:9000/numberOfPostsAPI")
            .then(res => res.json())
            .then(res => {
              this.setState({ id_post: (parseInt(res.number)+1) })
              console.log(this.state.id_post)
               post = {
                id_user:this.props.id,
                id_post: this.state.id_post,
                task: this.state.taskValue,
                description : this.state.descrptValue,
                date: this.state.date,
                time: this.state.time,
                category: this.state.category
              };
            })
            .then(() => axios.put("http://localhost:9000/insertpostAPI", post) )
            .then( (res) => {
              this.titleInput.value = ""
              this.descriptionInput.value  = ""
              this.setState({
                taskValue:" ",
                descrptValue:" ",
                date:"September 8, 2020",
                time:'',
                category:"",
                id_post: (parseInt(res.number)+2 )
              })
            })
            .catch(err=>err); 
          
    }
    render() { 
        return ( 
            <div className = "mainFormContainer">
              <span className = "addTaskTitle">ADD TASK </span>
            <div class="form-group row">
            <label for="example-text-input" class="addUpdate col-2 col-form-label">Task</label>
            <div class="col-10">
              <input ref = {this.titleInput}class="form-control" type="text" value={this.state.taskValue} onChange={evt => this.updateTaskValue(evt)}/>
          </div>
          </div>
          <div class="form-group  row">
            <label for="example-search-input" class="addUpdate col-2 col-form-label">Description</label>
            <div class="col-10">
              <input ref = {this.descriptionInput} class="form-control" type="search" value={this.state.descrptValue} onChange={evt => this.updateDescrptValue(evt)}/>
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
                 <DateTime id="tPick" pickerOptions={{format:"LTS"}}  onChange={evt=>this.updateTimeValue(evt)} />
            </div>
          </div>
          <div class="form-group  row">
            <ButtonGroup className="btn-group">
              <Button variant="secondary" onClick={()=>this.updateCategoryValue(1)}>Home</Button>
              <Button variant="secondary" onClick={()=>this.updateCategoryValue(2)}>Work</Button>
              <Button variant="secondary" className="freeTimeBtn" onClick={()=>this.updateCategoryValue(3)}>FreeTime</Button>
            </ButtonGroup>
          </div>
          <div class="form-group myGroup row">
            <div class="col-10">
                 <button class = "btn myBtn" onClick = {()=> this.handleNewPost()}>ADD</button>
            </div>
          </div>
          </div>
         );
    }
}
 
export default InputForm;