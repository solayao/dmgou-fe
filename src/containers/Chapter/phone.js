import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import Scroll from '@phone/Scroll';
import LozadWrapper from '@dizzy/LozadWrapper';
import $Dialog from '@mui/DialogModel';
import $Snackbar from '@mui/SnackbarModel';
import mStyle from './index.module.scss';

class ChapterPhone extends React.PureComponent {
    constructor (props) {
        super(props);

        this.boxWidth = null;

        this.state = {
            ch: props.currentCh
        }
    }

    componentWillMount ()　{
        this.boxWidth = document.getElementById('root').clientWidth - 10;
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.currentCh !== this.state.ch) {
            this.setState({
                ch: nextProps.currentCh
            })
        }
    }

    componentWillUnmount () {
        this.boxWidth = null;
    }

    showDialog = (contentText, indexChange = 0) => {
        let {chapterList, changeChapter} = this.props, {ch} = this.state;
        let chapterIndex = parseInt(chapterList.indexOf(ch), 10);
        let newIndex = chapterIndex + indexChange;
        if (newIndex < 0 || newIndex > chapterList.length - 1) {
            $Snackbar({
                content: '已经没有资源了'
            });
            return;
        }
        $Dialog().create({
            open: true,
            dialogProps: {
                keepMounted: false
            },
            title: '提醒',
            contentText,
            content: null,
            actions: [
                {
                    node: (props) => (<Button color="primary" {...props}>确认</Button>),
                    onClick: (that) => {
                        $Dialog().destory();
                        changeChapter(indexChange)();
                    },
                },
                {
                    node: (props) => (<Button {...props}>取消</Button>),
                    onClick: (that) => {
                        $Dialog().destory();
                    },
                },
            ],
        });
    }

    handlePullDown = () => this.showDialog('将要阅读上一章漫画，请确认', -1);

    handlePullUp = () => this.showDialog('将要阅读下一章漫画，请确认', 1);

    getImgSrcSet = (src) => {
        let src1x = `${src}?w=${this.boxWidth}&h=0&q=100 1x`;
        let src2x = `${src}?w=${this.boxWidth*2}&h=0&q=95 2x`;
        let src3x = `${src}?w=${this.boxWidth*3}&h=0&q=90 3x`;
        return `${src1x}, ${src2x}, ${src3x}`;
    }

    render () {
        let {imgList} = this.props;

        window.scrollTo(0,0);

        return (
            <Scroll key={shortid.generate()} updateScrollToTop={true}
                pullDownFunc={this.handlePullDown} pullUpFunc={this.handlePullUp}
                height={this.boxWidth*1.45}>
                <ul className={mStyle["phone-imgList"]}>
                    {
                        imgList.map((src, index) => (
                            <li key={src} style={{
                                minHeight: this.boxWidth,
                                height: 'auto'
                            }}>
                                <LozadWrapper 
                                    src={src+`?w=${this.boxWidth}&h=0&q=100`}
                                    srcset={this.getImgSrcSet(src)}
                                    alt={'第'+index+'张'}
                                />
                            </li>
                        ))
                    }
                </ul> 
            </Scroll>
        )
    }
}

ChapterPhone.propTypes = {
    imgList: PropTypes.array.isRequired,
    currentCh: PropTypes.string,
    chapterList: PropTypes.array,
    changeChapter: PropTypes.func,
}
ChapterPhone.defaultProps = {
    imgList: [
        '/getImg/overseas/dmzj/img/12/20100109_5320f4f20a8aab8a89a2YDKSyjq8yRZp.jpg',
        '/getImg/domestic/dmzj/img/11/1007321311539747852.jpg',
        '/getImg/overseas/dmzj/img/14/langyuxiangxinliao0119.jpg'
    ]
}

export default ChapterPhone;