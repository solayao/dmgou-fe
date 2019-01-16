import React, { Component } from 'react';
/**
 * 异步加载控件实现逻辑
 *
 * @export
 * @param {any} importComponent 加载控件
 * @returns 控件 || null
 */
function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

/**
 * @description 创建异步控件
 * @author Dizzy L
 * @param {any} pathName 控件文件夹名称
 * @param {string} [path='containers'] 默认src/containers为主路径
 * @returns {ReactNode | null}
 */
export default function createAsyncComponent(pathName, path = 'containers') {
  // return asyncComponent(() => import(`@/${path}/${pathName}`));
  return React.lazy(() => import(`@/${path}/${pathName}`));
}