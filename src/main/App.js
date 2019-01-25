import React from 'react';
import classNames from 'classnames';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';
import createStyled from 'material-ui-render-props-styles/index';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '@/overrides/orStyles';
import HeaderModel from '@proje/HeaderModel';
import FooterModel from '@proje/FooterModel';
import DrawerList from '@proje/DrawlerList';
import SearchInput from '@proje/SearchInput';
import {isPhoneContext} from '@/store/context';
import IsPhoneContextProvider from '@proje/IsPhoneContextProvider';
import Routes from './Routes';
import mStyle from './App.module.scss';
import './App.scss';

const Styled = createStyled(styles, {withTheme: true});

/**
 * @class App
 * @extends {Component}
 */
function App(props) {
    let {location} = props;
    return (
        <Styled>
            {({classes}) => (
                <IsPhoneContextProvider>
                    <isPhoneContext.Consumer>
                        {isPhone => (
                            <div className={classNames(
                                mStyle['App'],
                                !isPhone && classes.appPCContentShift,
                            )}>
                                <CssBaseline/>
                                
                                <HeaderModel />
                        
                                <DrawerList activePath={location.pathname}></DrawerList>

                                <div className={mStyle['ignore']}>
                                    <section>
                                        <Routes childProps={{location, isPhone}}/>
                                    </section>

                                    <FooterModel />
                                </div>
                                
                            </div>
                        )}
                    </isPhoneContext.Consumer>
                </IsPhoneContextProvider>
            )}
        </Styled>
    );
}

export default withRouter(App);