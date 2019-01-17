import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/**
 * 滚动的文字Span
 * @class ScrollMess
 * @prop {Number} speed 滚动速度|100
 * @extends {React.Component}
 */
class ScrollMess extends React.Component {
    constructor(props) {
        super(props);
        this.spanRef = React.createRef();
        this.intervalId = null;
    }

    componentDidMount(){
        this.sc(this.spanRef.current);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
        this.spanRef = this.intervalId = null;
    }

    sc(dom) {
        const { speed } = this.props;
        function scroll(self) {
            /*往左*/
            let tmp = (self.scrollLeft)++;
            //当滚动条到达右边顶端时 
            if (Number(self.scrollLeft) === Number(tmp)) {
                self.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + self.innerHTML;
            }
            //当滚动条滚动了初始内容的宽度时滚动条回到最左端 
            if (self.scrollLeft >= self.firstChild.offsetWidth) {
                self.scrollLeft = 0;
            }
        }

        if (dom.scrollWidth > dom.offsetWidth) {   // 判断是否需要滚动
            this.intervalId = setInterval(function () {
                scroll(dom);
            }, speed);
        }
    }

    render() {
        const { children } = this.props;
 
        return (
            <span className="scroll-mess" ref={this.spanRef}>{children}</span>
        )
    }
}

ScrollMess.propTypes = {
    speed: PropTypes.number,    // 速度
};
ScrollMess.defaultProps = {
    speed: 100,
};

export default ScrollMess;