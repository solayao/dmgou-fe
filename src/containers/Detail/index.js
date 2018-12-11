import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import shortid from 'shortid';
import {inject, observer} from 'mobx-react';
import mStyles from './index.module.scss';
import ExpansionCard from '@mui/ExpansionCard';
import Query from '@gql/Query';
import { getComicDetail } from '@/query'; 

function Detail(props) {
    const { history, changeSearchInputVal, isPhone } = props;
    const urlSearch = JSON.parse(sessionStorage.getItem('urlSearch'));   
    const cName = decodeURIComponent(urlSearch.cn);

    const handleChipClick = (id, comicId) => () => {
        history.push({ 
            pathname: !isPhone ? '/chapter' : '/chapterPhone', 
            search: `ch=${id}&co=${comicId}&cn=${cName}`, 
        });
    };

    const handleAuthorClick = val => () => {
        changeSearchInputVal(val);
        history.push('/search');
    }

    const chapterCardProps = (comicId, chapterList, type) => ({
        defaultExpanded: true,
        header: (
            <Typography variant="h6" className={mStyles["Dui-detail-chapterTitle"]}>
                {type === 0 ? '主要章节' : '番外章节'}</Typography>
        ),
        content: (
            <div className={mStyles["Dui-detail-chip-content"]}>
                {chapterList.map(c => (
                <Chip
                    key={shortid.generate()}
                    className={mStyles["Dui-detail-chip"]}
                    label={(<Typography component="p">{c.name}</Typography>)}
                    onClick={handleChipClick(c.id, comicId)}
                    variant="outlined"
                />))}
            </div>
        ),
        actions: null,
    });

    return (
        <Query query={getComicDetail} variables={{name: cName}} loadingType="skeleton">
            {({loading, error, data}) =>　{
                const comicDetail = data.comicDetail;
                if (!error && !loading) {
                    sessionStorage.setItem(`chapterList-${cName}`,
                        comicDetail.mainChapter
                            .map(c=>'本'+c.id)
                            .concat(comicDetail.otherChapter.map(c=>'番'+c.id))
                            .toString()
                    );
                }
                return (
                    <div className={classNames(mStyles["Dui-detail-page"], isPhone && mStyles["Dui-detail-page-phone"])}>
                        {isPhone && (
                            <div className={mStyles["Dui-detail-mess-phone"]} style={{
                                backgroundImage: `url(${comicDetail.icon+'?w=300&h=450'})`
                            }}>
                                <img src={comicDetail.icon+'?w=100&h=150'} alt={comicDetail.name} />
                                <div className={mStyles["Dui-detail-mess-info-phone"]}>
                                    <p onClick={handleAuthorClick(comicDetail.author)}>{comicDetail.author}</p>
                                </div>
                            </div>
                        )}

                        <div className={mStyles["Dui-detail-main"]}>
                            <ExpansionCard actions={null}
                                header={(<Typography variant="h5">{comicDetail.name}</Typography>)}
                                content={(<Typography component="p" className={mStyles["Dui-detail-description"]}>{comicDetail.description}</Typography>)}
                            />
                            {comicDetail.mainChapter.length > 0 &&
                                 <ExpansionCard {...chapterCardProps(comicDetail.id, comicDetail.mainChapter, 0)} />}
                            {comicDetail.otherChapter.length > 0 &&
                                 <ExpansionCard {...chapterCardProps(comicDetail.id, comicDetail.otherChapter, 1)} />}
                        </div>

                        {!isPhone && (
                            <div className={mStyles["Dui-detail-mess"]}>
                                <img src={comicDetail.icon+'?w=200&h=300'} alt={comicDetail.name} />
                                <Typography component="p">作&emsp;&emsp;者：{comicDetail.author}</Typography>
                                <Typography component="p">状&emsp;&emsp;态：{comicDetail.state}</Typography>
                                <Typography component="p">分&emsp;&emsp;类：{comicDetail.type}</Typography>
                                <Typography component="p">更新日期：{comicDetail.lastUpdate}</Typography>
                                <Typography component="p">最近更新：{comicDetail.last}</Typography>
                            </div>
                        )}
                    </div>
                );
            }}
        </Query>
    );
}

Detail.propTypes = {};
Detail.defaultProps = {};

export default inject(stores => ({
    changeSearchInputVal: stores.store.changeSearchInputVal,
}))(
    observer(Detail)
);