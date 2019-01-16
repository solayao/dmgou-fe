import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import mStyles from './index.module.scss';

function BoxHeader (props) {
    const {icon, message, action, children} = props;

    return (
        <section className={classNames(mStyles['root'])}>
            <div className={classNames(mStyles['head'])}>
                <span className={classNames(mStyles['icon'])}>{icon}</span>
                <div className={classNames(mStyles['ma'])}>
                    <span className={classNames(mStyles['message'])}>{message}</span>
                    <div className={classNames(mStyles['action'])}>{action}</div>
                </div>
            </div>
            <div className={classNames(mStyles['body'])}>
                {children}
            </div>
        </section>
    )
}

BoxHeader.propTypes = {
    icon: Proptypes.node.isRequired,
    message: Proptypes.string.isRequired,
    action: Proptypes.node,
};
BoxHeader.defaultProps = {};

export default BoxHeader;