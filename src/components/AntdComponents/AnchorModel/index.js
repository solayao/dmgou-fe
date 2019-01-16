import React from 'react';
import Proptypes from 'prop-types';
import { Anchor } from 'antd';

const { Link } = Anchor;

/**
 * 锚点
 * @url https://ant.design/components/anchor-cn/#API
 * @prop {Array} aList 锚点数组 [{href, title}]
 * @prop {Object} anchorProps 锚点原生的属性
 * @returns
 */
function AnchorModel (props) {
    const { aList, anchorProps } = props;
    return (
        <Anchor {...anchorProps}>
            {
                aList.map((a, i) => (
                    <Link href={a.href} title={a.title} key={i+'_'+a.title} />
                ))
            }
        </Anchor>
    );
}

AnchorModel.propTypes = {
    aList: Proptypes.array.isRequired,
    anchorProps: Proptypes.object,
};
AnchorModel.defaultProps = {
    aList: [],
    anchorProps: {}
}

export default AnchorModel;