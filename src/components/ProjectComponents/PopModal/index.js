import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Modal from '@material-ui/core/Modal';
import mStyle from './index.module.scss';

@inject(stores => ({
    cleanModal: stores.store.cleanModal,
    changeCleanModal: stores.store.changeCleanModal
}))
@observer
class PopModal extends React.Component {
    state = {
        open: false,
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.cleanModal) {
            this.handleModalClose();
        }
    }
    
    handleModalClose = () => {
        this.setState({
            open: false
        }, () => {
            this.props.changeCleanModal(false);
        })
    }

    handleClick = (event) => {
        this.setState(({
          open: !this.state.open,
        }), () => {
            let {autoClose, autoCloseTime} = this.props;
            if (autoClose && this.state.open) {
                setTimeout(() => {
                    this.handleModalClose();
                }, 1000 * autoCloseTime);
            }
        });
    }

    render () {
        let {open} = this.state, {btnNode, btnPositionTop, btnPositionRight, popNode, hasBackdrop} = this.props;

        let modalBackdropProps = {
            open: hasBackdrop
        }

        return (
            <React.Fragment>
                <div onClick={this.handleClick} className={mStyle['pop-btn']} 
                    style={{ top: `${btnPositionTop}vh`, right: `${btnPositionRight}vw`}}>
                    {btnNode}
                </div>
                <Modal open={open} onBackdropClick={this.handleModalClose} disableAutoFocus={true}
                    BackdropProps={modalBackdropProps}>
                    {popNode}
                </Modal>
            </React.Fragment>
        )
    }
} 

PopModal.propTypes = {
    btnNode: PropTypes.node.isRequired,
    popNode: PropTypes.node.isRequired,
    btnPositionTop: PropTypes.number,
    btnPositionRight: PropTypes.number,
    autoClose: PropTypes.bool,
    autoCloseTime: PropTypes.number,
    hasBackdrop: PropTypes.bool,
};
PopModal.defaultProps = {
    btnPositionTop: 50,
    btnPositionRight: 3,
    autoClose: true,
    autoCloseTime: 10,
    hasBackdrop: true
};

export default PopModal;