import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import Query from '@gql/Query';
import {getOneDayCommend} from '@/query';
import BoxModel from '@proje/BoxModel';

const loadingProps = {
    avatar: false,
}

function TodayCommend (props) {
    return (
        <Query query={getOneDayCommend} loadingType="s" loadingProps={loadingProps}>
            { ({data, refetch, client}) => {
                let dataList = null;
                if (isNotEmpty(data.oneDayCommend)) { // 有结果
                    dataList = data.oneDayCommend;
                } else {
                    if (isNotEmpty(client.cache.data)) { // 没结果，有缓存
                        dataList = Object.keys(client.cache.data.data)
                            .filter(k => k.includes('oneDayCommend'))
                            .map(k => client.cache.data.data[k]);
                    } else {    // 重新查询
                        refetch();
                        return;
                    }
                }
                return (
                    <BoxModel message="今日推荐"
                        icon={<TodayIcon style={{color: '#FF6666'}}></TodayIcon>}
                        data={dataList}
                        maxNum={8}
                    />
                );
            }}
        </Query>
    );
}

export default TodayCommend;