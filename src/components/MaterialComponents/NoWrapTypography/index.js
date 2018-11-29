import React from 'react';
import Proptypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * @description 不换行的Typography, 如果是PC模式含有Tooltip, 手机模式不含有Tooltip
 * @author Dizzy L
 * @param {*} props
 * @prop {Boolean} isPhone 是否是手机模式
 * @prop {Object} typographyProps mui的Typography属性参数
 * @prop {Object} toolTipProps mui的Tooltip属性参数
 * @returns
 */
function NoWrapTypography(props) {
    const { children, isPhone, typographyProps, toolTipProps } = props;
    const C = !isPhone ? Tooltip : React.Fragment;
    let typoProps =  {
        ...typographyProps,
        noWrap: true,
    };
    let tipProps = !isPhone ? {
        ...toolTipProps,
        title: children.toString()
    } : {};
    return (
        <C {...tipProps}>
            <Typography {...typoProps}>{children}</Typography>
        </C>
    )
}

NoWrapTypography.propTypes = {
    isPhone: Proptypes.bool,
    typographyProps: Proptypes.object.isRequired,
    toolTipProps: Proptypes.object,
};
NoWrapTypography.defaultProps = {
    typographyProps: {
        component: 'p',
        variant: 'caption'
    },
    toolTipProps: {
        placement: 'bottom'
    }
}

export default NoWrapTypography;