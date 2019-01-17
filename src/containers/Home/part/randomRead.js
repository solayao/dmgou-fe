import React from 'react';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import Query from '@gql/Query';
import {getHomeComicList} from '@/query';
import BoxModel from '@proje/BoxModel';
import mStyle from '../index.module.scss';

const queryVariable = {type: 'random_comic'};

const loadingProps = {
    avatar: false,
}

let refetchFun = () => {};

function RandomRead (props) {
    return (
        <Query query={getHomeComicList} variables={queryVariable}
            fetchPolicy='cache-and-network' loadingType="s" loadingProps={loadingProps}>
            { ({data, refetch, client}) => {
                let dataList = null;
                refetchFun = () => refetch();
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
                    <BoxModel message="随机看看"
                        icon={<AutorenewIcon style={{color: '#FFCC33'}}></AutorenewIcon>}
                        action={(
                            <div className={mStyle['refush']} onClick={refetchFun}>
                                换一批
                            </div>
                        )}
                        data={dataList}
                        maxNum={12}
                    />
                );
            }}
        </Query>
    );
}

export default RandomRead;