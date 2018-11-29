import { BackTop } from 'antd';
import React from 'react';

/**
 * 回到顶部
 * @url design.alipay.com/develop/web/components/back-top/
 * @prop {node} children 
 * @prop {Number} visibilityHeight
 * @prop {Function} onClick
 * @returns
 */
function BackTopModel(props) {
    const { children, ...backProps } = props;
    return (
        <BackTop {...backProps}>
            {children}
        </BackTop>
    )
}

export default BackTopModel;