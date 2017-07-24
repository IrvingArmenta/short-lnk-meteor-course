import React, {Component} from 'react';
import {Session} from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinkListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    }
  }
  componentDidMount() {
    this.checkTracker = Tracker.autorun(() =>{
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }
  componentWillUnmount() {
    this.checkTracker.stop();
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" checked={!this.state.showVisible} type="checkbox" onChange={(e) => {
            Session.set('showVisible', !e.target.checked)
          }}/>
          show hidden links
        </label>
      </div>
    )
  }
};
