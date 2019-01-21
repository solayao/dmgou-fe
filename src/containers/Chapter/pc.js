import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/BuildOutlined';
import ToolBox from './part/toolBox';
import PopModal from '@proje/PopModal';

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

    render (){
        let {imgNo} = this.state, {imgList, chapterList, changeChapter, currentCh} = this.props;
 
        return (
            <React.Fragment>

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