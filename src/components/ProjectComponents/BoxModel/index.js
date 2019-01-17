import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import mStyles from './index.module.scss';
import BoxList from '@proje/BoxList';
import {isPhoneContext} from '@/store/context';

function BoxModel (props) {
    const {icon, message, action, data, maxNum} = props;

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
                <isPhoneContext.Consumer>
                    {isPhone => (
                        <BoxList dataArr={data} maxNum={maxNum} isPhone={isPhone} />
                    )}
                </isPhoneContext.Consumer>
            </div>
        </section>
    )
}

BoxModel.propTypes = {
    icon: Proptypes.node.isRequired,
    message: Proptypes.string.isRequired,
    action: Proptypes.node,
    data: Proptypes.array.isRequired,
    maxNum: Proptypes.number,
};
BoxModel.defaultProps = {
    data: [],
    maxNum: 4
};

export default BoxModel;