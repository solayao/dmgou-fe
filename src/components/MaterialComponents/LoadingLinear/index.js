import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

/**
 * Loading Line线条进度模块
 * @class LoadingLinear
 * @prop {Number} loadSecond 最大等待事件(s) = 120
 * @prop {Boolean} loading 是否在等待
 * @prop {String} style 类型 'fixed' | 'normal'
 * @prop {Object} mUiProps material-Ui的属性 https://material-ui.com/api/linear-progress/
 * @extends {React.Component}
 */
class LoadingLinear extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            completed: 0,
            buffer: 10,
            exit: !props.loading,
        }
    }

    componentDidMount() {
       this.start();
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading && nextProps.loading !== this.props.loading) {
            this.setState({
                completed: 0,
                buffer: 10,
                exit: false,
            }, () => {
                this.start();
            });
        }
        if (!nextProps.loading && nextProps.loading !== this.props.loading) {
            this.finsh();
        }
    }

    start = () => { // 开始Loading
        this.timer = setInterval(this.progress, 500);
        setTimeout(()=> {
            // clearInterval(this.timer);
            // this.timer = null;
            this.finsh();
        }, this.props.loadSecond * 1000);
    }

    finsh = () => { // 完成Loading
        this.setState({
            completed: 100,
            buffer: 100,
        }, () => {
            if (this.timer) clearInterval(this.timer);
            setTimeout(() => {
                this.setState({
                    exit: true
                });
            }, 1 * 1000);
        });
    };

    progress = () => {  // 渐增
        const { completed } = this.state;
        if (completed > 90) {
            // this.setState({ completed: 0, buffer: 10 });
        } else {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
        }
    };

    render() {
        const { children, classes, style, mUiProps } = this.props;
        const { completed, buffer, exit } = this.state;
        
        const Class = classNames({
            [classes.fixTop]: style === 'fixed',
            [classes.normal]: style === 'normal'
        });

        return (
            <div>
                {children}
                {
                    exit ? null :
                    <div className={Class}>
                        <LinearProgress
                            {...mUiProps}
                            value={completed}
                            valueBuffer={buffer}
                        />
                    </div>
                }
            </div>
        )
    }
}

LoadingLinear.propTypes ={
    classes: Proptypes.object,

    loadSecond: Proptypes.number,
    loading: Proptypes.bool,
    style: Proptypes.string,
    mUiProps: Proptypes.object,
};
LoadingLinear.defaultProps = {
    loadSecond: 60,
    loading: true,
    style: 'fixed',
    mUiProps: {
        color: 'secondary',
        variant: 'determinate'
    }
}

const styles = {
    fixTop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100vw',
        zIndex: 9999,
    },
    normal: {
        width: '100%',
    }
};

export default withStyles(styles)(LoadingLinear);