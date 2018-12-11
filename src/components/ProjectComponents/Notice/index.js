import React from 'react';
import Query from '@gql/Query';
import NoticeModel from '@proje/NoticeModel';
import {getNotice} from '@/query';

let storageKey = 'notice';

function pMess(data) {
    return data.map((mess,index) => <p key={`notice-${index}`}>{mess}</p>);
};

function NoticeQuery() {
    return (
        <Query query={getNotice}>
            { ({data}) => {
                const { getNotice } = data;
                if (sessionStorage) 
                    sessionStorage.setItem(storageKey, JSON.stringify(getNotice));
                return (
                    <NoticeModel title="温馨提醒">
                        {pMess(getNotice)}
                    </NoticeModel>
                )
            }}
        </Query>
    )
}

function Notice() {
    let showList = null;
        
    if (sessionStorage && sessionStorage.getItem(storageKey)) 
        showList = sessionStorage.getItem(storageKey);
    return (
        showList
            ? (
                <NoticeModel title="温馨提醒">
                    {pMess(JSON.parse(showList))}
                </NoticeModel>
            )
            : (<NoticeQuery />)
    )
}

export default Notice;