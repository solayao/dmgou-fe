import "react-app-polyfill/ie9";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from "apollo-boost";
import {Provider} from 'mobx-react';
import store from './store';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import MuiThemeConfig from './overrides/orTheme';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

/** apollo-client服务配置 */
const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    }
});

/** material-ui 主题配置 */
const theme = createMuiTheme(MuiThemeConfig);

/** material-ui 个人css样式抽离注入 */
const generateClassName = createGenerateClassName({
    //开发模式与生产模式样式名称固定,我们自己添加的样式类会以jss-为前缀,当然也可以在下面进行修改
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'jss-'
});
const jss = create(jssPreset());
// We define a custom insertion point that JSS will look for injecting the
// styles in the DOM.定义一个插入点,最好不要使用注释的方式,因为如果是注释,在打包的时候会被打包插件给移除掉
// 在index.html中添加一个id为jss-insertion-point'的元素,表示要注入的位置
jss.options.insertionPoint = document.getElementById('jss-insertion-point');

/** 渲染 */
ReactDOM.render(
    <Router>
        {/*mobX层*/}
        <Provider store={store}>
            {/*apollo层*/}
            <ApolloProvider client={client}>
                {/*material-ui层*/}
                <MuiThemeProvider theme={theme}>
                    {/*antd层*/}
                    <LocaleProvider locale={zh_CN}>
                        {/*样式注入层*/}
                        <JssProvider jss={jss} generateClassName={generateClassName}>
                            {/*组件层*/}
                            <App/>
                        </JssProvider>
                    </LocaleProvider>
                </MuiThemeProvider>
            </ApolloProvider>
        </Provider>
    </Router>,
    document.getElementById(
        'root'
    )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
if (process.env.NODE_ENV !== 'production') {
    // const {whyDidYouUpdate} = require('why-did-you-update');
    // whyDidYouUpdate(React);
    serviceWorker.unregister();
} else {
    serviceWorker.register();

}