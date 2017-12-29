import React, { Component } from "react";

class Label extends Component{

    render() {
        const label = this.props.label;

        if(label === "InProgress"){
            return(
                <td bgcolor="#CD5C5C">InProgress</td>
            )
        }else if(label === "Pending"){
            return(
                <td bgcolor="#FA8072">Pending</td>
            )
        }else{
            return(
                <td bgcolor="green">Finished</td>
            )
        }
    }
}
export default Label;