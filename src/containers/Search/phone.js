import React from 'react';
import PropTypes from 'prop-types';
import BoxList from '@proje/BoxList';
import Scroll from '@phone/Scroll';
import mStyle from './index.module.scss';

class SearchPhone extends React.Component {
    constructor (props) {
        super (props);
        this.boxHeight = document.getElementById('root').clientHeight - 150;
    }

    componentDidMount () {
        window.scrollTo(0, 0);
    }

    handlePullUp = () => {
        let {handleChangePage, pageProps} = this.props;
        handleChangePage(pageProps.no+1, pageProps.size, 1);
    }

    render () {
        let {dataArr, getLastScrollY, phoneStartY} = this.props;

        return (
            <Scroll getLastScrollY={getLastScrollY} defaultY={phoneStartY} pullUpFunc={this.handlePullUp} height={this.boxHeight}>
                <div className={mStyle["search-list"]}>
                    <BoxList dataArr={dataArr} maxNum={0} isPhone={true} />
                </div>
            </Scroll>
        )
   }
}

SearchPhone.propTypes = {
    handleChangePage: PropTypes.func,
    pageProps: PropTypes.object,
    dataArr: PropTypes.array.isRequired,
    searchPage: PropTypes.object,
    getLastScrollY: PropTypes.func,
    phoneStartY: PropTypes.number
}
SearchPhone.defaultProps = {
    pageProps: {
        no: 1,
        size: 12
    },
    dataArr: []
}
export default SearchPhone;

