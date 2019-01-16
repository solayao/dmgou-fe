import React from 'react';
// import mStyles from './index.module.scss';
// import Divider from '@material-ui/core/Divider';
// import HomeComicList from '@proje/HomeComicList';
import BackTopModel from '@antd/BackTopModel';

const ModelPc  = React.lazy(() => import("./pc"));
const ModelPhone  = React.lazy(() => import("./phone"));

// import OneDayCommend from '@proje/OneDayCommend';
// import Notice from '@proje/Notice';
// import NoticeModel from '@proje/NoticeModel';

// import AnchorModel from '@antd/AnchorModel';

// const onedayCommendQList = ['mx', 'mf', 'hg', 'qx', 'xy', 'jz', 'snv', 'snan'];

function HomeComponent(props) {
    const { isPhone } = props;
    const C = isPhone ? ModelPhone : ModelPc;
    return (
        <React.Fragment>
            {/* <div className={mStyles["Dui-home"]}>
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
            </div> */}
            
            <C {...props} />

            <BackTopModel />

            {/* <div id="home-root">
           

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
            
            </div> */}

          
        </React.Fragment>
    );
}

export default HomeComponent;

