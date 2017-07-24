import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {onEnterPublicPage} from '../routes/Routes';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      error: ''
    };
  }
  componentWillMount() {
    onEnterPublicPage();
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password,(err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });

  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button" role="button">Login</button>
          </form>

          <Link to="/signup">Create an account</Link>
        </div>
      </div>
    )
  }
}
