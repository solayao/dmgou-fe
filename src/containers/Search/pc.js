import React from 'react';
import PropTypes from 'prop-types';
import PaginationBtn from './part/paginationBtn';
import BoxList from '@proje/BoxList';
import Query from '@gql/Query';
import {getSearchComicList} from '@/query';
import mStyle from './index.module.scss';


function SearchPC (props) {
    let {handleChangePage, setLastId, pageProps, qVariables, qSkip} = props;
    return (
        <Query query={getSearchComicList} variables={qVariables} skip={qSkip} loadingType="liner">
            {({data}) => {
                let { result, page } = data.searchComicList;

                setLastId(result.slice(-1)[0] ? result.slice(-1)[0].id : undefined);

                return (
                    <React.Fragment>
                        <div className={mStyle["search-list"]}>
                            <BoxList dataArr={result} maxNum={0} isPhone={false} />
                        </div>

                        <div className={mStyle["search-pagination"]}>
                            <PaginationBtn setPapinationProps={handleChangePage} 
                                no={pageProps.no} size={pageProps.size} total={page.total} />
                        </div>
                    </React.Fragment>
                );
            }}
        </Query>
    )
}

SearchPC.propTypes = {
    handleChangePage: PropTypes.func,
    setLastId: PropTypes.func,
    pageProps: PropTypes.object,
    qVariables: PropTypes.object,
    qSkip: PropTypes.bool,
}
SearchPC.defaultProps = {
    pageProps: {
        no: 1,
        size: 12
    }
}
export default SearchPC;

