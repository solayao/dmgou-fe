import React from 'react';
import ComicCard from '../ComicCard';

const CarouselModel = React.lazy(() => import('@antd/CarouselModel'));

class BoxList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            pageNo: 0
        }
    }

    handleChangeNum = (current) => {
        this.setState({
            pageNo: current
        })
    }

    render() {
        let {dataArr, maxNum} = this.props, {pageNo} = this.state;
        
        let C = dataArr.length > maxNum ? CarouselModel : React.Fragment;
        let p = dataArr.length > maxNum ? {
            autoplay: false,
            afterChange: this.handleChangeNum
        } : {};

        let dStart = pageNo * maxNum;
        let dEnd = (pageNo + 1) * maxNum;

        return (
            <C {...p}>
                <div>
                    <section>
                        {
                            dataArr.slice(dStart, dEnd).map(data => ComicCard(data))
                        }
                    </section>
                </div>
            </C>
        )
    }
}