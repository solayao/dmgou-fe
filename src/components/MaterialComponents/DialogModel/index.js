import React from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

/**
 * @description 对话框
 * @src https://material-ui.com/api/dialog/
 * @author Dizzy L
 * @param {*} props
 * @prop {Node} title 标题
 * @prop {Node} content 内容
 * @prop {String} contentText 文字内容
 * @prop {Node} actions 操作
 * @prop {Boolean} open 是否显示
 * @prop {Object} dialogProps Dialog的属性
 * @returns
 */
class DialogModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open
        }
        this.dialogRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.getDialogThis) {
            this
                .props
                .getDialogThis(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.open) {
            this.setState({open: nextProps.open})
        }
    }

    componentWillUnmount() {
        this.handleClose();
        this.dialogRef = null;
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleBtnClickBindThis = (btn) => () => btn.onClick(this);

    render() {
        let {title, contentText, content, actions, dialogProps} = this.props, {open} = this.state;
        return (
            <Dialog open={open} onClose={this.handleClose} ref={this.dialogRef} {...dialogProps}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {contentText && <DialogContentText>{contentText}</DialogContentText>}
                    {content}
                </DialogContent>
                <DialogActions>
                    {
                        actions.map(a => a.node({
                            key: shortid.generate(),
                            onClick: this.handleBtnClickBindThis(a)
                        }))
                    }
                </DialogActions>
            </Dialog>
        )
    }
}

DialogModel.propTypes = {
    title: PropTypes.node.isRequired,
    content: PropTypes.node,
    contentText: PropTypes.string,
    actions: PropTypes.array,
    open: PropTypes.bool.isRequired,
    getDialogThis: PropTypes.func,
    dialogProps: PropTypes.object
};
DialogModel.defaultProps = {
    title: 'Title',
    contentText: 'Text for content',
    content: (<p>Node for content</p>),
    actions: [
        {
            node: (props) => (<Button color="primary" {...props}>确认</Button>),
            onClick: (that) => {}
        }, {
            node: (props) => (<Button {...props}>取消</Button>),
            onClick: (that) => {
                that.handleClose()
            }
        }
    ],
    open: false,
    dialogProps: {
        fullScreen: false,
        scroll: 'paper',
        keepMounted: true
    }
};

/*单例Dialog*/
let dialogThis;
const $Dialog = () => {
    const destory = () => {
        let node = window
            .document
            .getElementById('dialog');
        if (!!node) 
            window
                .document
                .body
                .removeChild(node);
        if (dialogThis) {
            dialogThis.handleClose();
            dialogThis = null;
        }
    };
    const create = (props) => {
        const doc = window.document;
        const node = doc.createElement('div');
        node.id = 'dialog';
        doc
            .body
            .appendChild(node);
        ReactDOM.createPortal(
            ReactDOM.render(
                <DialogModel
                    {...props}
                    getDialogThis={that => {
                        dialogThis = that;
                    }}/>,
                node
            ),
            document.body
        );
    };

    return ({
        create: (props) => {
            destory();
            create(props);
        },
        destory
    })
}

export default $Dialog;
