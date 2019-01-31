import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import Query from '@gql/Query';
import {getHomeComicList} from '@/query';
import BoxModel from '@proje/BoxModel';

const queryVariable = {type: 'yesterday_update'};

const loadingProps = {
    avatar: false,
}

function YesterdayUpdate (props) {
    return (
        <Query query={getHomeComicList} variables={queryVariable} 
            loadingType="s" loadingProps={loadingProps}>
            { ({data}) => {
                return (
                    <BoxModel message="昨日更新"
                        icon={<TodayIcon style={{color: '#FF6600'}}></TodayIcon>}
                        data={data.comicList}
                        maxNum={12}
                    />
                );
            }}
        </Query>
    );
}

export default YesterdayUpdate;