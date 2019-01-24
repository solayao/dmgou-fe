import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import shortid from 'shortid';
import {inject, observer} from 'mobx-react';
import mStyle from './index.module.scss';
import ExpansionCard from '@mui/ExpansionCard';
import Query from '@gql/Query';
import { getComicDetail } from '@/query'; 

const ModelPc  = React.lazy(() => import("./pc"));
const ModelPhone  = React.lazy(() => import("./phone"));

function DetailComponent(props) {
    let { history, changeSearchInputVal, isPhone } = props;

    let C = isPhone ? ModelPhone : ModelPc;

    let urlSearch = JSON.parse(sessionStorage.getItem('urlSearch'));   

    let cName = decodeURIComponent(urlSearch.cn);

    let handleChipClick = (id, comicId) => () => {
        history.push({ 
            pathname: '/chapter', 
            search: `ch=${id}&co=${comicId}&cn=${cName}`, 
        });
    };

    let handleAuthorClick = val => () => {
        changeSearchInputVal(val);
        history.push('/search');
    }

    let chapterCardProps = (comicId, chapterList, type) => ({
        defaultExpanded: true,
        header: (
            <Typography variant="h6" className={mStyle["detail-chapterTitle"]}>
                {type === 0 ? '主要章节' : '番外章节'}</Typography>
        ),
        content: (
            <div className={mStyle["detail-chip-content"]}>
                {chapterList.map(c => (
                <Chip
                    key={shortid.generate()}
                    className={mStyle["detail-chip"]}
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
                        comicDetail.mainChapter.map(c=>'本'+c.id)
                            .concat(comicDetail.otherChapter.map(c=>'番'+c.id))
                            .toString()
                    );
                }
                return (
                    <div className={classNames(mStyle["detail-page"], isPhone && mStyle["detail-page-phone"])}>
                        <C comicDetail={comicDetail} handleAuthorClick={handleAuthorClick} />

                        <div className={mStyle["detail-main"]}>
                            <ExpansionCard actions={null}
                                header={(<Typography variant="h5">{comicDetail.name}</Typography>)}
                                content={(<Typography component="p" className={mStyle["detail-description"]}>{comicDetail.description}</Typography>)}
                            />
                            {comicDetail.mainChapter.length > 0 &&
                                 <ExpansionCard {...chapterCardProps(comicDetail.id, comicDetail.mainChapter, 0)} />}
                            {comicDetail.otherChapter.length > 0 &&
                                 <ExpansionCard {...chapterCardProps(comicDetail.id, comicDetail.otherChapter, 1)} />}
                        </div>
                    </div>
                );
            }}
        </Query>
    );
}

export default inject(stores => ({
    changeSearchInputVal: stores.store.changeSearchInputVal,
}))(
    observer(DetailComponent)
);