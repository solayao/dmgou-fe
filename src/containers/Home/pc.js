import React from "react";
import AnchorModel from '@antd/AnchorModel';
import mStyles from './index.module.scss';
import RandomRead from './part/randomRead';
import TodayCommend from './part/todayCommend';
import TodayUpdate from './part/todayUpdate';
import YesterdayUpdate from './part/yesterdayUpdate';

const anchorList = [
    { href: '#tu', title: '今日更新' },
    { href: '#yu', title: '昨日更新' },
    { href: '#tc', title: '今日推荐' },
    { href: '#rr', title: '随机看看' },
]

function HomePc (props) {
    return (
        <div className={mStyles['pc-root']}>
            <div id="tu" className={mStyles['pc-anchor-link']}></div>
            <TodayUpdate />
            <br />
            <div id="yu" className={mStyles['pc-anchor-link']}></div>
            <YesterdayUpdate />
            <br />
            <div id="tc" className={mStyles['pc-anchor-link']}></div>
            <TodayCommend />
            <br />
            <div id="rr" className={mStyles['pc-anchor-link']}></div>
            <RandomRead />

            <div className={mStyles['pc-anchor']}>
                <AnchorModel aList={anchorList} />
            </div>
        </div>
    )
}

export default HomePc;