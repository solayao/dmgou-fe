import React from 'react';
import Proptypes from 'prop-types';
import shortid from 'shortid';
import {NavLink} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarRounded from '@material-ui/icons/StarRounded';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import createStyled from 'material-ui-render-props-styles/index';
import styles from '@/overrides/orStyles';

const Styled = createStyled(styles, {withTheme: true});

/**
 * @description Drawler下的目录列表
 * @author Dizzy L
 * @param {*} props 
 * @prop {Array} contentList [{text, icon, path}]
 */
function DrawlerList(props) {
    const { contentList, changeDrawlerState, activePath } = props;
    const handleItemClick = () => {
        changeDrawlerState(false);
    }
    return (
        <Styled>
        {({classes}) => (
            <List>
                {contentList.map(obj => (
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
    );
}

DrawlerList.propTypes = {
    activePath: Proptypes.string.isRequired,
    contentList: Proptypes.array.isRequired,
};
DrawlerList.defaultProps ={
    activePath: '/',
    contentList: [],
};

export default inject(stores => ({
    changeDrawlerState: stores.store.changeDrawlerState
}))(
    observer(DrawlerList)
);