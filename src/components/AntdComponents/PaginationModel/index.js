import React from 'react';
import PropTypes from 'prop-types';
import {Pagination} from 'antd';

const defaultPageSizeOptions = ['10', '20', '30', '40'];
/**
 * 分页
 * @url https://ant.design/components/pagination-cn/
 * @param {*} props
 * @prop {Function(current, pageSize)} sizeChangeFunc
 * @prop {Function(changPageNo, pageSize, current)} changeFunc
 * @prop {Number} current
 * @prop {Number} total
 * @prop {Object} options
 */
function PaginationModel(props) {
    let { sizeChangeFunc, changeFunc, current, total, options } = props;
    let pageSizeOptions = options.pageSizeOptions || defaultPageSizeOptions;
    let defaultPageSize = options.defaultPageSize || 10;
    let pageSize = options.pageSize || 10;
    let handleChange = (changPageNo, pageSize) => changeFunc(changPageNo, pageSize, current);
    let handleShowTotal = total => `共 ${total} 条`;
    return (
        <Pagination
            showSizeChanger
            showQuickJumper
            onShowSizeChange={sizeChangeFunc}
            onChange={handleChange}
            current={current}
            total={total}
            showTotal={handleShowTotal}
            pageSize={pageSize}
            defaultPageSize={defaultPageSize}
            pageSizeOptions={pageSizeOptions}
        />
    )
}

PaginationModel.propTypes = {
    sizeChangeFunc: PropTypes.func,
    changeFunc: PropTypes.func,
    current: PropTypes.number,
    total: PropTypes.number,
    options: PropTypes.object,
};
PaginationModel.defaultProps = {
    sizeChangeFunc: (current, pageSize) => {},
    changeFunc: (changPageNo, pageSize, current) => {},
    current: 1,
    total: 100,
    options: {},
};

export default PaginationModel;