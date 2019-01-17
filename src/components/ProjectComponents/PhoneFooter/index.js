import React from 'react';
import Fab from '@material-ui/core/Fab';
import LiveHelpIcon from '@material-ui/icons/LiveHelpOutlined';
import PopperModel from '@mui/PopperModel';
import mStyle from './index.module.scss';

function FabModel () {
    return (
        <Fab color="primary" aria-label="关于">
            <LiveHelpIcon />
        </Fab>
    )
}

function MessageModel () {
    return (
        <div className={mStyle['phone-mess']}>本站漫画等相关内容均来自互联网，以供漫画爱好者研究漫画画法技巧和构图方式，若侵犯到您的权益，请立即联系我们删除。本站不负任何相关责任。</div>
    )
}

function PhoneFooter (props) {
    return (
        <PopperModel 
            btnNode={(<FabModel />)}
            popNode={(<MessageModel />)}
            positionTop="90"
            autoClose={true}
            popPlacement="top-end"
        />
    )
}

export default PhoneFooter;