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
        {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(2018, 2, 1),
          end: new Date(2018, 2, 1),
        },
        {
          id: 1,
          title: 'Long Event',
          start: new Date(2018, 2, 10),
          end: new Date(2018, 2, 10),
        },

        {
          id: 2,
          title: 'DTS STARTS',
          start: new Date(2018, 0, 20),
          end: new Date(2018, 0, 20),
        }
      ]
    };
  }

  componentDidMount() {
    var self = this;
    fetch('/api/calendar', { credentials: 'same-origin' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var newJson = [];
      for (var key in json) {
        newJson.push({
          id: json[key].id,
          title: json[key].name,
          start: json[key].dueDate,
          end: json[key].dueDate
        });
      }
      console.log(newJson);
      self.setState({
        myEventList: newJson
      })
    });
  }

  render() {
    return (
      <div>
        <div><Header /></div>
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
    );
  }

}
export default MyCalendar;
