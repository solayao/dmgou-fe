import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/BuildOutlined';
import ToolBox from './part/toolBox';
import ImgModel from './part/img';
import PopModal from '@proje/PopModal';
import RowGallery from '@mui/RowGallery';
import BarragePanel from '@proje/BarragePanel';

function ToolNode () {
    return (
        <Fab color="primary" aria-label="配置查询参数">
            <BuildIcon />
        </Fab>
    )
}


class ChapterPC extends React.PureComponent {
    state = {
        imgNo: 1
    }

    handleChangeNo = (event) => {
        this.setState({
            imgNo: event.target.value
        })
    }

    handleGalleryItemClick = (title) => /(\d+)/.test(title) && this.setState({imgNo: RegExp.$1})

    getGalleryList = imgList => imgList.map((url, index) => ({
        img: url + '?w=100&h=150&q=50',
        srcset: url + '?w=100&h=150&q=50',
        title: `第${index + 1}页`
    }))

    render (){
        let {imgNo} = this.state, {imgList, chapterList, changeChapter, currentCh} = this.props;
 
        return (
            <React.Fragment>
                <ImgModel />

                <div style={{height: 400}}>
                    <BarragePanel />
                </div>

                <RowGallery
                    tileList={this.getGalleryList(imgList)}
                    cols={3.5}
                    itemClick={this.handleGalleryItemClick}
                />

                <PopModal btnNode={(<ToolNode />)} autoClose={false}
                    popNode={(<ToolBox imgList={imgList} currentNo={imgNo} chapterIndex={chapterList.indexOf(currentCh)} chapterList={chapterList} handleChangeCh={changeChapter} handleChangeNo={this.handleChangeNo} />)} />
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

export default ChapterPC;