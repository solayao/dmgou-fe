import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ComicCard from '../ComicCard';
import mStyle from './index.module.scss';

const CarouselModel = React.lazy(() => import('@antd/CarouselModel'));

const createList = (dataArr, max) => {
    if (!!max) {
        let pageSize = Math.floor(dataArr.length / max) + 1;
        let arr = new Array(pageSize).fill('');
        arr = arr.map((v, i) => {
            let dStart = i * max;
            let dEnd = (i + 1) * max;
            return (
                <div className={mStyle['body']} key={shortid.generate()}>
                    <section className={mStyle['section']}>
                        {
                            dataArr.slice(dStart, dEnd).map(data => ComicCard(data))
                        }
                    </section>
                </div>
            );
        });
        return arr;
    } else {
        return dataArr.map(data => ComicCard(data))
    }
};

function BoxList(props) {
    let {dataArr, maxNum, isPhone} = props;
    
    let judge = !!maxNum && dataArr.length > maxNum && !isPhone;

    let C = judge ? CarouselModel : React.Fragment;

    let p = judge ? {
        config: {
            // autoplay: false,
            autoplaySpeed: 1000 * 10
        }
    } : {};

    let child = createList(dataArr, maxNum);

    return (
        <C {...p}>
           {child}
        </C>
    );
}

BoxList.propTypes = {
    dataArr: PropTypes.array,
    maxNum: PropTypes.number,
    isPhone: PropTypes.bool,
}

export default BoxList;