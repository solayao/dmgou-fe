import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * 非认证路由组件封装
 *
 * @export
 * @param {any, props, ...rest} 渲染的控件， 控件属性， 路由属性
 * @returns 非认证路由控件 || 重定向地址
 */
export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = querystring('redirect');

  return (
    <Route
      {...rest}
      render={props =>
        !cProps.isAuth ? (
          <C {...props} {...cProps} />
        ) : (
          <Redirect
            to={redirect === '' || redirect === null ? '/' : redirect}
          />
        )
      }
    />
  );
};
