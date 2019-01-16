import React from 'react';
import mStyles from './index.module.scss';
import Divider from '@material-ui/core/Divider';
import HomeComicList from '@proje/HomeComicList';
import BackTopModel from '@antd/BackTopModel';
import OneDayCommend from '@proje/OneDayCommend';
import Notice from '@proje/Notice';
import NoticeModel from '@proje/NoticeModel';
import BoxHeader from '@proje/BoxHeader';
import WhatShotIcon from '@material-ui/icons/Whatshot';
import AnchorModel from '@antd/AnchorModel';

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

            <div  id="home-root">
            <BoxHeader message="今日推荐"
                    icon={<WhatShotIcon></WhatShotIcon>}
                    action={<span>操作</span>}>
                    <p id="test1">fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>

                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p id="test2">fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>
                    <p>fdsfhdsklfjasklfjdsklfjsdklfjdskfjdskjfkdslfjkdsljfdskljflksjfkdsljfkdsljfakdsljfkldsjfkldsjflksdjfklasjfkldsjfkldsjfkldsjfkldsjfkldsjfkldsjkfljdsklfjsdklfj</p>

                </BoxHeader>

                <AnchorModel
                    aList={[
                        {href: '#test1', title: '测试哦'},
                        {href: '#test2', title: '测试哦2'}
                    ]}
                    anchorProps={{
                        onClick: (e) => {
                            setTimeout(() => {
                                window.scrollTo(0, document.documentElement.scrollTop - 100);
                            }, 500)
                            
                        }
                    }}
                />
            
            </div>

          
        </React.Fragment>
    );
}

export default HomeComponent;

