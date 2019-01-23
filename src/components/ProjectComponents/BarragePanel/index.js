import React from 'react';
import PropTypes from 'prop-types';
import mStyle from './index.module.scss';

/**
 * @description 弹幕模块
 * @prop {Array} barrageList 弹幕列表
 * @prop {Number} canvasHeight 画布高度
 * @class BarragePanel
 * @extends {React.PureComponent}
 */
class BarragePanel extends React.PureComponent {
    constructor (props) {
        super (props);

        this.root = React.createRef();

        this.canvas = React.createRef();

        this.timer = null;

        this.SPEEDLIST = [1.5, 2, 3, 4, 5, 6, 7];
    }

    componentDidMount () {
        let {barrageList} = this.props;

        let canvas = this.canvas.current;

        let ctx = canvas.getContext('2d');

        canvas.width = this.root.current.clientWidth;

        canvas.height = this.props.canvasHeight;

        let width = canvas.width;
        //get color of all barrage
        let colorArr = this.getColor();
        //get the initial left for all barrage
        let numArrL = this.getLeft();
        //get the initial top for all barrage
        let numArrT = this.getTop();
        // get speed of all barrage
        let speedArr = this.getSpeed();

        this.timer = setInterval(() => {
            ctx.clearRect(0, 0, width, canvas.height);

            ctx.save();

            for(let j=0; j < barrageList.length; j++){
                numArrL[j] -= speedArr[j];

                ctx.fillStyle = colorArr[j]

                ctx.font = "0.6rem Calibri";

                ctx.fillText(barrageList[j], numArrL[j], numArrT[j]);

                if(numArrL[j] <= -width){
                    numArrL[j] = width;
                }
            }

            ctx.restore();
        }, 15);
    }

    componentWillUnmount () {
        clearInterval(this.timer);

        this.canvas = this.timer = this.SPEEDLIST = null;
    }

    getTop(){
        let {barrageList} = this.props;

        let canvas = this.canvas.current;

        let height = canvas.height;

        let len = barrageList.length;

        let arr = new Array(len).fill(1);

        return arr.map(() => {
            let tagHeight = Math.random() * height;

            if(tagHeight < 0.1*height){
                return 0.1*height
            }

            if(tagHeight > 0.9*height){
                return 0.9*height
            }

            return tagHeight;
        });
    }

    getLeft(){
        let {barrageList} = this.props;

        let canvas = this.canvas.current;

        let width = canvas.width;

        let len = barrageList.length;

        return new Array(len).fill(width);
    }

    getColor(){
        let {barrageList} = this.props;

        let len = barrageList.length;
        //random color
        let arr = new Array(len).fill(1);
        return arr.map(() => {
            return '#'+Math.floor(Math.random()*0xffffff).toString(16);
        });
    }

    getSpeed(){
        let {barrageList} = this.props;

        let len = barrageList.length;
        //random speed
        let arr = new Array(len).fill(1);
        return arr.map((v, i) => {
            let lengthType = 2; // 长度类型： 0短，1中，2长
            if (barrageList[i].length < 8) lengthType = 0;
            else if (barrageList[i].length < 15) lengthType = 1;
            // 每个长度类型3个速度档
            let speedList = this.SPEEDLIST.slice(lengthType * 2, lengthType * 2 + 3);
            let sIndex = parseInt(Math.random() * 3);
            let result = speedList[sIndex];
            lengthType = speedList = sIndex = null;
            return result;
        })
    }

    render () {
        return (
            <div className={mStyle['barrage-root']} ref={this.root}>
                <canvas className={mStyle['barrage-canvas']} ref={this.canvas}></canvas>
            </div>
        )
    }
}

BarragePanel.propTypes = {
    barrageList: PropTypes.array.isRequired,
    canvasHeight: PropTypes.number,
};
BarragePanel.defaultProps = {
    barrageList: [
        '前方大量弹幕来袭，请做好准备！', '2333333', '2333333', '2333333', '2333333', '2333333', 
        '浔阳江头夜送客， 枫叶荻花秋瑟瑟',  '2333333', '2333333', '2333333', '2333333', '2333333', '2333333',
        '主人下马客在船， 举酒欲饮无管弦。', '醉不成欢惨将别， 别时茫茫江浸月', '忽闻水上琵琶声， 主人忘归客不发。', 
        '寻声暗问弹者谁？ 琵琶声停欲语迟。', '移船相近邀相见， 添酒回灯重开宴。', '千呼万唤始出来， 犹抱琵琶半遮面。',
        '转轴拨弦三两声， 未成曲调先有情。', '弦弦掩抑声声思， 似诉平生不得志。', '低眉信手续续弹， 说尽心中无限事。', 
        '轻拢慢捻抹复挑， 初为霓裳后六幺。', '大弦嘈嘈如急雨， 小弦切切如私语。', '嘈嘈切切错杂弹， 大珠小珠落玉盘。', 
        '间关莺语花底滑， 幽咽泉流冰下难。', '冰泉冷涩弦凝绝， 凝绝不通声暂歇。', '别有幽愁暗恨生， 此时无声胜有声。', 
        '银瓶乍破水浆迸， 铁骑突出刀枪鸣。', '曲终收拨当心画， 四弦一声如裂帛。', '东船西舫悄无言， 唯见江心秋月白。', 
        '沉吟放拨插弦中， 整顿衣裳起敛容。', '自言本是京城女， 家在虾蟆陵下住。', '十三学得琵琶成， 名属教坊第一部。', 
        '曲罢曾教善才服， 妆成每被秋娘妒。', '五陵年少争缠头， 一曲红绡不知数。', '钿头银篦击节碎， 血色罗裙翻酒污。', 
        '今年欢笑复明年， 秋月春风等闲度。', '弟走从军阿姨死， 暮去朝来颜色故。', '门前冷落鞍马稀， 老大嫁作商人妇。', 
        '商人重利轻别离， 前月浮梁买茶去。', '去来江口守空船， 绕船月明江水寒。', '夜深忽梦少年事， 梦啼妆泪红阑干。',
        '我闻琵琶已叹息， 又闻此语重唧唧。', '同是天涯沦落人， 相逢何必曾相识！', '我从去年辞帝京， 谪居卧病浔阳城。',
        '浔阳地僻无音乐， 终岁不闻丝竹声。', '住近湓江地低湿， 黄芦苦竹绕宅生。', '其间旦暮闻何物？ 杜鹃啼血猿哀鸣。',
        '春江花朝秋月夜， 往往取酒还独倾。', '岂无山歌与村笛？ 呕哑嘲哳难为听。', '今夜闻君琵琶语， 如听仙乐耳暂明。',
        '莫辞更坐弹一曲， 为君翻作《琵琶行》。', '感我此言良久立， 却坐促弦弦转急。', '凄凄不似向前声， 满座重闻皆掩泣。',
        '座中泣下谁最多？ 江州司马青衫湿。'
    ],
    canvasHeight: 400,
};

export default BarragePanel;