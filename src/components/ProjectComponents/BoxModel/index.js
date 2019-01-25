import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import mStyles from './index.module.scss';
import BoxList from '@proje/BoxList';
import BoxHeader from '@proje/BoxHeader';
import {isPhoneContext} from '@/store/context';

function BoxModel (props) {
    let {icon, message, action, data, maxNum} = props;

    return (
        <section className={classNames(mStyles['root'])}>
            <BoxHeader icon={icon} message={message} action={action} />
            
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
    icon: PropTypes.node.isRequired,
    message: PropTypes.string.isRequired,
    action: PropTypes.node,
    data: PropTypes.array.isRequired,
    maxNum: PropTypes.number,
};
BoxModel.defaultProps = {
    data: [],
    maxNum: 4
};

export default BoxModel;