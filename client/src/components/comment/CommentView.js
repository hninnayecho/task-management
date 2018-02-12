import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import './comment.css';

const styles = {
  card: {
    position: 'relative',
    borderColor: "#AED6F1",
    borderCollapse: 'collapse'
  },
  cardHeader: {
    padding: '2px'
  },
  cardText: {
    padding: '2px'
  }
}

class CommentView extends Component {

  render() {
    var date = moment(this.props.comment.CreatedAt).format("YYYY-MM-DD");
    return (
      <div>
        <div style={{ overflow: 'auto', height: 'inherit', display: 'block' }}>
          <MuiThemeProvider >
            <Card style={styles.card} containerStyle={{ width: 'inherit' }}>
              <CardHeader style={styles.cardHeader}
                title={this.props.comment.User.username + "  Created At  " + date}
                actAsExpander={true}
                showExpandableButton={false}
              />
              <CardText expandable={false} style={styles.cardText}>
                {this.props.comment.description}
              </CardText>
              <Divider />
            </Card>
          </ MuiThemeProvider>
        </div>
      </div>
    )
  }
}
export default CommentView;