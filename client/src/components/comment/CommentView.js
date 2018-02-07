import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CommentView extends Component {

  render() {

    return (

      <div className="from">
        <MuiThemeProvider >
          <Card>
            <CardHeader
              title= {"CreatedBy  "+ this.props.comment.User.username}
              actAsExpander={true}
              showExpandableButton={false}
            />
            <CardText expandable={false}>
              {this.props.comment.description}
            </CardText>
          </Card>
        </ MuiThemeProvider>
      </div>
    )
  }
}
export default CommentView;