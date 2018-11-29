import React, { Component } from 'react';
import './demo.css';
import qUser from './gqlUsers';
import { Query } from "react-apollo";

class Demo extends Component {
  render() {
    return (
      <Query query={qUser}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          console.log(data)
          return (
            <div>
              Hello world! 123456....
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Demo;
