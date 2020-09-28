import InputForm from "./inputForm"
import React from 'react'
import  Header  from './header';
class InputPage extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() { 
        return (
            <div>
                 <Header username = {this.props.username}/>
               <InputForm id = {this.props.id} />
            </div>
             );
    }
}
 
export default InputPage;