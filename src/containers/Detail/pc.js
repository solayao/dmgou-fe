import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import mStyle from './index.module.scss';

function DetailPC (props) {
    let {comicDetail, handleAuthorClick} = props;
    return (
        <div className={mStyle["pc-detail-mess"]}>
            <img src={comicDetail.icon+'?w=200&h=300'} alt={comicDetail.name} />
            <Typography component="a" onClick={handleAuthorClick(comicDetail.author)}>作&emsp;&emsp;者：{comicDetail.author}</Typography>
            <Typography component="p">状&emsp;&emsp;态：{comicDetail.status}</Typography>
            <Typography component="p">分&emsp;&emsp;类：{comicDetail.type}</Typography>
            <Typography component="p">更新日期：{comicDetail.lastUpdate}</Typography>
            <Typography component="p">最近更新：{comicDetail.last}</Typography>
        </div>
    )
}

DetailPC.propTypes = {
    comicDetail: PropTypes.object.isRequired,
    handleAuthorClick: PropTypes.func,
}

export default DetailPC;