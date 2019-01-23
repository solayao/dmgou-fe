import React from 'react';
import PropTypes from 'prop-types';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import mStyle from '../index.module.scss';

function ToolBox (props) {
    let {imgList, currentNo, chapterIndex, chapterList, handleChangeNo, handleChangeCh, hasBarrage, handleChangeBarrage} = props;

    return (
        <Card className={mStyle['toolbox-root']}>
            <Typography component="div" align="left">
                <span className={mStyle['toolbox-title']}>翻页：</span>
                <NativeSelect value={currentNo} onChange={handleChangeNo}>
                    {imgList.map((url, index) => (
                        <option key={url} value={index + 1}>第{index + 1}页</option>)
                    )}
                </NativeSelect>
            </Typography>

            <Typography component="div" align="left">
                <span className={mStyle['toolbox-title']}>弹幕：</span>
                <Switch
                    checked={hasBarrage}
                    onChange={handleChangeBarrage}
                    color="primary"
                />
            </Typography>

            <Typography component="div" align="left">
                <span className={mStyle['toolbox-title']}>操作：</span> 
                {chapterIndex > 0 &&
                    (<a onClick={handleChangeCh(-1)} style={{marginRight: '10px'}}>上一章</a>)}
                {chapterIndex < chapterList.length - 1 &&
                    (<a onClick={handleChangeCh(1)}>下一章</a>)}
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
    hasBarrage: PropTypes.bool,
    handleChangeBarrage: PropTypes.func
}

export default ToolBox;