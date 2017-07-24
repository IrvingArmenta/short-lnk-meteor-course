import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

export default class LinkListItem extends Component {
  constructor(props) {
    super(props);
    this.linkVisibility = this.linkVisibility.bind(this);
    this.state = {
      justCopied: false
    }
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      this.setState({justCopied: true});
      setTimeout(() => {
        this.setState({justCopied: false});
      }, 800);
    }).on('error', () => {
      alert('Unable to copy, please manually copy the link :(');
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  linkVisibility() {
    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
    }
    return (
      <p className="item__message">{this.props.visitedCount} {visitMessage} - {visitedMessage}</p>
    )
  }
  render() {
    const className = 'Copying';
    const copiedCheck = this.state.justCopied;
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
          Visit
        </a>
        <button className="button button--pill" role="button" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {copiedCheck ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill" role="button" onClick={this.linkVisibility}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    )
  }
}

LinkListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
