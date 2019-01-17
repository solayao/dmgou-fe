import React from 'react';
import lozad from 'lozad';
import shortid from 'shortid';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import ErrorImg from './error.png';
import './index.css';

/**
 * 懒加载图片
 * @url https://github.com/ApoorvSaxena/lozad.js
 * @class LozadWrapper
 * @extends {React.Component}
 * @prop {String} src
 * @prop {String} srcset
 * @prop {String} alt
 * @prop {Array/String} classes
 * @prop {Function} imgErrCB
 */
class LozadWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.img = React.createRef();
        this.state = {
            retry: false,
        }
    }

    componentDidMount() {
        this.imgObserver();
    }

    componentWillUnmount() {
        this.observer = this.img = null;
    }

    imgObserver = () => {
        this.observer = lozad(this.img.current, {
            rootMargin: '10px 0px', // syntax similar to that of CSS Margin
            threshold: 0.1, // ratio of element convergence
            loaded: (el) => {
                // el.src = el.getAttribute('data-src');
            }
        });
        this.observer.observe();
    }

    handleError = (e) => {
        const {src, srcset, imgErrCB} = this.props, {retry} = this.state;
        if (!!this.img && !!this.img.current) {
            if (!retry) {
                this.img.current.setAttribute('src', src);
                this.img.current.setAttribute('srcset', srcset);
                this.img.current.addEventListener('error', this.handleError);
                this.setState({
                    retry: true
                })
            } else {
    
                this.img.current.setAttribute('src', ErrorImg);
                this.img.current.setAttribute('srcset', ErrorImg);
                if (imgErrCB) {
                    imgErrCB()
                }
            }
        } else {
            console.error('获取image实例失败');
        }
    }

    render() {
        const {src, srcset, alt, classes, style} = this.props;
        return (
            <img
                key={shortid.generate()}
                className={classNames(classes)}
                ref={this.img}
                data-src={src}
                data-srcset={srcset}
                data-toggle-class="Dui-lozad-loading"
                alt={alt}
                style={style}
                onError={this.handleError}
            />
        );
    }
}

LozadWrapper.propTypes = {
    src: Proptypes.string.isRequired,
    srcset: Proptypes.string,
    alt: Proptypes.string.isRequired,
    classes: Proptypes.oneOfType([Proptypes.string, Proptypes.array]),
    style: Proptypes.oneOfType([Proptypes.string, Proptypes.object]),
    imgErrCB: Proptypes.func,
}
LozadWrapper.defaultProps = {};

export default LozadWrapper;