import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import mStyle from './index.module.scss';

/**
 * @description 弹出模块
 * @api https://material-ui.com/utils/popper/#scroll-playground
 * @author Dizzy L
 * @class PopperModel
 * @prop {Node} btnNode 触发的按钮
 * @prop {Node} popNode 弹出的内容
 * @prop {Boolean} autoClose 自动隐藏
 * @prop {Number} autoCloseTime 触发自动隐藏时间
 * @prop {String} popPlacement 弹出的位置
 * @prop {Number} positionTop 按钮位置, position: fixed, 单位vh
 * @extends {React.PureComponent}
 */
class PopperModel extends React.PureComponent {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = (event) => {
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          open: !state.open,
        }), () => {
            let {autoClose, autoCloseTime} = this.props;
            if (autoClose && this.state.open) {
                setTimeout(() => {
                    this.setState({
                        open: false
                    });
                }, 1000 * autoCloseTime);
            }
        });
    };

    render () {
        let {anchorEl, open} = this.state,
            {btnNode, popNode, popPlacement, positionTop} = this.props;

        return (
            <React.Fragment>
                <div onClick={this.handleClick} className={mStyle['popper']} 
                    style={{ top: `${positionTop}vh`}}>
                    {btnNode}
                </div>
                <Popper open={open} anchorEl={anchorEl} transition
                    disablePortal={false} placement={popPlacement}>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps}>
                            <Paper>
                                {popNode}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </React.Fragment>
        )
    }
}

PopperModel.propTypes = {
    btnNode: PropTypes.node.isRequired,
    popNode: PropTypes.node.isRequired,
    autoClose: PropTypes.bool,
    autoCloseTime: PropTypes.number,
    popPlacement: PropTypes.string,
    positionTop: PropTypes.number,
};
PopperModel.defaultProps = {
    btnNode: (<Button>弹出窗口</Button>),
    popNode: (<div>内容</div>),
    autoClose: true,
    autoCloseTime: 10,
    popPlacement: 'bottom',
    positionTop: '90',
};

export default PopperModel;