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
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateScrollToTop) {
            this.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        this.scroll = this.wrapperRefs = null;
    }

    initScroll = () => {
        if (!this.scroll) {
            this.scroll= new BScroll(this.wrapperRefs.current, {
                pullDownRefresh: {
                    threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                },
                pullUpLoad: {
                    threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                },
                click: true,
            });
            this.pullUp();
            this.pullDown();
        } else {
            this.scroll.refresh();
        }
        this.scrollTo(0, 0);
    }

    pullUp = () => {
        this.scroll.on('pullingUp', () => {
            new Promise(async (resolve, reject) => {
                if (this.props.pullUpFunc) resolve( await this.props.pullUpFunc());
                resolve(null);
            })
            .then((newData) => {
                // 在刷新数据完成之后，调用 finishPullUp 方法
                this.scroll.finishPullUp();
                this.refresh();
            });
        });
    }

    pullDown = () => {
        this.scroll.on('pullingDown', () => {
            new Promise(async (resolve, reject) => {
                if (this.props.pullDownFunc) resolve( await this.props.pullDownFunc());
                resolve(null);
            })
            .then((newData) => {
                // console.log(newData)
                // 在刷新数据完成之后，调用 finishPullDown 方法
                this.scroll.finishPullDown();
                this.refresh();
            });
        });
    }

    refresh = () => {
        this.scroll.refresh();
    }

    scrollTo = (x, y) => {
        if (!this.scroll) {
            this.initScroll();
        }
        this.scroll.scrollTo(x, y, 1000);
        if(x === 0 && y === 0) {
            this.scroll.finishPullDown();
            this.refresh();
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
};
ScrollModel.defaultProps = {
    height: 500,
    updateScrollToTop: false,
};

export default ScrollModel;