import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import Query from '@gql/Query';
import {getHomeComicList} from '@/query';
import BoxModel from '@proje/BoxModel';

const queryVariable = {type: 'today_update'};

const loadingProps = {
    avatar: false,
}

function TodayUpdate (props) {
    return (
        <Query query={getHomeComicList} variables={queryVariable}
            fetchPolicy='cache-and-network' loadingType="s" loadingProps={loadingProps}>
            { ({data, refetch, client}) => {
                let dataList = null;
                if (isNotEmpty(data.comicList)) { // 有结果
                    dataList = data.comicList;
                } else {
                    if (isNotEmpty(client.cache.data)) { // 没结果，有缓存
                        dataList = Object.keys(client.cache.data.data)
                            .filter(k => k.includes('comicList'))
                            .map(k => client.cache.data.data[k]);
                    } else {    // 重新查询
                        refetch();
                        return;
                    }
                }
                return (
                    <BoxModel message="今日更新"
                        icon={<TodayIcon style={{color: '#FF6600'}}></TodayIcon>}
                        data={dataList}
                        maxNum={12}
                    />
                );
            }}
        </Query>
    );
}

export default TodayUpdate;