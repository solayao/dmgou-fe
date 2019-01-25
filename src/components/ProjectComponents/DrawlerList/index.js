import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import {NavLink} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import StarRounded from '@material-ui/icons/StarRounded';
import HomeIcon from '@material-ui/icons/Home';
import FindInPage from '@material-ui/icons/FindInPage';
import createStyled from 'material-ui-render-props-styles/index';
import styles from '@/overrides/orStyles';
import {isPhoneContext} from '@/store/context';
import RouteConfig from '@/main/RouteConfig';
import DrawerModel from '@mui//DrawerModel';
import './index.css';
import mStyle from './index.module.scss';

const drawerListContentList = [
    { ...RouteConfig.home, icon: <HomeIcon/> },
    { ...RouteConfig.search, icon: <FindInPage/> },
];

const Styled = createStyled(styles, {withTheme: true});

function DList (props) {
    let {changeDrawlerState, activePath} = props;

    let handleItemClick = () => {
        changeDrawlerState(false);
    } 

    return (
        <Styled>
            {({classes}) => (
                <List>
                    {drawerListContentList.map(obj => (
                        obj.text ? 
                        <NavLink to={obj.path} onClick={handleItemClick} key={shortid.generate()}>
                            <Tooltip title={obj.text} placement="right">
                                <ListItem button selected={obj.path === activePath}>
                                    <ListItemIcon classes={{root: classes.listItemIcon}}>
                                        { obj.icon ? obj.icon : <StarRounded />}
                                    </ListItemIcon>
                                    <ListItemText primary={obj.text} classes={{root: classes.listItemText}} />
                                </ListItem>
                            </Tooltip>
                        </NavLink>
                        :
                        <Divider />
                    ))}
                </List>
            )}
        </Styled>
    )
}

/**
 * @description Drawler下的目录列表
 * @author Dizzy L
 * @param {*} props 
 * @prop {String} activePath
 */
function DrawlerList(props) {
    let { showDrawler, changeDrawlerState, activePath } = props;
    
    return (
        <isPhoneContext.Consumer>
            {isPhone => (
                <Styled>
                    {({classes}) => (
                        <DrawerModel open={showDrawler} isPhone={isPhone}
                            orClasses={{
                                paper: showDrawler ? mStyle["drawer-shift"] : (!isPhone && classes.appPCDrawerShift)
                            }}
                            variant={!isPhone ? 'permanent' : undefined}
                            handleToggleDrawer={changeDrawlerState}>
                            <DList changeDrawlerState={changeDrawlerState} activePath={activePath} />
                        </DrawerModel>
                    )}
                </Styled>
            )}
        </isPhoneContext.Consumer>
    );
}

DrawlerList.propTypes = {
    activePath: PropTypes.string.isRequired,
    showDrawler: PropTypes.bool,
    changeDrawlerState: PropTypes.func,
};

DrawlerList.defaultProps ={
    activePath: '/',
};

export default inject(stores => ({
    showDrawler: stores.store.showDrawler,
    changeDrawlerState: stores.store.changeDrawlerState
}))(
    observer(DrawlerList)
);