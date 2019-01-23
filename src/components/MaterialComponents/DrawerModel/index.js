import React from 'react';
import PropTypes from 'prop-types';
import mStyles from '../index.module.scss';
import createStyled from 'material-ui-render-props-styles/index';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = (theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});
const Styled = createStyled(styles, {withTheme: true});
const Fragment = React.Fragment;

/**
 * 抽屉模块
 * @class DrawerModel
 * @prop {Boolean} isPhone 是否是手机模式
 * @prop {String} anchor 展现的位置
 * @prop {Boolean} open 是否展示
 * @prop {Object} orClasses overrider的css
 * @prop {String} variant 展现的形态
 * @prop {Function} handleToggleDrawer 处理手提
 * @extends {Component}
 */
 function DrawerModel(props) {
    const toggleDrawer = (state) => () => {
        props.handleToggleDrawer(state);
    };

    const { anchor, open, orClasses, variant } = props;
    const C = props.isPhone ? SwipeableDrawer : Drawer;
    const P = Object.assign(
        props.isPhone ? {onOpen: toggleDrawer(true),disableDiscovery: true} : {},
        {
            onClose: toggleDrawer(false),
            classes: Object.assign({
                paper: mStyles['drawer-paper']
            }, orClasses),
            anchor,
            open,
            variant
        }
    );

    return (
        <Fragment>
            <C {...P}>
                <Styled>
                    {({classes, theme}) => (
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={toggleDrawer(false)}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                    )}
                </Styled>
                <Divider />
                {props.children}
            </C>
        </Fragment>
    )
}

DrawerModel.propTypes = {
    isPhone: PropTypes.bool.isRequired,
    anchor: PropTypes.string,
    open: PropTypes.bool.isRequired,
    orClasses: PropTypes.object,
    store: PropTypes.object,
    variant: PropTypes.string,
    handleToggleDrawer: PropTypes.func,
};
DrawerModel.defaultProps = {
    isPhone: true,
    anchor: 'left',
    open: false,
    orClasses: {},
    variant: 'temporary',
    children: (<ul><li>1</li><li>1</li><li>1</li></ul>),
    handleToggleDrawer: (state) => {},
};

export default DrawerModel;