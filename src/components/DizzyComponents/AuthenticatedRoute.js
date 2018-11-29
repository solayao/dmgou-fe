import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * 认证路由组件封装
 *
 * @export
 * @param {any, props, ...rest} 渲染的控件， 控件属性， 路由属性
 * @returns 认证路由控件 || 登录页
 */
export default ({ component: C, props: cProps, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      cProps.isAuth ? (
        <C {...props} {...cProps} />
      ) : (
        <Redirect
          to={`${cProps.noAuthTo}?redirect=${props.location.pathname}${
            props.location.search
          }`}
        />
      )
    }
  />
);
