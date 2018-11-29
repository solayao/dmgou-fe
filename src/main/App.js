import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter} from 'react-router';
import Routes from './Routes';
import {observer, inject} from 'mobx-react';
import createStyled from 'material-ui-render-props-styles/index';
import styles from '@/overrides/orStyles';

const Styled = createStyled(styles, {withTheme: true});

@withRouter
@inject(stores => ({isPhone: stores.store.isPhone}))
@observer
class App extends Component {
    render() {
        const { isPhone, location} = this.props;
        console.log(isPhone, location)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit
                        <code>src/App.js</code>
                        and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer">
                        Learn React 123 
                    </a>
                </header>

                <Styled>
                    {
                        ({classes}) => (
                            <div>
                                <Routes childProps={location}/>
                            </div>
                        )
                    }
                </Styled>
            </div>
        );
    }
}

export default App;
