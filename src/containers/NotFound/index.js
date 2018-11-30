import React, { Component } from 'react';
import mStyles from './notFound.module.scss';

class NotFound extends Component {
  render() {
    return <div className={mStyles.notFound}>Sorry, page has not found!</div>;
  }
}

export default NotFound;
