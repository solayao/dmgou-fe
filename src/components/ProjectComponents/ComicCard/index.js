import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import MediaCard from '@mui/MediaCard';
import {isPhoneContext, socketContext} from '@/store/context';

const Fragment = React.Fragment;

const handleErrorCB = (socket, id) => () => {
    if (!!id && !!socket) 
        socket.emit('fe-crawelr-latest', id);
}

function ComicCard (props){
    let {id, name, icon, author, last, lastUpdate, state, type} = props;

    let linkProps = {
        pathname: '/detail',
        search: `cn=${encodeURIComponent(name)}`
    };

    let cardHeader = {
        title: (
            <isPhoneContext.Consumer>
                {isPhone => (
                    <Tooltip title={name} placement="bottom">
                        <Typography component="p" variant="subtitle1" noWrap={isPhone}>
                            {name.length > 10 ? `${name.slice(0, 10)}...` : name}
                        </Typography>
                    </Tooltip>
                )}
            </isPhoneContext.Consumer>
        )
    };

    let cardMedia = (socketio) => ({
        image: icon,
        srcset: icon,
        title: name,
        imgErrCB: handleErrorCB(socketio, id)
    });

    let cardContent = {
        children: (
            <Fragment>
                {author && <Typography component="p">{author}</Typography>}
                <Typography component="p">{last}</Typography>
                {lastUpdate && <Typography component="p" style={{color: 'red'}}>{lastUpdate}</Typography>}
            </Fragment>
        )
    };

    let cardActions = state && type ? {
        children: ( 
            <Fragment>
                {state && type && <Typography component="p">{state} {type}</Typography>}
            </Fragment>
        )
    } : null;

    return (
        <Link to={linkProps} key={shortid.generate()}>
            <socketContext.Consumer>
                {socket => (
                    <MediaCard layout="img-left"
                        header={cardHeader} media={cardMedia(socket)}
                        actions={cardActions} content={cardContent} />
                )}
            </socketContext.Consumer>
            
        </Link>
    );
};

ComicCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    last: PropTypes.string,
    lastUpdate: PropTypes.string,
    author: PropTypes.string,
    state: PropTypes.string,
};

export default ComicCard;