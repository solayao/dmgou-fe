import React from 'react';
import PropTypes from 'prop-types';
import PaginationBtn from './part/paginationBtn';
import BoxList from '@proje/BoxList';
import mStyle from './index.module.scss';


function SearchPC (props) {
    let {handleChangePage, pageProps, dataArr, searchPage} = props;
    return (
        <React.Fragment>
            <div className={mStyle["search-list"]}>
                <BoxList dataArr={dataArr} maxNum={0} isPhone={false} />
            </div>

            <div className={mStyle["search-pagination"]}>
                <PaginationBtn setPapinationProps={handleChangePage} 
                    no={pageProps.no} size={pageProps.size} total={searchPage.total} />
            </div>
        </React.Fragment>
    )
}

SearchPC.propTypes = {
    handleChangePage: PropTypes.func,
    pageProps: PropTypes.object,
    dataArr: PropTypes.array.isRequired,
    searchPage: PropTypes.object,
}
SearchPC.defaultProps = {
    pageProps: {
        no: 1,
        size: 12
    },
    dataArr: []
}
export default SearchPC;

