import React from 'react';
import {inject} from 'mobx-react';
import shortid from 'shortid';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import mStyles from './index.module.scss';
import LoadingComponent from '@dizzy/LoadingComponent';
import LozadWrapper from '@dizzy/LozadWrapper';
import Query from '@gql/Query';
import {getChapterGallery} from '@/gqls';
import Scroll from '@phone/Scroll';

import $Dialog from '@mui/DialogModel';
import $Snackbar from '@mui/SnackbarModel';
import Button from '@material-ui/core/Button';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import DescriptionIcon from '@material-ui/icons/Description';

@inject(stores => ({
    setToolbarsForPhone: stores.store.setToolbarsForPhone
}))
class ChapterPhone extends React.Component {
    constructor(props) {
        super(props);
        this.boxWidth = null;
        this.urlSearch = JSON.parse(sessionStorage.getItem('urlSearch'));
        this.state = {
            ch: this.urlSearch.ch,
        };

        if (!props.isPhone) this.isNotPhoneRedice();
    }

    componentWillMount () {
        this.boxWidth = document.getElementsByClassName('ignore')[0].clientWidth - 10;
        this.props.setToolbarsForPhone([
            <p onClick={this.handlePullDown}><ExposureNeg1Icon /></p>,
            <p onClick={this.handlePullUp}><ExposurePlus1Icon /></p>,
            <p onClick={this.handleBackToDes}><DescriptionIcon /></p>
        ]);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.isPhone !== this.props.isPhone && !nextProps.isPhone) {
            this.isNotPhoneRedice();
        }
    }
    
    componentWillUnmount () {
        this.urlSearch = null;
        this.props.setToolbarsForPhone([]);
    }

    isNotPhoneRedice = () => {
        const {ch} = this.state;
        const {cn, co} = this.urlSearch;
        this.props.history.push({ 
            pathname: '/chapter', 
            search: `ch=${ch}&co=${co}&cn=${cn}`, 
        });
        return false;
    }

    showDialog = (contentText, indexChange = 0) => {
        const {cn, co} = this.urlSearch, {ch} = this.state;
        const chapterList = sessionStorage.getItem(`chapterList-${cn}`)
            .split(',').map(s => s.slice(1));
        const chapterIndex = parseInt(chapterList.indexOf(ch), 10);
        const newIndex = chapterIndex + indexChange;
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
                        // that.handleClose();
                        $Dialog().destory();
                        let replaceCh = chapterList[newIndex];
                        this.props.history.replace({
                            pathname: '/chapterPhone',
                            search: `ch=${replaceCh}&co=${co}&cn=${cn}`
                        });
                        this.setState({
                            ch: replaceCh
                        })
                    },
                },
                {
                    node: (props) => (<Button {...props}>取消</Button>),
                    onClick: (that) => {
                        // that.handleClose()
                        $Dialog().destory();
                    },
                },
            ],
        });
    }

    handlePullDown = () => this.showDialog('将要阅读上一章漫画，请确认', -1);

    handlePullUp = () => this.showDialog('将要阅读下一章漫画，请确认', 1);

    handleBackToDes = () => {
        const { history } = this.props, {cn} = this.urlSearch;
        history.push({
            pathname: '/detail',
            search: `cn=${encodeURIComponent(cn)}`
        });
    }

    renderLoading = (
        <div
            className={mStyles["Dui-chapter-bg"]}
            style={{
                height: 600
            }}><LoadingComponent moduleType="ball-spin-fade-loader"/></div>
    )

    render() {
        const { history } = this.props, {cn} = this.urlSearch, {ch} = this.state;
        const sessionChapterList = sessionStorage.getItem(`chapterList-${cn}`).split(',');
        const chapterList = sessionChapterList.map(s => s.slice(1));
        const chapterType = sessionChapterList[chapterList.indexOf(ch)]
            .includes('本') ? '本篇' : '番外';
        return (
            <div className={mStyles["Dui-chapter-phone"]}>
                <Query query={getChapterGallery} variables={{id:ch}} loadingType="liner"
                    loadingRender={this.renderLoading}
                >
                    {({data}) => {
                        const {chapterDetailGallery} = data;
                        const {name, imgList} = chapterDetailGallery;
                        if (imgList.length === 0) {
                            $Snackbar({
                                content: '没有该漫画资源'
                            });
                            history.go(-1);
                            return null;
                        }
                        return (
                            <React.Fragment>
                                <div className={mStyles["Dui-chapter-bread"]}>
                                    <Breadcrumb>
                                        <Breadcrumb.Item key="back-1">
                                            <Link to={{
                                                pathname: '/detail',
                                                search: `cn=${encodeURIComponent(cn)}`
                                            }}>{cn}</Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item key="now">{chapterType} {name}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>

                                <Scroll key={shortid.generate()} updateScrollToTop={true}
                                    pullDownFunc={this.handlePullDown} pullUpFunc={this.handlePullUp}
                                    height={this.boxWidth*1.45}>
                                    <ul className={mStyles["Dui-chapter-phone-imgList"]}>
                                        {
                                            imgList.map((src, index) => (
                                                <li key={index} style={{
                                                    minHeight: this.boxWidth,
                                                    height: 'auto'
                                                }}>
                                                    <LozadWrapper 
                                                        src={src+`?w=${this.boxWidth}&h=0&q=100`}
                                                        alt={'第'+index+'张'}
                                                    />
                                                </li>
                                            ))
                                        }
                                    </ul> 
                                </Scroll>
                            </React.Fragment>
                        )}
                    }
                </Query>    
            </div>
        )
    }
}

ChapterPhone.propTypes = {};
ChapterPhone.defaultProps = {};

export default ChapterPhone;