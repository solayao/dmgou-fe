import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Fragment = React.Fragment;

/**
 * @description 导航栏Header
 * @author Dizzy L
 * @param {*} props
 * @prop {Node} title 标题 or 网站logo
 * @prop {Function} handleClickMenuIcon 点击菜单按钮触发方法
 * @prop {String} orClassName 重写yangshi
 * @prop {Object/Node} otherNode 其他Toolbar实例
 * @returns
 */
function AppBarHeader (props) {
    const handleMenuIconClick = () => {
        props.handleClickMenuIcon();
    };

    return (
        <AppBar className={props.orClassName}>
            <Toolbar>
                <IconButton onClick={handleMenuIconClick}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    {props.title}
                </Typography>
                {props.otherNode}
            </Toolbar>
        </AppBar>
    );
}

AppBarHeader.propTypes = {
    title: PropTypes.node.isRequired,
    orClassName: PropTypes.string, 
    clickMenuIconFunc: PropTypes.func,
    otherNode: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.object,
    ])
};
AppBarHeader.defaultProps = {
    title: (<Fragment>网站Logo</Fragment>),
    orClassName: '',
    clickMenuIconFunc: () => {},
    otherNode: null,
};

export default AppBarHeader;