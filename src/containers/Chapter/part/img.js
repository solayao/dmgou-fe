import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import mStyle from '../index.module.scss';

class ImgModel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pageNo: props.showImgNo,
            loading: true,
            error: false
        };

        this.imgRefs = React.createRef();

        this.imgHeight = document.getElementById('root').clientHeight - 100;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showImgNo !== this.state.pageNo) {
            this.setState({pageNo: nextProps.showImgNo, loading: true})
        }
    }

    componentWillUnmount ()　{
        this.imgRefs = this.imgHeight = null;
    }

    imgOnLoad = () => {
        this.setState({loading: false, error: false});
    }

    imgError = () => {
        this.setState({loading: false, error: true})
    }

    handleClick = (allowNum) => () => {
        const {pageNo} = this.state;
        const {imgUrlList} = this.props;
        const num = pageNo + allowNum;
        if (num >= 1 && num <= imgUrlList.length) {
            if (this.props.changePageNum) {
                this.props.changePageNum(num);
            } else {
                this.setState({loading: true, pageNo: num})
            }
        }
    }

    handleReplay = (src) => () => {
        this.imgRefs.current.src = src;
        this.setState({
            loading: true,
            error: false
        })
    }

    // renderViewCarouselIcon = (showFunc) => {
    //     return (
    //         <ViewCarouselIcon aria-label="放大" onClick={showFunc}><ReplayIcon/></ViewCarouselIcon>
    //     )
    // }
    
    getImgSrcSet = (src) => {
        let src1x = `${src}?w=0&h=${this.imgHeight}&q=100 1x`;
        let src2x = `${src}?w=0&h=${this.imgHeight*2}&q=90 2x`;
        let src3x = `${src}?w=0&h=${this.imgHeight*3}&q=90 3x`;
        return `${src1x}, ${src2x}, ${src3x};`
    }

    render() {
        let {imgUrlList} = this.props, {pageNo, loading, error} = this.state;

        let imgSrc = imgUrlList[pageNo - 1] + '?w=0&h=' + this.imgHeight + '&q=100';

        let imgSrcSet = this.getImgSrcSet(imgUrlList[pageNo - 1]);

        return (
            <div className={mStyle["chapter-image"]}>
                <div className={classNames(mStyle['hover-area'], mStyle["left-allow"], pageNo === 1 && mStyle['allow-disabled'])}
                    onClick={this.handleClick(-1)}></div>

                <img 
                    key={imgSrc}
                    ref={this.imgRefs}
                    src={imgSrc}
                    srcSet={imgSrcSet}
                    alt={'第' + pageNo + '页'}
                    onLoad={this.imgOnLoad}
                    onError={this.imgError}
                    style={{display: error ? 'none' : undefined}}
                />

                {/* {loading && !error && <div
                    style={loadStyle}
                    ><LoadingComponent moduleType="ball-spin-fade-loader" /></div>} */}

                {/* {error && <div className={mStyle["chapter-replay"]}
                    style={errorStyle}><IconButton aria-label="刷新" onClick={this.handleReplay(imgSrc)}><ReplayIcon/></IconButton></div>} */}

                {/* {!loading && !error && <div className={mStyle["chapter-view_carousel"]}>
                    <ImageActionModel
                        currentIndex={pageNo-1} 
                        imageList={imgUrlList} 
                        createActionFunc={this.renderViewCarouselIcon}
                        srcFormat={"?w=500&h=0&q=100"}
                        canPrevOrNext={false}
                    /></div>
                } */}

                <div className={classNames(mStyle['hover-area'], mStyle["right-allow"], pageNo === imgUrlList.length && mStyle['allow-disabled'])}
                    onClick={this.handleClick(1)}></div>
            </div>
        )
    }
}

ImgModel.propTypes = {
    imgUrlList: PropTypes.array.isRequired,
    showImgNo: PropTypes.number,
};
ImgModel.defaultProps = {
    imgUrlList: [
        '/getImg/overseas/dmzj/img/12/20100109_5320f4f20a8aab8a89a2YDKSyjq8yRZp.jpg',
        '/getImg/domestic/dmzj/img/11/1007321311539747852.jpg',
        '/getImg/overseas/dmzj/img/14/langyuxiangxinliao0119.jpg'
    ],
    showImgNo: 1
};

export default ImgModel;