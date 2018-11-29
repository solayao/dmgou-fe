import React from 'react';
import { Route } from 'react-router-dom';

/**
 * 路由组件封装
 *
 * @export
 * @param {any, props, ...rest} 渲染的控件， 控件属性， 路由属性
 * @returns 路由控件
 */
export default ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={props => <C {...props} {...cProps} />} />
);
