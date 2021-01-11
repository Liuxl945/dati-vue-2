<template>
    <div id="app">

        <div v-if="!loading">
            <active-1 v-if="index === 1"></active-1>
            <active-2 v-if="index === 2"></active-2>
            <active-3 v-if="index === 3"></active-3>
        </div>

        <v-loading v-if="loading" :progress="progress" :tips="loadingTips"></v-loading>
    </div>
</template>

<script>


import Active1 from "./views/active-1"
import Active2 from "./views/active-2"
import Active3 from "./views/active-3"
import Loading from '@/components/loading'

import { Loader } from 'resource-loader'
import { IMAGE_URLS } from '@/assets/js/constants'
import { mapState } from "vuex"

export default {
    data() {
        return {
            progress: 0,
            loading: true,
            loadingTips: "程序加载中",
        }
    },
    components: {
        "active-1": Active1,
        "active-2": Active2,
        "active-3": Active3,
        "v-loading": Loading,
    },
    mounted() {
        let loader = new Loader()

        Object.keys(IMAGE_URLS).forEach(name => {
            loader.add(name, IMAGE_URLS[name])
            console.log(IMAGE_URLS[name])
        })

        loader.onProgress.add(() => {
            this.progress = Math.round(loader.progress)
            console.log(this.progress)
        })

        loader.onComplete.add(() => {
            setTimeout(() => {
                this.loading = false
            }, 500)
        })

        loader.load()
        window.loader = loader
    },
    computed: {
        ...mapState({
            index: state => state.indexState,
        })
    }
}
</script>

<style lang="scss">
html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.layui-m-layer-msg{
    bottom: 0 !important;
}

</style>

<style lang="scss" scoped>
@import url("./assets/scss/reset.scss");

#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
}

</style>

