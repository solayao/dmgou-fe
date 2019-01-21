import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import mStyle from './index.module.scss';

function DetailPhone (props) {
    let {handleAuthorClick, comicDetail} = props;

    return (
        <div className={mStyle["phone-detail-mess"]} style={{
            backgroundImage: `url(${comicDetail.icon+'?w=300&h=450'})`
        }}>
            <img src={comicDetail.icon+'?w=100&h=150'} alt={comicDetail.name} />
            <div className={mStyle["phone-detail-mess-info"]}>
                <p onClick={handleAuthorClick(comicDetail.author)}>{comicDetail.author}</p>
            </div>
        </div>
    )
}

DetailPhone.propTypes = {
    comicDetail: PropTypes.object.isRequired,
    handleAuthorClick: PropTypes.func,
}

export default DetailPhone;