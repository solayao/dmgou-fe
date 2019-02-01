import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/BuildOutlined';
import ToolBox from './part/toolBox';
import ImgModel from './part/img';
import PopModal from '@proje/PopModal';
import RowGallery from '@mui/RowGallery';
import BarragePanel from '@proje/BarragePanel';
import mStyle from './index.module.scss';

function ToolNode () {
    return (
        <Fab color="primary" aria-label="配置查询参数">
            <BuildIcon />
        </Fab>
    )
}


class ChapterPC extends React.PureComponent {
    constructor (props) {
        super(props);
        this.imgRootHeight = document.getElementById('root').clientHeight - 100;
    }

    state = {
        imgNo: 1,
        hasBarrage: false,
        imgLoadOrError: false
    }

    componentWillUnmount () {
        this.imgRootHeight = null;
    }

    handleChangeNo = (event) => {
        this.setState({
            imgNo: event.target.value
        })
    }

    handleChangePageNum = (num) => {
        this.setState({
            imgNo: num
        })
    }

    handleChangeBarrage = (event) => {
        this.setState({
            hasBarrage: event.target.checked
        })
    }

    handleGalleryItemClick = (title) => /(\d+)/.test(title) && this.setState({
        imgNo: RegExp.$1
    })

    getGalleryList = imgList => imgList.map((url, index) => ({
        img: url + '?w=100&h=150&q=50',
        srcset: url + '?w=100&h=150&q=50',
        title: `第${index + 1}页`
    }))

    handleLoadOrError = (bool) => {
        this.setState({
            imgLoadOrError: bool
        })
    }

    render (){
        let {imgNo, hasBarrage, imgLoadOrError} = this.state, {imgList, chapterList, changeChapter, currentCh} = this.props;
        
        return (
            <React.Fragment>
                <div className={mStyle['pc-img-root']}>
                    <ImgModel imgUrlList={imgList} showImgNo={parseInt(imgNo, 10)} imgHeight={this.imgRootHeight}
                        changePageNum={this.handleChangePageNum} handleLoadOrError={this.handleLoadOrError} />

                    {hasBarrage && (
                        <div className={classNames(mStyle['pc-barrage-root'], imgLoadOrError && mStyle['barrage-hidden'])}>
                            <BarragePanel canvasHeight={this.imgRootHeight} />
                        </div>
                    )}
                </div>

                <RowGallery
                    tileList={this.getGalleryList(imgList)}
                    cols={3.5}
                    itemClick={this.handleGalleryItemClick}
                />

                <PopModal btnNode={(<ToolNode />)} autoClose={false}
                    popNode={(<ToolBox imgList={imgList} currentNo={parseInt(imgNo, 10)} chapterIndex={chapterList.indexOf(currentCh)} chapterList={chapterList}
                        handleChangeCh={changeChapter} handleChangeNo={this.handleChangeNo} 
                        hasBarrage={hasBarrage} handleChangeBarrage={this.handleChangeBarrage} />
                    )}/>
            </React.Fragment>
        )
    }
}

ChapterPC.propTypes = {
    imgList: PropTypes.array.isRequired,
    currentCh: PropTypes.string,
    chapterList: PropTypes.array,
    changeChapter: PropTypes.func,
}
ChapterPC.defaultProps = {
    imgList: []
}

export default ChapterPC;