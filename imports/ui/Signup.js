import React, {Component}       from 'react';
import { Link }     from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base'
import {onEnterPublicPage} from '../routes/Routes';

export default class Signup extends Component {
  constructor(props) {
    super(props);
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

    if(password.length < 9) {
      return this.setState({error: 'Password must be at least 9 characters long'});
    }

    Accounts.createUser({email, password}, (err) => {
      if(err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });

    //this.setState({
      //error: 'Something went wrong.'
    //});
  }
  render() {
    return (
      <div className="boxed-view transition-item">
        <div className="boxed-view__box">
          <h1>Signup Page</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button" role="button">Create account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}
