import React from 'react';
import classNames from 'classnames';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';
import createStyled from 'material-ui-render-props-styles/index';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from '@material-ui/icons/Home';
import FindInPage from '@material-ui/icons/FindInPage';
import Routes from './Routes';
import './App.css';
import RouteConfig from '@/main/RouteConfig';
import styles from '@/overrides/orStyles';
import MyHeader from '@mui//AppBarHeader';
import MyFooter from '@dizzy/FooterComponent';
import DrawerModel from '@mui//DrawerModel';
import DrawerList from '@proje/DrawlerList';
import SearchInput from '@proje/SearchInput';
import PhoneToolBar from '@proje/PhoneToolBar';
import {isPhoneContext} from '@/store/context';
import IsPhoneContextProvider from '@proje/isPhoneContextProvider';
import createSocket from '@/query/socket';

const Fragment = React.Fragment;
const Styled = createStyled(styles, {withTheme: true});
const drawerListContentList = [
    { ...RouteConfig.home, icon: <HomeIcon/> },
    { ...RouteConfig.search, icon: <FindInPage/> },
];
const titleNode = (<Fragment>DMGOU</Fragment>);
const headerOther = (classes, isPhone) => (
    !isPhone ? (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <SearchInput inputProps={{
                placeholder: 'Search…',
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }
            }}/>
        </div>
    ) : null
);
const socketio = createSocket();

window.addEventListener("beforeunload", function(event) {
    socketio.close();
});

/**
 * @class App
 * @extends {Component}
 */
function App(props) {
    const {location, showDrawler, changeDrawlerState} = props;
    return (
        <Styled>
            {({classes}) => (
                <IsPhoneContextProvider>
                    <isPhoneContext.Consumer>
                        {isPhone => (
                            <div className={classNames(
                                'App',
                                !isPhone && classes.appPCContentShift,
                            )}>
                                <CssBaseline/>

                                <MyHeader title={titleNode}
                                    orClassName={classNames(
                                        showDrawler  && 'Dui-abh-shift',
                                        showDrawler ? classes.appBarShift : classes.appBar,
                                        !isPhone && classes.appPCHeader
                                    )}
                                    handleClickMenuIcon={changeDrawlerState}
                                    otherNode={headerOther(classes, isPhone)}
                                />
                        
                                <DrawerModel open={showDrawler} isPhone={isPhone}
                                    orClasses={{
                                        paper: showDrawler ? "Dui-drawer-shift"
                                            : (!isPhone && classNames(classes.appPCDrawerShift))
                                    }}
                                    variant={!isPhone ? 'permanent' : undefined}
                                    handleToggleDrawer={changeDrawlerState}
                                ><DrawerList contentList={drawerListContentList} activePath={location.pathname}/></DrawerModel>

                                {isPhone && <PhoneToolBar />}

                                <div className="ignore">
                                    <Routes childProps={{location, isPhone, socketio}}/>

                                    <MyFooter orClassName={classNames(classes.appFooter)}>
                                        <p>
                                        免责声明            |                隐私政策                      |               联系我们
                                        </p>
                                        <p>
                                            本站漫画等相关内容均来自互联网，以供漫画爱好者研究漫画画法技巧和构图方式，若侵犯到您的权益，请立即联系我们删除。本站不负任何相关责任。
                                        </p>
                                    </MyFooter>
                                </div>
                                
                            </div>
                        )}
                    </isPhoneContext.Consumer>
                </IsPhoneContextProvider>
            )}
        </Styled>
    );
}

export default withRouter(
    inject(stores => ({
        showDrawler: stores.store.showDrawler,
        changeDrawlerState: stores.store.changeDrawlerState
    }))(
        observer(
            App
        )
    )
);