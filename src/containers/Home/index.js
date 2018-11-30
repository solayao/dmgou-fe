import React from 'react';
import mStyles from './index.module.scss';
import Divider from '@material-ui/core/Divider';
import HomeComicList from '@proje/HomeComicList';
import BackTopModel from '@antd/BackTopModel';
import OneDayCommend from '@proje/OneDayCommend';
import Notice from '@proje/Notice';
import NoticeModel from '@proje/NoticeModel';

const onedayCommendQList = ['mx', 'mf', 'hg', 'qx', 'xy', 'jz', 'snv', 'snan'];

function HomeComponent(props) {
    const { isPhone } = props;
    return (
        <React.Fragment>
            <div className={mStyles["Dui-home"]}>
                <div className={mStyles["Dui-home-left"]}>
                    <div className={mStyles["Dui-home-comic-list"]}>
                        <HomeComicList />
                    </div>
                </div>
                {!isPhone &&
                    <div className={mStyles["Dui-home-right"]}>
                        <Notice />
                        <NoticeModel title="每日推荐">
                            <OneDayCommend qList={onedayCommendQList} />
                        </NoticeModel>
                        <Divider />
                    </div>
                }
            </div>

            <BackTopModel />
        </React.Fragment>
    );
}

export default HomeComponent;

