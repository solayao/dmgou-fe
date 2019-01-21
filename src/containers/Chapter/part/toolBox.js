import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

function ToolBox (props) {
    let {imgList, currentNo, chapterIndex, chapterList, handleChangeNo, handleChangeCh} = props;

    let {cn, co, ch} = JSON.parse(sessionStorage.getItem('urlSearch'));

    return (
        <Card>
            <Typography component="div" align="left">
                翻页：
                <NativeSelect value={currentNo} onChange={handleChangeNo}>
                    {imgList.map((url, index) => (
                        <option key={url} value={index + 1}>第{index + 1}页</option>)
                    )}
                </NativeSelect>
            </Typography>
            <Typography component="div" align="left">
                {chapterIndex > 0 &&
                    (<span onClick={handleChangeCh(-1)} style={{marginRight: '10px'}}>上一章</span>)}
                {chapterIndex < chapterList.length - 1 &&
                    (<span onClick={handleChangeCh(1)}>下一章</span>)}
            </Typography>
        </Card>
    )
}

ToolBox.propTypes = {
    imgList: PropTypes.array,
    currentNo: PropTypes.number,
    chapterIndex: PropTypes.number,
    chapterList: PropTypes.array,
    handleChangeNo: PropTypes.func,
    handleChangeCh: PropTypes.func,
}

export default ToolBox;