import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import shortid from 'shortid';

/**
 * @description 消息条
 * @src https://material-ui.com/api/snackbar/
 * @author Dizzy L
 * @param {*} props
 * @prop {Node} content 内容
 * @prop {Node} action 操作
 * @prop {Object} snackbarProps snackbar的属性
 * @returns
 */
class SnackbarModel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            messageInfo: {},
        }
        this.queue = Array.isArray(props.content) ?
            props.content : [props.content];
    }
    
    componentWillMount () {
        this.setState({
            messageInfo: {
                message: this.queue.shift(),
                key: shortid.generate()
            },
            open: true,
        });
    }
    
    componentWillUnmount() {
        this.queue = null;
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
    }

    handleExited = () => {
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: {
                    message: this.queue.shift(),
                    key: shortid.generate()
                },
                open: true,
            });
        }
    }

    render () {
        let {open, messageInfo} = this.state, {snackbarProps, action} = this.props;
        let {message, key} = messageInfo;
        return (
            <Snackbar
                key={key}
                ref={this.snackbarRef}
                open={open}
                onClose={this.handleClose}
                onExited={this.handleExited}
                message={message}
                action={action}
                {...snackbarProps}
            />
        )
    }
}

SnackbarModel.propTypes = {
    snackbarProps: PropTypes.object,
    action: PropTypes.node,
    content: PropTypes.node.isRequired,
};
SnackbarModel.defaultProps = {
    action: null,
    snackbarProps: {
        autoHideDuration: 3000,
    }
};

/*单例Snackbar*/
const $Snackbar = (props) => {
    const destory = () => {
        let node = window.document.getElementById('snackbar');
        if (!!node) window.document.body.removeChild(node);
    };
    const create = (sprops) => {
        const doc = window.document;
        const node = doc.createElement('div');
        node.id = 'snackbar';
        doc.body.appendChild(node);
        ReactDOM.createPortal(
            ReactDOM.render(
                <SnackbarModel {...sprops} />
                ,
                node
            ),
            document.body
        );
    };

    destory();
    create(props);
}

export default $Snackbar;