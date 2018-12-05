import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import KeyboardTab from '@material-ui/icons/KeyboardTab';
import RowGallery from '@mui/RowGallery';
import LoadingComponent from '@dizzy/LoadingComponent';
import NoWrapTypography from '@mui/NoWrapTypography';
import ChapterImage from '@proje/ChapterImage';
import {getChapterGallery} from '@/gqls';
import Query from '@gql/Query';
import mStyles from './index.module.scss';
import $Snackbar from '@mui/SnackbarModel';
import io from 'socket.io-client';

const Fragment = React.Fragment;

class ChapterToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            ch: props.ch,
        }
        this.chapterList = sessionStorage.getItem(`chapterList-${props.cn}`)
            .split(',').map(s => s.slice(1));
        this.noWrapTypoProp = {
            typographyProps: {
                variant: 'h6',
                align: 'left'
            },
            toolTipProps: {
                placement: 'top'
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({checked: false})
        }, 3000);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ch !== this.state.ch) {
            this.setState({
                ch: nextProps.ch,
            })
        }
    }

    componentWillUnmount() {
        this.chapterList = this.noWrapTypoProp = null;
    }

    handleChangeBarCheck = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    handleChangeNSThis = (event) => this.props.handleChangeNS(event.target.value)

    handleChangeChThis = (val) => () => this.props.handleChangeCh(val)

    render() {
        const {cn, co, name, imgNo, imgList} = this.props;
        const {checked, ch} = this.state;
        const chapterList = this.chapterList;
        const chapterIndex = chapterList.indexOf(ch);
        return (
            <Fragment>
                <Slide
                    direction="left"
                    in={checked}
                    mountOnEnter
                    unmountOnExit>
                    <div className={mStyles["Dui-chapter-toolbar"]}>
                        <NoWrapTypography {...this.noWrapTypoProp}>{`${cn} -- ${name}`}</NoWrapTypography>
                        <Typography component="div" align="left">
                            翻页：
                            <NativeSelect value={imgNo} onChange={this.handleChangeNSThis}>
                                {
                                    imgList.map(
                                        (url, index) => (<option key={url} value={index + 1}>第{index + 1}页</option>)
                                    )
                                }
                            </NativeSelect>
                        </Typography>
                        <Typography component="div" align="left">
                            {chapterIndex > 0 &&
                                (<Link to={{
                                    pathname: '/chapter',
                                    search: `ch=${chapterList[chapterIndex-1]}&co=${co}&cn=${cn}`}}
                                    onClick={this.handleChangeChThis(chapterList[chapterIndex-1])}
                                    style={{marginRight: '10px'}}
                                    >上一章</Link>)}
                            {chapterIndex < chapterList.length - 1 &&
                                (<Link to={{
                                    pathname: '/chapter',
                                    search: `ch=${chapterList[chapterIndex+1]}&co=${co}&cn=${cn}`}}
                                    onClick={this.handleChangeChThis(chapterList[chapterIndex+1])}
                                    >下一章</Link>)}
                        </Typography>
                    </div>
                </Slide>
                <div className={mStyles["Dui-chapter-toolbar-btn"]}>
                    <Button
                        variant="text"
                        color="primary"
                        aria-label={checked ? '收起' : '展开'}
                        onClick={this.handleChangeBarCheck}>
                        {checked ? <KeyboardTab/> : <KeyboardBackspaceIcon/>}
                    </Button>
                </div>
            </Fragment>
        )
    }
}

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.urlSearch = JSON.parse(sessionStorage.getItem('urlSearch'));
        this.state = {
            imgNo: 1,
            ch: this.urlSearch.ch,
            socketImgList: null
        }
        this.sessionChapterList = sessionStorage.getItem(`chapterList-${this.urlSearch.cn}`).split(',');
        this.chapterList = this.sessionChapterList.map(s => s.slice(1));
        if (props.isPhone) this.isPhoneRedice();
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps.isPhone && nextProps.isPhone !== this.props.isPhone) {
            this.isPhoneRedice();
       }
    }

    componentWillUnmount() {
        this.sessionChapterList = this.chapterList = this.urlSearch = null;
    }

    isPhoneRedice = () => {
        const {ch} = this.state;
        const {cn, co} = this.urlSearch;
        this.props.history.push({ 
            pathname: '/chapterPhone', 
            search: `ch=${ch}&co=${co}&cn=${cn}`, 
        });
        return false;
    }

    handleGalleryItemClick = (title) => /(\d+)/.test(title) && this.setState({imgNo: RegExp.$1})

    handleChangeImagePage = (num) => this.setState({imgNo: num})

    handleChangeNS = (val) => this.setState({imgNo: val})

    handleChangeCh = (ch) => this.setState({ch, imgNo: 1, socketImgList: null})

    handleSocket = (ch) => {
        const socketio = io(process.env.REACT_APP_SOCKETIO_PATH);
        socketio.emit('addMQ-crawlerCH', ch)
        socketio.on('finishMQ-crawlerCH', data => {
            this.setState({
                socketImgList: data
            }, () => {
                socketio.close();
            })
        })
    }

    renderQueryLoading = () => (
        <div className="Dui-chapter-bg" style={{height: 600}}>
            <LoadingComponent moduleType="ball-spin-fade-loader"/>
        </div>
    )

    getGalleryList = imgList => imgList.map((url, index) => ({
        img: url + '?w=100&h=150&q=50',
        srcset: url + '?w=100&h=150&q=50',
        title: `第${index + 1}页`
    }))

    render() {
        const {imgNo, ch, socketImgList} = this.state, {history} = this.props, {cn, co} = this.urlSearch;
        const chapterType = this.sessionChapterList[this.chapterList.indexOf(ch)]
            .includes('本') ? '本篇' : '番外';
  
        return (
            <Query query={getChapterGallery} variables={{id: ch}} loadingType="liner"
                loadingRender={this.renderQueryLoading()}
            >{({data}) => {
                    const {chapterDetailGallery} = data;
                    const {name, imgList} = chapterDetailGallery;
                    let imgResource = imgList;
                    if (imgList.length === 0 && !socketImgList) {
                        this.handleSocket(ch);
                        return this.renderQueryLoading();
                    }
                    if (socketImgList && socketImgList.length === 0) {
                        $Snackbar({
                            content: '没有该漫画资源'
                        });
                        history.go(-1);
                        return null;
                    }
                    if (socketImgList && socketImgList.length > 0) {
                        imgResource = socketImgList;
                    }
                    return (
                        <div className={mStyles["Dui-chapter"]}>
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
                    
                            <div className={mStyles["Dui-chapter-bg"]}>
                                <ChapterImage
                                    imgUrlList={imgResource}
                                    showImgNo={parseInt(imgNo, 10)}
                                    changePageNum={this.handleChangeImagePage}
                                />
                            </div>
                        
                            <RowGallery
                                tileList={this.getGalleryList(imgResource)}
                                cols={3.5}
                                itemClick={this.handleGalleryItemClick}
                            />

                            <ChapterToolBar 
                                cn={cn}
                                ch={ch}
                                co={co}
                                name={`${chapterType} ${name}`}
                                imgNo={imgNo}
                                imgList={imgResource}
                                handleChangeNS={this.handleChangeNS}
                                handleChangeCh={this.handleChangeCh}
                            />
                        </div>
                    )
                }
            }
            </Query>
        )
    }

}

Chapter.propTypes = {};
Chapter.defaultProps = {};

export default Chapter;