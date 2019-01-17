import React from 'react';
import BackTopModel from '@antd/BackTopModel';

const ModelPc  = React.lazy(() => import("./pc"));
const ModelPhone  = React.lazy(() => import("./phone"));

function HomeComponent(props) {
    const { isPhone } = props;
    const C = isPhone ? ModelPhone : ModelPc;
    return (
        <C {...props} />
    );
}

export default HomeComponent;

