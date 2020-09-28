import React from 'react';
import { Component } from 'react';
import './postsContainer.css'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Post from './post'
import Button from 'react-bootstrap/Button'
import InputForm from "./inputForm"
import axios from 'axios';
class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeAtr : [],
            workAtr:[],
            freetimeAtr: [],
            detailsData:[],
            bolding1:'#07d9a4',
            bolding2:'gray',
            bolding3:'gray',
            res:[]
        }
        this.updateList = this.updateList.bind(this);
        this.checkedList = this.checkedList.bind(this);
    }
    checkedList(){
        this.setState({
            res: [],
            homeAtr : [],
            workAtr:[],
            freetimeAtr: [],
            detailsData:[], 
            bolding1:'#07d9a4',
                bolding2:'gray',
                bolding3:'gray',
            
        })
        fetch("http://localhost:9000/checkAPI")
        .then(res => res.json())
        .then(res => {
            console.log("u checkedList res je " + res.arrayOfObj)
          this.setState({ res: res.arrayOfObj })
          this.getDataFromServer();
        })
        .catch(err=>err); 
    }
    updateList(){
        this.setState({
            res: [],
            homeAtr : [],
            workAtr:[],
            freetimeAtr: [],
            detailsData:[], 
            bolding1:'#07d9a4',
                bolding2:'gray',
                bolding3:'gray',
            
        })
        fetch("http://localhost:9000/deleteAPI")
        .then(res => res.json())
        .then(res => {
          this.setState({ res: res.arrayOfObj })
          this.getDataFromServer();
        })
        .catch(err=>err); 
    }
    callAPI() {
        fetch("http://localhost:9000/postsAPI")
        .then(res => res.json())
        .then(res => {
          this.setState({ res: res.arrayOfObj })
          this.getDataFromServer();
        })
        .catch(err=>err); 
       
    }
    getDataFromServer(){
        console.log("pozvano dohvacanje iz baze ,podaci o postovima")
        for(let i = 0; i < this.state.res.length; i++){
            if(  this.state.res[i].category === "home"){
                this.setState({
                    homeAtr:  this.state.homeAtr.concat( this.state.res[i]),
                   
                })
            }
            else if( this.state.res[i].category === "work"){
                this.setState({
                    workAtr:  this.state.workAtr.concat( this.state.res[i]),
                })
            }
            else if(  this.state.res[i].category === "freetime"){
                this.setState({
                    freetimeAtr:  this.state.freetimeAtr.concat( this.state.res[i]),
                })
            }
        }
        this.setState({ detailsData: this.state.homeAtr})
        this.forceUpdate();
    }
    componentDidMount(){
        const data = {
            id: this.props.id,
          };
          axios.put("http://localhost:9000/postsAPI", data)
                .then(() => this.callAPI())
                .catch(err=>err);
                  
    }
    
    updateDetailsData(arg){
        this.setState({ detailsData: []})
        if(arg === 1) {
            this.setState({ detailsData: this.state.homeAtr,
                bolding1:'#07d9a4',
                bolding2:'gray',
                bolding3:'gray',})
        }
        else if (arg === 2){
            this.setState({ detailsData: this.state.workAtr,
                bolding2:'#07d9a4',
                bolding1:'gray',
                bolding3:'gray',})
        }
        else
            this.setState({ detailsData: this.state.freetimeAtr,
                bolding3:'#07d9a4',
                bolding1:'gray',
                bolding2:'gray',})

    }
    render() { 
        return (
            <div className ="proba">

            <div id="uncontrolled-tab-example" className = "myTabs">
                <a className='buttonMenu' style={{color:this.state.bolding1}}  onClick={()=>this.updateDetailsData(1)}>
                <span className="controll"> HOME </span> 
                </a>
            <a className='buttonMenu' style={{color:this.state.bolding2}} onClick={()=>this.updateDetailsData(2)}>
                <span  className="controll">WORK </span>
            </a>
            <a className='buttonMenu'style={{color:this.state.bolding3}} onClick={()=>this.updateDetailsData(3)}>
               <span  className="controll"> FREE TIME</span>
            </a> 
        </div>
        <div>

        <div style = {{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            marginLeft: '-1em',
        }}>
           {this.state.detailsData.map(object => (
               
               <Post id_user = {this.props.id} onUpdateList = {this.updateList} onCheckedList = {this.checkedList} key ={object.id_post} id= {object.id_post} title = {object.title} description = {object.description} date = {object.date} time = {object.time} checked = {object.checked}/> 
            ))}
        </div>
           
            </div>
    </div>     
 );
    }
}
 
export default PostsContainer;