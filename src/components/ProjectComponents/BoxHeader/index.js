import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import mStyles from './index.module.scss';

function BoxHeader (props) {
    let {icon, message, action, orStyle} = props;
    return (
        <div className={classNames(mStyles['head'], orStyle['head'])}>
            <span className={classNames(mStyles['icon'], orStyle['icon'])}>{icon}</span>
            <div className={classNames(mStyles['ma'], orStyle['ma'])}>
                <span className={classNames(mStyles['message'], orStyle['message'])}>{message}</span>
                <div className={classNames(mStyles['action'], orStyle['action'])}>{action}</div>
            </div>
        </div>
    )
}

BoxHeader.propTypes = {
    icon: PropTypes.node.isRequired,
    message: PropTypes.node,
    action: PropTypes.node,
    orStyle: PropTypes.object,
}
BoxHeader.defaultProps = {
    orStyle: {
        head: '',
        icon: '',
        ma: '',
        message: '',
        action: ''
    }
}

export default BoxHeader;