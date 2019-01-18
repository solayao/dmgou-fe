import React from 'react';
import PropTypes from 'prop-types';
import PaginationModel from '@antd/PaginationModel';

function PaginationBtn (props) {
    let handleChangePage = (pageNo, pageSize, preNo) => {
        let pageType = preNo ? (pageNo - preNo) : undefined;

        props.setPapinationProps(pageNo, pageSize, pageType);
    }

    let handleChangeSize = (current, size) =>  {
        props.setPapinationProps(1, size, undefined);
    }

    let {no, total, size} = props;

    let opts = {
        defaultPageSize: 12,
        pageSizeOptions: ['12', '15', '18', '21'],
        pageSize: size,
    };

    return (
        <PaginationModel
            current={no}
            total={total}
            options={opts}
            sizeChangeFunc={handleChangeSize}
            changeFunc={handleChangePage}
        />
    )
}

PaginationBtn.propTypes = {
    setPapinationProps: PropTypes.func.isRequired,
    no: PropTypes.number,
    total: PropTypes.number,
    size: PropTypes.number,
};
PaginationBtn.defaultProps = {
    setPapinationProps: () => {},
};

export default PaginationBtn;