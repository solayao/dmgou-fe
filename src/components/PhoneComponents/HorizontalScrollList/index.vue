<template>
    <ul class="HSL">
        <li class="list-item " v-for="(item,index) in data " data-type="0" :data-id="item.id">
            <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd($event, item)">
                <div class="list-content">
                    <p class="title">{{item.title}}</p>
                    <p class="tips" :style="item.tips?'':'visibility:hidden;'">{{item.tips || '无简介'}}</p>
                    <p class="title-right" :class="item.extraTitleRightClass||''" v-if="item.titleRight">{{item.titleRight}}</p>
                    <p class="tips-right" v-if="item.tipsRight">{{item.tipsRight}}</p>
                </div>
            </div>
            <div class="delete" :class="item.extraDeleteClass||''" :data-index="index" @click="item.deleteFunc ? item.deleteFunc() : ()=>{}">
                <span>{{item.deleteMess || '删除'}}</span>
            </div>
        </li>
    </ul>
</template>
<style lang="less" scoped src="./index.less"></style>

<script>
export default {
    name: 'HorizontalScrollList',
    props: {
        liClickFunc: {
            type: Function,
            default: (event) => { console.log(event.currentTarget.parentElement) },
        },
        data: {
            type: Array,
            default() {
                return [
                      {
                        id: '1',
						title : 'Chrome更新了' ,
						tips : '不再支持Flash视频播放' ,
                        // titleRight : '上午 8:30',
                        extraTitleRightClass: 'titleRigheExtra'
					},
					{
                        id: '2',
						title : '电影新资讯' ,
						// tips : '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观' ,
                        titleRight : '上午 12:00',
                        extraDeleteClass: 'deleteClassExtra'
					},
                    {
                        id: '3',
						title : '聚焦两会·共筑中国梦' ,
						tips : '习近平代表的两会故事' ,
                        titleRight : '下午 17:45',
                        tipsRight: '报告人：刘新宇'
                    },
                    {
                        id: '24',
						title : '微信团队' ,
						tips : '您的帐号有异常登录，如非本人操作，请及时修改密码' ,
						titleRight : '昨天'
                    }
                ];
            }
        },
    },
    data() {
        return ({
            startX : 0 ,
            endX : 0 ,
        });
    },
    methods: {
      //滑动开始
      touchStart(e) {
        this.startX = e.touches[0].clientX;
      },
      //滑动结束
      touchEnd(e, obj) {
        let parentElement = e.currentTarget.parentElement;
        this.endX = e.changedTouches[0].clientX;
        if (this.startX === this.endX) {    // 点击触发
            this.liClickFunc(e);
        }
        if("disable" in obj && obj.disable){
            return;
        }
        if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide() {
        let listItems = document.querySelectorAll('.list-item');
        for (let i = 0; i < listItems.length; i++) {
          if (listItems[i].dataset.type == 1) {
            return true;
          }
        }
        return false;
      },
      //一次只能滑动一个
      restSlide() {
        let listItems = document.querySelectorAll('.list-item');
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].dataset.type = 0;
        }
      },
    }
}
</script>
