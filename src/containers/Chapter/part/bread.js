import React from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function BreadModel (props) {
    let {cn, chapterType, name} = props;
    return (
        <Breadcrumb>
            <Breadcrumb.Item key="back-1">
                <Link to={{
                    pathname: '/detail',
                    search: `cn=${encodeURIComponent(cn)}`
                }}>{cn}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item key="now">{chapterType} {name}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

BreadModel.propTypes = {
    cn: PropTypes.string,
    chapterType: PropTypes.string,
    name: PropTypes.string,
}

export default BreadModel;