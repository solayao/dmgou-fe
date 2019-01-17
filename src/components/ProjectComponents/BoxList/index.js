import React from 'react';
import Proptypes from 'prop-types';
import shortid from 'shortid';
import ComicCard from '../ComicCard';
import mStyle from './index.module.scss';

const CarouselModel = React.lazy(() => import('@antd/CarouselModel'));

const createList = (dataArr, max) => {
    let pageSize = Math.floor(dataArr.length / max) + 1;
    let arr = new Array(pageSize).toString().split(',');
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
};

function BoxList(props) {
    let {dataArr, maxNum, isPhone} = props;
        
    let C = dataArr.length > maxNum && !isPhone ? CarouselModel : React.Fragment;
    let p = dataArr.length > maxNum && !isPhone ? {
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
    dataArr: Proptypes.array,
    maxNum: Proptypes.number,
    isPhone: Proptypes.bool,
}

export default BoxList;