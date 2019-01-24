import React from 'react';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';
import './index.css';

class ScrollModel extends React.Component {
    constructor (props) {
        super(props);
        this.scroll = null;
        this.wrapperRefs = React.createRef();
    }

    componentDidMount() {
        this.initScroll();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateScrollToTop) {
            this.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        this.wrapperRefs = null;
        this.scroll.destroy();
    }

    initScroll = () => {
        if (!this.scroll) {
            this.scroll= new BScroll(this.wrapperRefs.current, {
                pullDownRefresh: true,
                pullUpLoad: true,
                mouseWheel: {    // pc端同样能滑动
                    speed: 20,
                    invert: false
                },
                useTransition:false,  // 防止iphone微信滑动卡顿
                scrollbar: {
                    fade: true,
                    interactive: false
                },
                startY: this.props.defaultY,
            });
            this.listenPullUp();
            this.listenPullDown();
        } else {
            this.scroll.refresh();
        }
    }

    listenPullUp = () => {
        let _this = this;

        _this.scroll.on('pullingUp', () => {
            let lastMaxScrollY = _this.scroll.maxScrollY;

            new Promise(async (resolve, reject) => {
                if (_this.props.pullUpFunc) await _this.props.pullUpFunc();
                if (_this.props.getLastScrollY) _this.props.getLastScrollY(lastMaxScrollY);
                _this.scroll.finishPullUp();
                resolve();
            }).then(() => {
                // 在刷新数据完成之后，调用 finishPullUp 方法
                if (_this.props.refreshAfterPullFunc) 
                    _this.scroll.refresh();
            });
        });
    }

    listenPullDown = () => {
        let _this = this;
        _this.scroll.on('pullingDown', () => {
            new Promise(async (resolve, reject) => {
                if (_this.props.pullDownFunc) await _this.props.pullDownFunc();
                _this.scroll.finishPullDown();
                resolve();
            }).then(() => {
                // 在刷新数据完成之后，调用 finishPullDown 方法
                if (_this.props.refreshAfterPullFunc) _this.scroll.refresh();
            });
        });
    }

    scrollTo = (x, y) => {
        if (!this.scroll) {
            this.initScroll();
        }
        this.scroll.scrollTo(x, y, 1000);
        if(x === 0 && y === 0) {
            this.scroll.refresh();
        }
    }

    scrollToElement = (el, time = 1000, offsetX = 0, offsetY = 10) => {
        if (!this.scroll) {
            this.initScroll();
        }
        this.scroll.scrollToElement(el, time, offsetX, offsetY);
    }

    render() {
        const {children, height} = this.props;
        return (
            <div className="wrapper" ref={this.wrapperRefs} style={{height: `${height}px`}}>
                {children}
            </div>
        )
    }
};

ScrollModel.propTypes = {
    pullUpFunc: PropTypes.func,
    pullDownFunc: PropTypes.func,
    onRef: PropTypes.func,
    height: PropTypes.number.isRequired,
    updateScrollToTop: PropTypes.bool,
    refreshAfterPullFunc: PropTypes.bool,
    getLastScrollY: PropTypes.func,
    defaultY: PropTypes.number,
};
ScrollModel.defaultProps = {
    height: 500,
    updateScrollToTop: false,
    refreshAfterPullFunc: true,
    defaultY: 0
};

export default ScrollModel;