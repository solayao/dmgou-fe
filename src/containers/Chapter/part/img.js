import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LoadingComponent from '@dizzy/LoadingComponent';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import ViewCarouselIcon from '@material-ui/icons/ViewCarouselOutlined';
import ImageActionModel from '@dizzy/ImageLightBox';
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

        this.imgHeight = props.imgHeight;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showImgNo !== this.state.pageNo) {
            this.setState({pageNo: nextProps.showImgNo, loading: true})
        }
    }

    componentWillUpdate (nextProps, nextState) {
        if (nextProps.handleLoadOrError) nextProps.handleLoadOrError(nextState.loading || nextState.error)
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

    renderViewCarouselIcon = (showFunc) => (
        <ViewCarouselIcon aria-label="放大" onClick={showFunc} />
    )
    
    getImgSrcSet = (src) => {
        let src1x = `${src}?w=0&h=${this.imgHeight}&q=100 1x`;
        let src2x = `${src}?w=0&h=${this.imgHeight*2}&q=90 2x`;
        let src3x = `${src}?w=0&h=${this.imgHeight*3}&q=90 3x`;
        return `${src1x}, ${src2x}, ${src3x}`;
    }

    render() {
        let {imgUrlList} = this.props, {pageNo, loading, error} = this.state;

        let imgSrc = imgUrlList[pageNo - 1] + '?w=0&h=' + this.imgHeight + '&q=100';

        let imgSrcSet = this.getImgSrcSet(imgUrlList[pageNo - 1]);

        return (
            <React.Fragment>
                <div className={mStyle["image-root"]} style={{height: this.imgHeight + 10, padding: 5}}>
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

                    {loading && !error && (
                        <div className={mStyle["image-load"]} style={{height: this.imgHeight}}>
                            <LoadingComponent moduleType="ball-spin-fade-loader" />
                        </div>
                    )}

                    {error && (
                        <div className={mStyle["image-error"]}>
                            <IconButton aria-label="刷新" onClick={this.handleReplay(imgSrc)}>
                                <ReplayIcon/>
                            </IconButton>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className={mStyle["image-vc"]}>
                            <ImageActionModel
                                currentIndex={pageNo-1} 
                                imageList={imgUrlList} 
                                createActionFunc={this.renderViewCarouselIcon}
                                srcFormat={"?w=500&h=0&q=95"}
                                canPrevOrNext={false}
                            />
                        </div>
                    )}

                    <div className={classNames(mStyle['hover-area'], mStyle["right-allow"], pageNo === imgUrlList.length && mStyle['allow-disabled'])}
                        onClick={this.handleClick(1)}></div>
                </div>

            </React.Fragment>
        )
    }
}

ImgModel.propTypes = {
    imgUrlList: PropTypes.array.isRequired,
    showImgNo: PropTypes.number,
    changePageNum: PropTypes.func,
    imgHeight: PropTypes.number,
    handleLoadOrError: PropTypes.func,
};
ImgModel.defaultProps = {
    imgUrlList: [],
    showImgNo: 1
};

export default ImgModel;