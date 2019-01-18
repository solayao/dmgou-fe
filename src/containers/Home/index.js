import React from 'react';

const ModelPc  = React.lazy(() => import("./pc"));
const ModelPhone  = React.lazy(() => import("./phone"));

function HomeComponent(props) {
    let { isPhone } = props;
    let C = isPhone ? ModelPhone : ModelPc;
    return (
        <C {...props} />
    );
}

export default HomeComponent;

