import React from 'react'
import Header from './header';
import PostsContainer from './postsContainer';

class Home extends React.Component {
    constructor(props) {
        super(props);
       // this.state = {  }
    }

    render() { 
        return ( 
            <div>
                <Header username = {this.props.username}/>
                <PostsContainer username = {this.props.username} id={this.props.id}/>
            </div>
         );
    }
}
 
export default Home;