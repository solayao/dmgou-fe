import React from 'react';
import Proptypes from 'prop-types';
import { Skeleton } from 'antd';
import shortid from 'shortid';

/**
 * 加载占位图
 * @url https://ant.design/components/skeleton-cn/#components-skeleton-demo-list
 * @prop {Boolean} loading 是否显示占位符
 * @prop {Object/Boolean} avatar 头像占位符配置
 * @prop {Object/Boolean} paragraph 段落占位符配置
 * @prop {Object/Boolean} title 标题占位符配置
 * @returns
 */
function SkeletonModel(props) {
    const { children, loading, ...other } = props;
    return (<Skeleton key={shortid.generate()} loading={loading} {...other}>{children}</Skeleton>);
}

SkeletonModel.propTypes = {
    loading: Proptypes.bool.isRequired,
    avatar: Proptypes.oneOfType([Proptypes.bool, Proptypes.object]),
    paragraph: Proptypes.oneOfType([Proptypes.bool, Proptypes.object]),
    title: Proptypes.oneOfType([Proptypes.bool, Proptypes.object]),
};
SkeletonModel.defaultProps = {
    loading: true,
    avatar: true,
    paragraph: true,
    title: true,
};

export default SkeletonModel;