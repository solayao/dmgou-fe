import React from 'react';
import {observer, inject} from 'mobx-react';
import {trim} from 'dizzyl-util/lib/string';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/BuildOutlined';
import SearchBtn from './part/searchBtn';
import ToolBox from './part/toolBox';
import PopModal from '@proje/PopModal';
import Query from '@gql/Query';
import $Snackbar from '@mui/SnackbarModel';
import {getSearchComicList} from '@/query';

const ModelPc  = React.lazy(() => import("./pc"));
const ModelPhone  = React.lazy(() => import("./phone"));

const defaultPageProps = {
    no: 1,
    size: 12,
    pageType: 1, // 为正数为往后翻n页，为负数为往前翻n页
    id: undefined,
}

function ToolNode () {
    return (
        <Fab color="primary" aria-label="配置查询参数">
            <BuildIcon />
        </Fab>
    )
}

@inject((stores) => ({
    searchInputVal: stores.store.searchInputVal,
}))
@observer
class SearchComponent extends React.Component {
    constructor (props) {
        super(props);

        this.lastId = null;

        this.C = props.isPhone ? ModelPhone : ModelPc;

        this.phoneLastDataList = [];

        this.phoneStartY = 0;
    }

    state = {
        searchProps: {},
        pageProps: {...defaultPageProps},
        sort: 't_dom',
    };

    componentWillUpdate (nextProps, nextState) {
        let p = this.state.sort !== nextState.sort ||
            JSON.stringify(this.state.searchProps) !== JSON.stringify(nextState.searchProps);
        if (p) {
            this.phoneLastDataList = [];
            this.phoneStartY = 0;
        }
    }


    componentWillUnmount () {
        this.C = this.lastId = this.phoneLastDataList = this.phoneStartY = null;
    }

    handleInput = () => {
        let d = this.props.searchInputVal;

        let copy = {...this.state.searchProps};

        let newSearch = {};

        if (copy['n'] !== trim(d)) {
            let trimName = trim(d);

            if (trimName.includes(' ')) copy['n'] = trimName.split(' ');
            else copy['n'] = trimName;
            
            newSearch = {...defaultPageProps};
        }

        this.setState({
            searchProps: copy,
            pageProps: newSearch,
        }, () => {
            copy = newSearch = null;
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

    handleGetSST = (obj) => {
        let {sort, type, status} = obj;
        let {searchProps} = this.state;
        
        searchProps['s'] = !!status ? status : undefined;

        searchProps['t'] = isNotEmpty(type.length) ? type : undefined;

        this.setState({
            sort,
            searchProps,
            pageProps: {...defaultPageProps},
        });
    }

    getQueryVariable = () => {
        let {searchProps, pageProps, sort} = this.state;

        return ({
            kv: JSON.stringify(searchProps),
            ...pageProps,
            sort,
        })
    }

    handlePhoneDataGet = (result) => {
        if (this.props.isPhone) {
            if (!isNotEmpty(result)) {
                $Snackbar({
                    content: '已经没有资源了'
                });
                
                return this.phoneLastDataList;
            }

            let oldIdList = this.phoneLastDataList.map(o => o.id);

            let addList = result.filter(o => !oldIdList.includes(o.id));

            this.phoneLastDataList.push(...addList);

            oldIdList = addList = null;

            return this.phoneLastDataList;
        }

        return result;
    }

    handleSetPhoneLastScrollY = (yNum) => {
        this.phoneStartY = yNum;
    }

    render () {
        let {searchProps, pageProps, sort} = this.state;

        let qVariables = this.getQueryVariable();

        let qSkip = !isNotEmpty(searchProps);

        return (
            <section>
                <SearchBtn handleSearch={this.handleInput} />

                <Query query={getSearchComicList} variables={qVariables} skip={qSkip} loadingType="liner">
                    {({data}) => {
                        let { result, page } = data.searchComicList;

                        this.handleSetLastId(result.slice(-1)[0] ? result.slice(-1)[0].id : undefined);

                        let finalResult = this.handlePhoneDataGet(result);

                        return (
                            <this.C
                                handleChangePage={this.handleChangePage}
                                dataArr={finalResult}
                                pageProps={pageProps}
                                searchPage={page}
                                phoneStartY={this.phoneStartY}
                                getLastScrollY={this.handleSetPhoneLastScrollY} />
                        );
                    }}
                </Query>

                <PopModal btnNode={(<ToolNode />)} autoClose={false} 
                    popNode={(<ToolBox setParentProps={this.handleGetSST} defaultSort={sort} 
                        defaultState={searchProps.s} defaultType={searchProps.t} />
                    )} />
            </section>
        );
   }
}

export default SearchComponent;

