import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Loading Circular 环状进度模块
 * @class LoadingLinear
 * @extends {React.Component}
 * @prop {Object} mUiProps material-Ui的属性 https://material-ui.com/api/circular-progress/
 */
function LoadingCircular(props) {
    let { children, mUiProps, classes, loading } = props;

    return (
        <div className={classNames(classes.wrapper, loading && classes.loadingWrapper)}>
            {children}
            {loading && <CircularProgress {...mUiProps} className={classes.progress} />}
        </div>
    );
}

LoadingCircular.propTypes = {
    classes: PropTypes.object,
    mUiProps: PropTypes.object,
    loading: PropTypes.bool,
};
LoadingCircular.defaultProps = {
    loading: true,
    mUiProps: {
        size: 50,
    }
};

const styles = {
    wrapper: {
        flex: 1,
        display: 'inherit',
    },
    loadingWrapper: {
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    }
};

export default withStyles(styles)(LoadingCircular);