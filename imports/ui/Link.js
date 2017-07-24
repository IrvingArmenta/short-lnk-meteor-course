import React, {Component} from 'react';
import {onEnterPrivatePage} from '../routes/Routes';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilters from './LinkListFilters';


export default class Link extends Component {
  componentWillMount() {
    onEnterPrivatePage();
  }
  render() {
    return (
      <div>
        <PrivateHeader title="Your Links"/>
        <div className="page-content">
          <LinkListFilters />
          <AddLink />
          <LinksList />
        </div>
      </div>
    );
  }
}
