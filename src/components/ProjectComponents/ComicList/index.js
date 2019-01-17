import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import MediaCard from '@mui/MediaCard';
import mStyles from './index.module.scss';

const Fragment = React.Fragment;
const comicMedia = (obj, isPhone, socketio) => {
    const props = {
        layout: 'img-left',
        header: {
            title: (
                <Tooltip title={obj.name} placement="bottom">
                    <Typography component="p" variant="h6" noWrap={!isPhone}>
                        {obj.name}
                    </Typography>
                </Tooltip>
            ),
            classes: {
                root: classNames(mStyles['Dui-comicList-media-header'], !isPhone && mStyles['Dui-comicList-media-header-nowrap']),
                content: mStyles['Dui-comicList-media-header-content']
            }
        },
        media: {
            image: obj.icon,
            srcset: obj.icon,
            title: obj.name,
            imgErrCB: () =>　{
                socketio.emit('fe-crawelr-latest', obj.id);
            }
        },
        content: {
            children: (
                <Fragment>
                    <Typography component="p">{obj.author}</Typography>
                    <Typography component="p">{obj.last}</Typography>
                    <Typography component="p" style={{color: 'red'}}>{obj.lastUpdate}</Typography>
                </Fragment>
            )
        },
        actions: {
            children: (
                <Fragment>
                    <Typography component="p">{obj.state} {obj.type}</Typography>
                </Fragment>
            )
        }
    };
    return (
        <Link
            key={shortid.generate()}
            to={{
                pathname: '/detail',
                search: `cn=${encodeURIComponent(obj.name)}`
            }}
        >
            <MediaCard {...props}/>
        </Link>
    )
};

function ComicList(props) {
    const { comicDataList, isPhone, socketio} = props;
    return (
        <div className={mStyles["Dui-comic-media-list"]}>
            {comicDataList.map(comic => comicMedia(comic, isPhone, socketio))}
        </div>
    );
}

ComicList.propTypes = {
    comicDataList: PropTypes.array.isRequired,
    isPhone: PropTypes.bool,
    socketio: PropTypes.object,
};
ComicList.defaultProps = {
    comicDataList: [],
    isPhone: false
};

export default ComicList;
