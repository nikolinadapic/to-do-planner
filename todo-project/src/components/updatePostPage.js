
import React from 'react'
import UpdatePost from "./updatePost"
import  Header  from './header';
class UpdatePostPage extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() { 
        return (
            <div>
                 <Header username = {this.props.username}/>
                 <UpdatePost id_post = {this.props.location.id_post} 
                 task = {this.props.location.task}
                 date = {this.props.location.date}
                 time = {this.props.location.time}
                 description = {this.props.location.description}/>
                 {console.log("U UPDATE PAGE ID_POSTA JE " + this.props.location.id_post)}
            </div>
             );
    }
}
 
export default UpdatePostPage;