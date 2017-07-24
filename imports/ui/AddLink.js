import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import Rodal from 'rodal';

const customStyles = {
  height: 'auto',
  width: '400px'
};

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      url:"",
      isOpen: false,
      error:''
    }
  }
  onSubmit(e) {
    const {url} = this.state;
    e.preventDefault();
    Meteor.call('links.insert', url, (err, res) => {
      if(!err) {
        this.handleCloseModal();
      } else {
        this.setState({error: err.reason});
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  handleCloseModal() {
    let body = document.body;
    this.setState({isOpen: false, url:'', error:''});
    body.classList.remove('fixed');
  }
  openModal() {
    let body = document.body;
    this.setState({isOpen: true});
    if(!body.classList.contains('fixed')) {
      body.classList.add('fixed');
    }
  }
  render() {
    return (
      <div>
        <button className="button" onClick={this.openModal} role="button">+ Add Link</button>
        <Rodal
          visible={this.state.isOpen}
          onAnimationEnd={() => this.refs.url.focus()}
          onClose={this.handleCloseModal}
          customStyles={customStyles}
          className="boxed-view__box"
          duration={200}
          showCloseButton={false}
          >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form onSubmit={this.onSubmit} className="boxed-view__form">
            <input
              type="text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange}
            />
            <button className="button" role="button" type="submit">Add link</button>
            <button type="button" className="button button--secondary" onClick={this.handleCloseModal} role="button">Cancel</button>
          </form>
        </Rodal>
      </div>
    )
  }
}
