import createAsyncComponent from '../components/DizzyComponents/AsyncComponent';
import AppliedRoute from '../components/DizzyComponents/AppliedRoute';
import AuthenticatedRoute from '../components/DizzyComponents/AuthenticatedRoute';
import {isNotEmpty} from 'dizzyl-util/lib/type';
/** 异步控件 */
const AsyncDemo = createAsyncComponent('Demo');

/** 获取url的search并存放到sessionStorage */
const getUrlSearch = (location) => {
    if (isNotEmpty(location.search)) {
        const searchProps = location
        .search
        .slice(1)
        .split('&')
        .reduce((total, current) => {
            const list = current.split('=');
            total[list[0]] = decodeURIComponent(list[1]);
            return total;
        }, {});
        sessionStorage.setItem('urlSearch', JSON.stringify(searchProps));
        return searchProps;
    } else {
        sessionStorage.removeItem('urlSearch');
        return {};
    }
};

export default {
    demo: {
        path: '/demo',
        exact: true,
        text: '测试',
        C: AppliedRoute,
        component: AsyncDemo
    },
}
