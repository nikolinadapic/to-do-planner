import React from 'react'
import Header from './header';
import './statistics.css'
import axios from 'axios';
import "./progressBar.css"
class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeTrue:0,
            homeAll:0,
            workTrue:0,
            workAll:0,
            freeTimeTrue:0,
            freeTimeAll:0
          }
    }
    getStatistics(){
        var post;
      fetch("http://localhost:9000/statisticsAPI")
            .then(res => res.json())
            .then(res => {
              //res je objekt s jednim podatkom - niz
              console.log(res)
              this.setState({
                homeTrue: res.arrayOfStatistics[0],
                homeAll:res.arrayOfStatistics[1],
                workTrue:res.arrayOfStatistics[2],
                workAll:res.arrayOfStatistics[3],
                freeTimeTrue:res.arrayOfStatistics[4],
                freeTimeAll:res.arrayOfStatistics[5]
              })
              console.log( this.state.homeAll)
            })
            .catch(err=>err); 
    }
    componentDidMount(){
        const data = {
            id: this.props.id,
          };
          console.log("COMP DID MOUNT SP:", data);
          console.log()
          axios.put("http://localhost:9000/statisticsAPI", data)
                .then(() => this.getStatistics())
                .catch(err=>err);
                  
    }
    render() { 
        return ( 
        <div className = "mainStatistics">
                <Header username = {this.props.username}/>
                <div className = "emptySpace">

                </div>
         <div className="Post">
             <div className = "Content"> 
                <label  className="PostTitle"> HOME STATISTICS</label>
        <label className="PostTitle2"> {this.state.homeTrue} / {this.state.homeAll}</label>
        <div class="w3-border" style= {{width: '100%'}}>
            <div class="w3-green" style= {{width: `${this.state.homeTrue/this.state.homeAll*100}%`}}></div>
        </div>
             </div>
        </div> 
        <div className="Post">
             <div className = "Content"> 
             <label  className="PostTitle"> WORK STATISTICS</label>
             <label className="PostTitle2"> {this.state.workTrue} / {this.state.workAll}</label>
             <div class="w3-border"  style= {{width: '100%'}}>
                <div class="w3-green" style= {{width: `${this.state.workTrue/this.state.workAll*100}%`}}></div>
            </div>

             </div>
        </div> 
        <div className="Post">
             <div className = "Content">
             <label  className="PostTitle"> FREE TIME STATISTICS</label>
             <label className="PostTitle2"> {this.state.freeTimeTrue} / {this.state.freeTimeAll}</label>

            <div class="w3-border"  style= {{width: '100%'}}>
                <div class="w3-green" style= {{width: `${this.state.freeTimeTrue/this.state.freeTimeAll*100}%`}}></div>
            </div>

             </div>
        </div> 
        </div>
         );
    }
}
 
export default Statistics;