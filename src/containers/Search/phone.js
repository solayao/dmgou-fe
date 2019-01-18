import React from 'react';
import PropTypes from 'prop-types';
import BoxList from '@proje/BoxList';
import Query from '@gql/Query';
import {getSearchComicList} from '@/query';;
import Scroll from '@phone/Scroll';
import mStyle from './index.module.scss';


class SearchPhone extends React.Component {
    constructor (props) {
        super (props);
        this.dataList = [];
        this.boxHeight = document.getElementById('root').clientHeight - 150;
    }

    componentWillUnmount () {
        this.dataList = null;
    }

    handlePullUp = (pageNo) => () => {
        let {handleChangePage, size} = this.props;
        handleChangePage(pageNo+1, size, 1);
    }

    getDataList = (queryData, queryPage) => {
        if (!queryPage.no || queryPage.no === 1) this.dataList = queryData;
        else {
            let oldIdList = this.dataList.map(o => o.id);
            let addList = queryData.filter(o => !oldIdList.includes(o.id));
            this.dataList.push(...addList);
            oldIdList = addList = null;
        }

        return this.dataList;
    }

    render () {
        let {qVariables, qSkip, setLastId} = this.props;

        return (
            <Query query={getSearchComicList} variables={qVariables} skip={qSkip} loadingType="liner">
                {({data}) => {
                    let { result, page } = data.searchComicList;
                    let dataArr = this.getDataList(result, page);
                    setLastId(result.slice(-1)[0] ? result.slice(-1)[0].id : undefined);
                    return (
                        <Scroll updateScrollToTop={false} pullUpFunc={this.handlePullUp(page.no)} height={this.boxHeight}>
                            <div className={mStyle["search-list"]}>
                                <BoxList dataArr={dataArr} maxNum={0} isPhone={true} />
                            </div>
                        </Scroll>
                    );
                }}
            </Query>
        )
   }
}

SearchPhone.propTypes = {
    handleChangePage: PropTypes.func,
    setLastId: PropTypes.func,
    pageProps: PropTypes.object,
    qVariables: PropTypes.object,
    qSkip: PropTypes.bool,
}
SearchPhone.defaultProps = {
    pageProps: {
        no: 1,
        size: 12
    }
}
export default SearchPhone;

