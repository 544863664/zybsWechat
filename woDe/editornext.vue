<template>
    <view class="intention">
        <uni-list>
            <uni-list-item title="工作性质" show-badge="true" badge-text="全职"></uni-list-item>
            <uni-list-item title="到岗时间" show-badge="true" badge-text="随时"></uni-list-item>
            <uni-list-item title="期望月薪" show-badge="true" badge-text="6-8k"></uni-list-item>
            <uni-list-item title="期望工作地点" show-badge="true" badge-text="武汉"></uni-list-item>
            <uni-list-item title="职位类别" show-badge="true" badge-text="Java开发"></uni-list-item>
            <uni-list-item title="行业类别" show-badge="true" badge-text="IT"></uni-list-item>
        </uni-list>
        <view class="foot-btn"><van-button type="primary" size="normal" color="#ff8421" @click="save">保存下一步</van-button></view>
    </view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
export default {
    data() {
        return {
        };
    },
    components: {
        uniList,
        uniListItem
    },
    mounted() {},
    methods: {
        save(){
          uni.navigateTo({
              url:"/woDe/editorthree"
          })
        }
    }
};
</script>

<style lang="scss" scoped>
.intention {
    background: #ffffff;
    height: 100%;
    /deep/ .uni-list-item__content-title {
        font-size: 30rpx !important;
        color: #333333 !important;
    }
    /deep/ uni-list-item {
        line-height: 70rpx;
    }
    .foot-btn {
        position: fixed;
        font-weight: bold;
        left: 0;
        bottom: 0;
        width: 100%;
        /deep/ .van-button--normal {
            width: 100%;
            border-radius: 0;
        }
    }
}
</style>
