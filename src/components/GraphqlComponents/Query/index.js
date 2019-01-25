import React from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {getPrototypeType} from 'dizzyl-util/lib/type';
import LoadingLiner from '../../MaterialComponents/LoadingLinear';
import LoadingCircular from '../../MaterialComponents/LoadingCircular';
import SkeletonModel from '../../AntdComponents/SkeletonModel';

/**
 * React-Apollo的Query模块封装
 * @param {*} props
 * @prop {Function} children (data) => Node
 * @prop {*} ...queryProps 其他Query的属性
 * @prop {String} loadingType Loading的类型 ['l'|'liner'|'c'|'circular'|'s'|'skeleton']
 * @prop {Object} loadingProps Loading模块属性
 * @prop {Node} loadingRender Loading等待时候需要展示的控件
 * @returns
 */
function QueryModel(props) {
    let { children, loadingType, loadingProps, loadingRender, ...queryProps } = props;
    if (getPrototypeType(children) !== 'Function') {
        console.error('[Error] Query模块的children应该是一个Function');
        return null;
    }
    return (
        <Query {...queryProps}>
            { resultProps => {
                let {error, loading} = resultProps, {skip} = queryProps;
                let LoadModel = null;
                if (['l','liner'].includes(loadingType)) LoadModel = LoadingLiner;
                if (['c','circular'].includes(loadingType)) LoadModel = LoadingCircular;
                if (['s','skeleton'].includes(loadingType)) LoadModel = SkeletonModel;

                return (
                    <LoadModel loading={loading&&!skip} {...loadingProps}>
                        {loading && !!loadingRender && (loadingRender)}
                        {error && (<span>'查询失败'</span>)}
                        {!loading && !skip && !error && (children(resultProps))}
                    </LoadModel>
                );
            }}
        </Query>
    );
}

QueryModel.propTypes = {
    loadingType: PropTypes.string,
    loadingProps: PropTypes.object,
    loadingRender: PropTypes.node,
}
QueryModel.defaultProps = {
    loadingType: 'circular',
    loadingProps: {},
    loadingRender: null,
}

export default QueryModel;
