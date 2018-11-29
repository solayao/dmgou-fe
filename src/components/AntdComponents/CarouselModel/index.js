import React from 'react';
import Proptypes from 'prop-types';
import { Carousel } from 'antd';
import './index.css';

const defaulConfig = {
    autoplay: true,
    vertical: false,
    lazyLoad: true,
    fade: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
};

/**
 * 走马灯
 * @url https://ant.design/components/carousel-cn/
 * @url https://react-slick.neostack.com/docs/api
 * @prop {Object} config 配置， 参考上url
 * @returns
 */
function CarouselModel (props) {
    const { children, config } = props;

    return (
        <Carousel {...{...defaulConfig, ...config}}>
            {children}
        </Carousel>
    )
}

CarouselModel.propTypes = {
    config: Proptypes.object.isRequired,
};
CarouselModel.defaultProps = {
    config: {},
};

export default CarouselModel;