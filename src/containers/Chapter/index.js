import React from 'react';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import {getChapterGallery} from '@/query';
import Query from '@gql/Query';
import LoadingComponent from '@dizzy/LoadingComponent';
import $Snackbar from '@mui/SnackbarModel';
import {socketContext} from '@/store/context';
import BreadModel from './part/bread';

import mStyle from './index.module.scss';

const ModelPc  = React.lazy(() => import("./pc"));
const ModelPhone  = React.lazy(() => import("./phone"));

function QueryLoading () {
    return (
        <div className={mStyle["chapter-bg"]} style={{height: 600}}>
            <LoadingComponent moduleType="ball-spin-fade-loader"/>
        </div>
    )
}

class ChapterComponent extends React.PureComponent {
    constructor (props) {
        super(props);
        
        let {isPhone, history} = props;

        // this.C = isPhone ? ModelPhone : ModelPc;
        this.C = ModelPc;

        this.urlSearch = JSON.parse(sessionStorage.getItem('urlSearch'));

        let {cn, co, ch} = this.urlSearch;

        if (!cn) {
            history.push('/home');
            return;
        } else if (!isNotEmpty(sessionStorage.getItem(`chapterList-${cn}`))) {
            history.push({
                pathname: '/detail',
                search: `cn=${encodeURIComponent(cn)}`
            });
            return;
        }

        this.sessionChapterList = sessionStorage.getItem(`chapterList-${cn}`).split(',');

        this.chapterIdList = this.sessionChapterList.map(s => s.slice(1));

        this.state = {
            socketImgList: null,
            ch,
        }
    }

    componentWillUnMount () {
        this.C = this.urlSearch = 
        this.sessionChapterList = this.chapterIdList = null;
    }

    handleSocket = (socketio, ch) => {
        socketio.emit('fe-crawler-by-ch', ch);

        socketio.on('fe-crawler-by-ch-back', data => {
            this.setState({
                socketImgList: data
            })
        })
    }

    changeChapter = (addIndex) => () => {
        let newIndex = this.chapterIdList.indexOf(this.state.ch) + addIndex;

        let newCh = this.chapterIdList[newIndex];

        let {cn, co} = this.urlSearch;

        this.props.history.replace({
            pathname: '/chapter',
            search: `ch=${newCh}&co=${co}&cn=${cn}`
        });

        this.setState({
            ch: newCh
        });
    }

    render () {
        let {history} = this.props, {socketImgList, ch} = this.state;

        let {cn, co} = this.urlSearch;

        let chapterType = this.sessionChapterList[this.chapterIdList.indexOf(ch)]
            .includes('本') ? '本篇' : '番外';

        return (
            <socketContext.Consumer>
                {socket => (
                    <Query query={getChapterGallery} variables={{id: ch}} loadingType="liner"
                        loadingRender={(<QueryLoading />)}>
                        {({data}) => {
                            let {name, imgList} = data.chapterDetailGallery;
        
                            // if (imgList.length === 0 && !socketImgList) {
                            //     this.handleSocket(socket, ch);
                            //     return (<QueryLoading />);
                            // } else if (socketImgList && socketImgList.length === 0) {
                            //     $Snackbar({
                            //         content: '没有该漫画资源'
                            //     });
                            //     history.go(-1);
                            //     return null;
                            // }

                            return (
                                <div className={mStyle['chapter-root']}>
                                    <div className={mStyle['chapter-bread']}>
                                        <BreadModel cn={cn} name={name} chapterType={chapterType} />
                                    </div>
                                    
                                    <this.C currentCh={ch} chapterList={this.chapterIdList} 
                                        changeChapter={this.changeChapter} 
                                        // imgList={imgList}
                                        />
                                </div>
                            )
                        }}
                    </Query>
                )}
            </socketContext.Consumer>
        );
    }
}

export default ChapterComponent;

