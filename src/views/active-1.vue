<template>
    <div class="main">
        <img class="bg-iamge" src="../assets/background1.png">

        <div class="fiexd-box">
            <img class="button-iamge" @click="changeIndex(2)" src="../assets/button1.png">
            <img class="button-iamge" @click="changeIndex(3)" src="../assets/button1.png">
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        changeIndex(index) {
            this.$store.commit("SET_INDEX", index)
            this.$store.commit("SET_QUESTION_INDEX", 0)
        }
    }
}
</script>


<style lang="scss" scoped>
@function rem($n){
  @return $n/(200)+rem;
}

.main{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.bg-iamge{
    width: rem(750);
    min-height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    // top: 50%;
    // transform: translateY(-50%);
}

.fiexd-box{
    width: 100vw;
    height: rem(244 * 750 / 1080);
    justify-content: center;
    display: flex;
    position: fixed;
    bottom: rem(100 * 750 / 1080);
    .button-iamge {
        height: rem(244 * 750 / 1080);
        margin: 0 rem(140);
    }
}

</style>