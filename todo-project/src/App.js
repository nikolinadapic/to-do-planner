import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home'
import InputFormPage from './components/inputFormPage'
import Login from "./components/login"
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import UpdatePostPage from './components/updatePostPage';
import Statistics from './components/statisticsPage'
class App extends React.Component {
  
  constructor(props) {
    super(props);
   this.state = { username:"", id:""};
}
getData = (data) => {
  
  this.setState({
    username: data.username,
    id: data.id
  })
}
  render() { 

    return ( 
    <BrowserRouter>
    <div className = "App">
        
        <Switch>
        <Route exact path="/" render={props => 
           (<Login {...props} onGetData = {this.getData}/>)
        }/> 
        <Route  path="/home" render={props => 
           (<Home {...props} username={this.state.username} id = {this.state.id}/>)
        }/>
        <Route  path="/inputFormPage"render={props => 
           (<InputFormPage {...props} username={this.state.username} id = {this.state.id}/>)
        }/>
        <Route  path="/updatePostPage"render={props => 
           (<UpdatePostPage {...props} username={this.state.username} id = {this.state.id}/>)
        }/>
         <Route  path="/statisticsPage"render={props => 
           (<Statistics {...props} username={this.state.username} id = {this.state.id}/>)
        }/>
        
      </Switch>

    </div> 
    </BrowserRouter>
);
  }
}
 
export default App;

