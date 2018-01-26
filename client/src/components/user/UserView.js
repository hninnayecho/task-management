import React,{ Component } from "react";

class UserView extends Component{

    render(){
        return(
            <tr>
                <td>{ this.props.user.username }</td>
                <td>{ this.props.user.email }</td></tr>
        );
    }
}
export default UserView;