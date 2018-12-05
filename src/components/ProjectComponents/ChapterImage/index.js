import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import mStyles from './index.module.scss';
import IconButton from '@material-ui/core/IconButton';
import LoadingComponent from '@dizzy/LoadingComponent';
import ReplayIcon from '@material-ui/icons/Replay';
import ViewCarouselIcon from '@material-ui/icons/ViewCarouselOutlined';
import ImageActionModel from '@dizzy/ImageLightBox';

const loadStyle = {
    width: 500,
    height: 600,
}
const errorStyle = {
    width: 500,
    height: 600,
    lineHeight: '600px'
}

class ChapterImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNo: props.showImgNo,
            loading: true,
            error: false
        };
        this.imgRefs = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showImgNo !== this.state.pageNo) {
            this.setState({pageNo: nextProps.showImgNo, loading: true})
        }
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

    renderViewCarouselIcon = (showFunc) => {
        return (
            <ViewCarouselIcon aria-label="放大" onClick={showFunc}><ReplayIcon/></ViewCarouselIcon>
        )
    }
    
    getImgSrcSet = (src) => {
        let src1x = `${src}?w=${500}&h=0&q=100 1x`;
        let src2x = `${src}?w=${500*2}&h=0&q=100 2x`;
        let src3x = `${src}?w=${500*3}&h=0&q=100 3x`;
        return `${src1x}, ${src2x}, ${src3x};`
    }

    render() {
        const {imgUrlList} = this.props, {pageNo, loading, error} = this.state;
        const imgSrc = imgUrlList[pageNo - 1] + '?w=500&h=0&q=100';
        const imgSrcSet = this.getImgSrcSet(imgUrlList[pageNo - 1]);

        return (
            <div className={mStyles["Dui-chapter-image"]}>
                <div className={classNames(mStyles["Dui-left-allow"], pageNo === 1 && mStyles['Dui-allow-disabled'])}
                    onClick={this.handleClick(-1)}></div>

                <img 
                    key={imgSrc}
                    ref={this.imgRefs}
                    src={imgSrc}
                    alt={'第' + pageNo + '页'}
                    onLoad={this.imgOnLoad}
                    onError={this.imgError}
                    style={{display: error ? 'none' : undefined}}
                />

                {loading && !error && <div
                    style={loadStyle}
                    ><LoadingComponent moduleType="ball-spin-fade-loader" /></div>}

                {error && <div className={mStyles["Dui-chapter-replay"]}
                    style={errorStyle}><IconButton aria-label="刷新" onClick={this.handleReplay(imgSrc)}><ReplayIcon/></IconButton></div>}

                {!loading && !error && <div className={mStyles["Dui-chapter-view_carousel"]}>
                    <ImageActionModel
                        currentIndex={pageNo-1} 
                        imageList={imgUrlList} 
                        createActionFunc={this.renderViewCarouselIcon}
                        srcFormat={"?w=500&h=0&q=100"}
                        canPrevOrNext={false}
                    /></div>
                }

                <div className={classNames(mStyles["Dui-right-allow"], pageNo === imgUrlList.length && mStyles['Dui-allow-disabled'])}
                    onClick={this.handleClick(1)}></div>
            </div>
        )
    }
}

ChapterImage.propTypes = {
    imgUrlList: Proptypes.array.isRequired,
    showImgNo: Proptypes.number,
    changePageNum: Proptypes.func,
};
ChapterImage.defaultProps = {
    imgUrlList: [],
    showImgNo: 1
};

export default ChapterImage;
