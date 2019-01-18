// import React from 'react';
// import classNames from 'classnames';
// import {observer, inject} from 'mobx-react';
// import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Divider from '@material-ui/core/Divider';
// import SearchIcon from '@material-ui/icons/Search';
// import {getAllComicType, getSearchComicList} from '@/query';
// import { trim } from 'dizzyl-util/lib/string';
// import { isNotEmpty } from 'dizzyl-util/lib/type';
// import PaginationModel from '@antd/PaginationModel';
// import BackTopModel from '@antd/BackTopModel';
// import ComicList from '@proje/ComicList';
// import Query from '@gql/Query';
// import mStyle from './index.module.scss';

// const Fragment = React.Fragment;
// const defaultPageProps = {
//     no: 1,
//     size: 12,
//     pageType: 1, // 为正数为往后翻n页，为负数为往前翻n页
//     id: undefined,
// };
// const sortItmeList = [
//     { show: '时间降序', value: 't_dom' },
//     { show: '时间升序', value: 't_up' },
//     { show: '随机', value: 'random' },
// ];

// @inject((stores) => ({
//     searchInputVal: stores.store.searchInputVal,
//     changeSearchInputVal: stores.store.changeSearchInputVal
// }))
// @observer
// class Search extends React.Component {
//     constructor(props) {
//         super(props);
//         this.lastId = null;
//         this.state = {
//             inputVal: '',
//             searchProps: {},
//             sortProps : 't_dom',
//             pageProps: {...defaultPageProps}
//         }
//     }

//     componentWillUnmount() {
//         if (this.inputRef) {
//             this.inputRef.removeEventListener('keypress', this.handleInput)
//         }
//         this.props.changeSearchInputVal('');
//         this.inputRef = this.lastId = null;
//     }


//     handleSearch = (data) => () => {
//         let d = data || this.inputRef.value;
//         let copy = {...this.state.searchProps};
//         copy['n'] = trim(d);
//         this.setState({
//             searchProps: copy,
//             inputVal: d,
//         }, () => {
//             copy = null;
//         });
//     }

//     handleSortItemClick = (value) => () => {
//         this.setState({
//             sortProps: value,
//         })
//     }

//     handleItemClick = (key, value) => () => {
//         let copy = {...this.state.searchProps};
//         if (copy[key] === value) {
//             delete copy[key];
//         } else {
//             copy[key] = value;
//         }
//         this.setState({
//             searchProps: copy,
//             pageProps: {...defaultPageProps}
//         }, () => {
//             copy = null;
//         })
//     }

//     handleChangePage = (pageNo, pageSize, preNo) => {
//         this.setState({
//             pageProps: {
//                 no: pageNo,
//                 size: pageSize,
//                 pageType: preNo ? (pageNo - preNo) : undefined,
//                 id: this.lastId || undefined,
//             }
//         });
//     }

//     handleChangeSize = (current, size) =>  {
//         this.setState({
//             pageProps: {
//                 no: 1,
//                 size,
//             }
//         });
//     }

//     textFieldInputProps = ({
//         endAdornment: (
//             <InputAdornment position="end">
//                 <IconButton
//                     aria-label="查询"
//                     onClick={this.handleSearch()}
//                 >
//                     <SearchIcon />
//                 </IconButton>
//             </InputAdornment>
//         )
//     })
    
//     textFieldRefBind = ref => { this.inputRef = ref; }

//     renderType = (list, type) => list.map(it =>
//         <span key={it}
//             className={classNames(mStyle['Dui-search-typeItem'], 
//                 this.state.searchProps.hasOwnProperty(type) &&
//                 this.state.searchProps[type] === it &&
//                 mStyle['Dui-search-activeItem']
//             )}
//             onClick={this.handleItemClick(type, it)}
//         >{it}</span>
//     );
    
//     renderSort = () => sortItmeList.map(sort =>
//         <span key={sort.value}
//             className={classNames(
//                 mStyle['Dui-search-typeItem'],
//                 this.state.sortProps === sort.value && mStyle['Dui-search-activeItem'])
//             }
//             onClick={this.handleSortItemClick(sort.value)}
//         >{sort.show}</span>
//     );

//     renderTypeBox = () => (
//         <Query query={getAllComicType}>
//             {({data}) => {
//                 const {state, type} = data.allComicTypeList;
//                 return (
//                     <div className={mStyle["Dui-searchType"]}>
//                         <div className={mStyle["Dui-search-row"]}>
//                             <p>排序：</p>
//                             <p>{this.renderSort()}</p>
//                         </div>
//                         <Divider className={mStyle["Dui-search-divider"]} />
//                         <div className={mStyle["Dui-search-row"]}>
//                             <p>状态：</p>
//                             <p>{this.renderType(state, 's')}</p>
//                         </div>
//                         <Divider className={mStyle["Dui-search-divider"]} />
//                         <div className={mStyle["Dui-search-row"]}>
//                             <p>类型：</p>
//                             <p>{this.renderType(type, 't')}</p>
//                         </div>
//                     </div>
//                 );
//             }}
//         </Query>
//     );

//     renderComicList = (isPhone) => {
//         const { searchProps, pageProps, sortProps } = this.state;
//         const { socketio } = this.props;
//         return (
//             <Query query={getSearchComicList} 
//                 variables={{kv: JSON.stringify(searchProps), ...pageProps, sort: sortProps}} 
//                 skip={!isNotEmpty(searchProps)}
//                 loadingType="liner"
//                 loadingRender={(<div className={mStyle["Dui-search-loading"]}>请查询</div>)}>
//                 {({data}) => {
//                     const { result, page } = data.searchComicList;
//                     this.lastId = result.slice(-1)[0] ? result.slice(-1)[0].id : undefined;
//                     return (
//                         <Fragment>
//                             <div className={classNames(mStyle["Dui-search-list"], isPhone && mStyle["Dui-search-list-phone"])}>
//                                 <ComicList comicDataList={result} isPhone={isPhone} socketio={socketio} />
//                             </div>
//                             <PaginationModel
//                                 current={pageProps.no}
//                                 total={page.total}
//                                 options={{
//                                     defaultPageSize: 12,
//                                     pageSizeOptions: ['12', '15', '18', '21'],
//                                     pageSize: pageProps.size,
//                                 }}
//                                 sizeChangeFunc={this.handleChangeSize}
//                                 changeFunc={this.handleChangePage}
//                             />
//                         </Fragment>
//                     );
//                 }}
//             </Query>
//         )
//     }

//     render() {
//         const { inputVal } = this.state, {isPhone} = this.props;

//         return (
//             <div>
//                 <form autoComplete="off">
//                     <TextField
//                         id="search-input"
//                         defaultValue={inputVal}
//                         fullWidth
//                         autoFocus
//                         label="输入查询"
//                         placeholder="请输入用户名称、作者"
//                         margin="normal"
//                         type="search"
//                         variant="outlined"
//                         inputRef={this.textFieldRefBind}
//                         InputProps={this.textFieldInputProps}
//                     />
//                 </form>

//                 <div className={mStyle["Dui-search-box"]}>
//                     {!isPhone && this.renderTypeBox()}
//                     {this.renderComicList(isPhone)}
//                 </div>

//                 <BackTopModel />
//             </div>
//         )
//     }
// }

// Search.propTypes = {};
// Search.defaultProps = {};

// export default Search;

import React from 'react';
import {observer, inject} from 'mobx-react';
import {trim} from 'dizzyl-util/lib/string';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import SearchBtn from './part/searchBtn';
import Query from '@gql/Query';
import {getSearchComicList} from '@/query';
import mStyle from './index.module.scss';

const ModelPc  = React.lazy(() => import("./pc"));
const ModelPhone  = React.lazy(() => import("./phone"));


const defaultPageProps = {
    no: 1,
    size: 12,
    pageType: 1, // 为正数为往后翻n页，为负数为往前翻n页
    id: undefined,
}

// function LoadRenderNode () {
//     return (
//         <div className={mStyle["search-loading"]}>请查询</div>
//     )
// }

@inject((stores) => ({
    searchInputVal: stores.store.searchInputVal,
}))
@observer
class SearchComponent extends React.Component {
    constructor (props) {
        super(props);

        this.lastId = null;

        this.C = props.isPhone ? ModelPhone : ModelPc;
    }

    state = {
        searchProps: {},
        pageProps: {...defaultPageProps},
    };

    handleSearch = () => {
        let d = this.props.searchInputVal;

        let copy = {...this.state.searchProps};

        let newSearch = {};

        if (copy['n'] !== trim(d)) {
            copy['n'] = trim(d);
            newSearch = {...defaultPageProps};
        }

        this.setState({
            searchProps: copy,
            ...newSearch,
        }, () => {
            copy = null;
        });
    }

    handleChangePage = (current, size, type) => {
        this.setState({
            pageProps: {
                no: current,
                size: size,
                pageType:type,
                id: this.lastId || undefined,
            }
        });
    }

    handleSetLastId = (lastId) => {
        this.lastId = lastId;
    }

    getQueryVariable = () => {
        let {searchProps, pageProps} = this.state;
// const sortItmeList = [
//     { show: '时间降序', value: 't_dom' },
//     { show: '时间升序', value: 't_up' },
//     { show: '随机', value: 'random' },
// ];
        return ({
            kv: JSON.stringify(searchProps),
            ...pageProps,
//             sort: 't_dom'
        })
    }

    render () {
        let {searchProps, pageProps} = this.state;

        let qVariables = this.getQueryVariable();

        let qSkip = !isNotEmpty(searchProps);

        return (
            <section>
                <SearchBtn handleSearch={this.handleSearch} />
                
                <this.C handleChangePage={this.handleChangePage} setLastId={this.handleSetLastId}
                    pageProps={pageProps} qVariables={qVariables} qSkip={qSkip} />
            </section>
        );
   }
}

export default SearchComponent;

