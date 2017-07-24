import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Error 404!</h1>
          <h4>Page not found</h4>
          <Link className="button button--link" to="/">Head Home</Link>
        </div>
      </div>
    );
}

export default NotFound;
