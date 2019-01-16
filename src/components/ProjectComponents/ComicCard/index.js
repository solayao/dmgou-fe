import React from 'react';
import Proptypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MediaCard from '@mui/MediaCard';
import shortid from 'shortid';

const Fragment = React.Fragment;

function handleErrorCB = (socket, id) => () => {
    if (!!id && !!socket) 
        socket.emit('fe-crawelr-latest', id);
}

function ComicCard (props){
    const {socketio, id, name, icon, author, last, lastUpdate, state, type, isPhone} = props;

    let linkProps = {
        pathname: '/detail',
        search: `cn=${encodeURIComponent(name)}`
    };
    let cardHeader = {
        title: (
            <Tooltip title={name} placement="bottom">
                <Typography component="p" variant="h6" noWrap={!isPhone}>
                    {name}
                </Typography>
            </Tooltip>
        )
    };
    let cardMedia = {
        image: icon,
        srcset: icon,
        title: name,
        imgErrCB: handleErrorCB(socketio, id)
    };
    let cardContent = {
        children: (
            <Fragment>
                {author && <Typography component="p">{author}</Typography>}
                <Typography component="p">{last}</Typography>
                {lastUpdate && <Typography component="p" style={{color: 'red'}}>{lastUpdate}</Typography>}
            </Fragment>
        )
    };
    let cardActions = {
        children: ( 
            <Fragment>
                {state && type && <Typography component="p">{state} {type}</Typography>}
            </Fragment>
        )
    }
    return (
        <Link to={linkProps}>
            <MediaCard layout="img-left"
                header={cardHeader} media={cardMedia}
                actions={cardActions} content={cardContent} />
        </Link>
    )
};

ComicCard.propTypes = {
    socketio: Proptypes.object,
    isPhone: Proptypes.bool,

    id: Proptypes.string,
    name: Proptypes.string,
    icon: Proptypes.string,
    last: Proptypes.string,
    lastUpdate: Proptypes.string,
    author: Proptypes.string,
    state: Proptypes.string,
};

export default ComicCard;