<template>
    <div class="loading"><van-loading type="spinner" color="#fff" /></div>
</template>

<script>
export default {
    name: 'loading',
    data() {
        return {};
    },
    props: {
        isLoading: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" scoped>
.loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
}
</style>
