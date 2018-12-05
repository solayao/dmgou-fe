import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
import WhatShotIcon from '@material-ui/icons/Whatshot';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Typography from '@material-ui/core/Typography';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplitOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import FindReplaceIcon from '@material-ui/icons/FindReplaceOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import shortid from 'shortid';
import {Link} from 'react-router-dom';
import mStyles from './index.module.scss';
import {getHomeComicList} from '@/gqls';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import Query from '@gql/Query';
import IconTabs from '@mui/IconTabs';
import MediaCard from '@mui/MediaCard';
const Fragment = React.Fragment;

const comicMedia = (obj) => {
    const props = {
        layout: 'img-left',
        header: {
            title: (<Typography component="p" variant="subtitle2">{obj.name}</Typography>)
        },
        media: {
            image: obj.icon,
            srcset: obj.icon,
            title: obj.name
        },
        content: {
            children: (<Typography component="p">{obj.last}</Typography>)
        },
        actions: null
    };
    return (
        <ComicLink {...obj} key={shortid.generate()}><MediaCard {...props}/></ComicLink>
    )
};

const comicExpansion = (props) => (
    <ComicLink {...props} key={shortid.generate()}>
        <Paper className={mStyles["Dui-hcl-paper"]} elevation={1}>
            <Typography component="title" className={mStyles["hcl-paper-name"]}>{props.name}</Typography>
            <Typography component="p" className={mStyles["hcl-paper-last"]}>{props.last}</Typography>
        </Paper>
    </ComicLink>
);

const ComicLink = (props) => (
    <Link
        to={{
            pathname: '/detail',
            search: `cn=${encodeURIComponent(props.name)}`
        }}>
        {props.children}
    </Link>
);

class HomeComicList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.tabList = [
            {
                label: '今日更新',
                value: 'today_update',
                icon: <TodayIcon/>
            }, {
                label: '人气热门',
                value: 'hot_comic',
                disabled: true,
                icon: <WhatShotIcon/>
            }, {
                label: '随机看看',
                value: 'random_comic',
                icon: <AutorenewIcon/>
            }
        ];
        this.refetchQuery = null;
        this.state = {
            tag: this.tabList[0].value,
            showListType: 0, // 0为栅格模式，1为列表模式
        }
    }

    componentWillUnmount () {
        this.tabList = this.refetchQuery = null;
    }

    handleChangeTag = (tag) => {
        this.setState({tag})
    };

    handleChangeShowType = (type) => () => {
        this.setState({showListType: type})
    };

    handleChangeRandom = () => {
        if (this.refetchQuery) 
            this.refetchQuery()
    };

    render() {
        const {tag, showListType} = this.state;

        return (
            <Fragment>
                <IconTabs
                    tabList={this.tabList}
                    defaultTab={tag}
                    afterChangeTag={this.handleChangeTag}></IconTabs>

                <div className={mStyles["Dui-hcl-type-button"]}>
                    { tag === 'random_comic'
                        ? <Tooltip title="换一批">
                                <IconButton aria-label="换一批"
                                    onClick={this.handleChangeRandom}>
                                    <FindReplaceIcon/>
                                </IconButton>
                            </Tooltip>
                        : null }
                    <Tooltip title="栅格模式">
                        <IconButton
                            aria-label="栅格模式"
                            color={!showListType ? 'secondary' : 'default'}
                            onClick={this.handleChangeShowType(0)}>
                            <DashboardIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="列表模式">
                        <IconButton
                            aria-label="列表模式"
                            color={showListType ? 'secondary' : 'default'}
                            onClick={this.handleChangeShowType(1)}>
                            <HorizontalSplitIcon/>
                        </IconButton>
                    </Tooltip>
                </div>

                <Query query={getHomeComicList} variables={{type: tag}}
                    fetchPolicy='cache-and-network' loadingType="s">
                    { ({data, refetch, client}) => {
                        let dataList = null;
                        this.refetchQuery = refetch;
                        if (isNotEmpty(data.comicList)) {
                            dataList = data.comicList;
                        } else {
                            if (isNotEmpty(client.cache.data)) {
                                dataList = Object.keys(client.cache.data.data)
                                    .filter(k => k.includes('comicList'))
                                    .map(k => client.cache.data.data[k]);
                            } else {
                                refetch();
                                return;
                            }
                        }
                        return (
                            <div className={!showListType ? mStyles["Dui-hcl-piclist"] : mStyles["Dui-hcl-paperlist"]}>
                                {dataList.map(cO => !showListType ?
                                    comicMedia(cO) : comicExpansion(cO))}
                            </div>
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

HomeComicList.propTypes = {};
HomeComicList.defaultProps = {};

export default HomeComicList;
