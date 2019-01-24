import createAsyncComponent from '../components/DizzyComponents/AsyncComponent';
import AppliedRoute from '../components/DizzyComponents/AppliedRoute';
import AuthenticatedRoute from '../components/DizzyComponents/AuthenticatedRoute';
import {isNotEmpty} from 'dizzyl-util/lib/type';
/** 异步控件 */
const AsyncHome = createAsyncComponent('Home');
const AsyncDetail = createAsyncComponent('Detail');
const AsyncChapter = createAsyncComponent('Chapter');
const AsyncSearch = createAsyncComponent('Search');

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
    default: {
        path: '/',
        exact: true,
        text: '首页',
        C: AppliedRoute,
        component: AsyncHome
    },
    home: {
        path: '/home',
        exact: true,
        text: '首页',
        C: AppliedRoute,
        component: AsyncHome
    },
    // demo: {
    //     path: '/demo',
    //     exact: true,
    //     text: '测试',
    //     C: AppliedRoute,
    //     component: AsyncDemo
    // },
    detail: {
        path: '/detail',
        text: '详情',
        C: AuthenticatedRoute,
        component: AsyncDetail,
        isAuth: (location) => getUrlSearch(location).hasOwnProperty('cn'),
        noAuthTo: '/home'
    },
    chapter: {
        path: '/chapter',
        text: '章节',
        C: AuthenticatedRoute,
        component: AsyncChapter,
        isAuth: (location) => getUrlSearch(location).hasOwnProperty('ch'),
        noAuthTo: '/home'
    },
    search: {
        path: '/search',
        text: '全部漫画',
        C: AppliedRoute,
        component: AsyncSearch
    }
}
