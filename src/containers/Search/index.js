import React from 'react';
import {observer, inject} from 'mobx-react';
import {trim} from 'dizzyl-util/lib/string';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/BuildOutlined';
import SearchBtn from './part/searchBtn';
import ToolBox from './part/toolBox';
import PopModal from '@proje/PopModal';

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
    }

    state = {
        searchProps: {},
        pageProps: {...defaultPageProps},
        sort: 't_dom',
    };

    componentWillUnmount () {
        this.C = this.lastId = null;
    }

    handleInput = () => {
        let d = this.props.searchInputVal;

        let copy = {...this.state.searchProps};

        let newSearch = {};

        if (copy['n'] !== trim(d)) {
            copy['n'] = trim(d);
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
        let {sort, type, state} = obj;
        let {searchProps} = this.state;
        
        searchProps['s'] = !!state ? state : undefined;

        searchProps['t'] = type.length > 0 ? type : undefined;

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

    render () {
        let {searchProps, pageProps, sort} = this.state;

        let qVariables = this.getQueryVariable();

        let qSkip = !isNotEmpty(searchProps);

        return (
            <section>
                <SearchBtn handleSearch={this.handleInput} />
                
                <this.C handleChangePage={this.handleChangePage} setLastId={this.handleSetLastId}
                    pageProps={pageProps} qVariables={qVariables} qSkip={qSkip} />

                <PopModal btnNode={(<ToolNode />)} autoClose={false} 
                    popNode={(<ToolBox setParentProps={this.handleGetSST} defaultSort={sort} defaultState={searchProps.s} defaultType={searchProps.t} />)} />
            </section>
        );
   }
}

export default SearchComponent;

