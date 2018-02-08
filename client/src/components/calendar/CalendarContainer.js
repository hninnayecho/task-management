import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from '../../Header';

BigCalendar.momentLocalizer(moment);

class MyCalendar extends Component {

  constructor(porps) {
    super(porps);
    this.state = {
      myEventList: [
      ]
    };
  }

  componentDidMount() {
    var self = this;
    fetch('/api/calendar', { credentials: 'same-origin' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      let events = json.map((task)=> {
        return {
          id: task.id,
          title: task.name,
          start: task.startDate,
          end: task.endDate
        }
      })
      self.setState({
        myEventList: events
      })
    });
  }

  render() {
    return (
      <div>
        <div><Header history= {this.props.history} title='Calendar'/></div>
        <div className="contentContainer">
        <div className="text-center" style={{ background: "#fff", padding: "20px 0px" }}>
          <BigCalendar
            selectable
            popup
            events={this.state.myEventList}
            style={{ height: "400px" }}
            defaultDate={new Date()}
          />
        </div>
        </div>
      </div>
    );
  }

}
export default MyCalendar;
