import React from 'react';
import Proptypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const customStyles = {
    overlay: {
        zIndex: 1300
    }
};

/**
 * 图片工具箱
 * @url https://github.com/frontend-collective/react-image-lightbox
 * @param {*} props
 * @prop {Index} currentIndex 默认显示的图片Src的index
 * @prop {Function} createActionFunc 触发显示工具箱的组件
 * @prop {Array} imageList 图片数组
 * @prop {String} srcFormat 渲染的图片需要补充的参数
 * @prop {Boolean} canPrevOrNext 是否能触发上一页或下一页
 */
class ImageActionModel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentIndex: props.currentIndex,
        }
    }

    handleShow = (open) => () => {
        this.setState({
            isOpen: open,
        })
    }
    
    handleChangeSrc = (newIndex) => () => {
        this.setState({
            currentIndex: newIndex,
        })
    }

    getOtherSrc = (currIndex, addIndex) => {
        const {imageList, canPrevOrNext} = this.props;
        let isFirst = currIndex === 0;
        let isLast = currIndex === (imageList.length - 1);
        if (isFirst && addIndex === -1) return undefined;
        if (isLast && addIndex === 1) return undefined;
        if (!canPrevOrNext) return undefined;
        return this.handleSrcFormat(imageList[currIndex+addIndex]);
    } 

    handleSrcFormat = (src) => {
        if (this.props.srcFormat) {
            return `${src}${this.props.srcFormat}`
        }
        return src;
    };

    render() {
        const {createActionFunc, imageList} = this.props,
            {isOpen, currentIndex} = this.state;
        const imageListLength = imageList.length;
        return (
            <React.Fragment>
                {createActionFunc(this.handleShow(true))}
                {isOpen && (
                    <Lightbox
                        reactModalStyle={customStyles}
                        mainSrc={this.handleSrcFormat(imageList[currentIndex])}
                        nextSrc={this.getOtherSrc(currentIndex, 1)}
                        prevSrc={this.getOtherSrc(currentIndex, -1)}
                        onCloseRequest={this.handleShow(false)}
                        onMovePrevRequest={this.handleChangeSrc(
                            (currentIndex - 1 + imageListLength) % imageListLength
                        )}
                        onMoveNextRequest={this.handleChangeSrc(
                            (currentIndex + 1) % imageListLength
                        )}
                    />
                )}
            </React.Fragment>
        )
    }
}

ImageActionModel.propTypes = {
    createActionFunc: Proptypes.func.isRequired,
    currentIndex: Proptypes.number.isRequired,
    imageList: Proptypes.array.isRequired,
    srcFormat: Proptypes.string,
    canPrevOrNext: Proptypes.bool,
};
ImageActionModel.defaultProps = {
    createActionFunc: (showFunc) => { return null; },
    currentIndex: 0,
    imageList: [],
    srcFormat: '',
    canPrevOrNext: true,
};

export default ImageActionModel;