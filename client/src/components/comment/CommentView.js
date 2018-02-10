import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './comment.css';

const styles = {
  card: {
    position: 'relative',
    borderColor: "#AED6F1",
  },
  cardHeader: {
    width: '200px',
    padding: '2px'
  },
  cardText: {
    width: '200px',
    padding: '2px'
  }
}

class CommentView extends Component {

  render() {

    return (

      <div >
        <MuiThemeProvider >
          <Card style={styles.card} containerStyle={{width: 300}}>
            <CardHeader style={styles.cardHeader}
              title={"CreatedBy  " + this.props.comment.User.username}
              actAsExpander={true}
              showExpandableButton={false}
            />
            <CardText expandable={false} style={styles.cardText}>
              {this.props.comment.description}
            </CardText>
          </Card>
        </ MuiThemeProvider>
      </div>
    )
  }
}
export default CommentView;