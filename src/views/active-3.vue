<template>
    <div class="main">
        <img class="bg-iamge" src="../assets/background2.png">

        <div class="back-button" @click="changeIndex(1)">
            <img class="image" src="../assets/back2.png">
        </div>

        <div class="fiexd-box">
            <img class="image" src="../assets/bg2.png">

            <div class="timer">{{time}}</div>

            <div class="now">{{questionIndex + 1}}</div>
            <div class="last">{{lastIndex}}</div>

            <div class="question-wapper">
                <div class="title">
                    {{question2[questionIndex].title}}
                </div>

                <div class="anser-list" v-for="(item,index) in question2[questionIndex].answer" :key="index" @click="selectItem(index)">
                    {{item.name}}
                </div>
            </div>
        </div>

        <audio src="@/assets/error.mp3" ref="error"></audio>
        <audio src="@/assets/right.mp3" ref="right"></audio>
    </div>
</template>

<script>

import { mapState } from "vuex"

export default {
    methods: {
        changeIndex(index) {
            this.$store.commit("SET_INDEX", index)
        }
    },
    data() {
        return {
            time: 60,
            right: 0,
            error: 0
        }
    },
    mounted() {
        this.right = 0
        this.error = 0
        this.active = true
        this.timerFunc()
    },
    beforeDestroy() {
        this.active = false
    },
    methods: {
        timerFunc() {
            // 如果这个页面退出了   清除定时器
            if(!this.active) {
                return
            }

            if(this.time === 0) {

                alert(`答题结束,答对${this.right}题,答错${this.error}题`)

                setTimeout(() => {
                    this.$store.commit("SET_INDEX", 1)
                }, 1000)

                return
            }

            setTimeout(() => {
                this.time--

                this.timerFunc()
            },1000)
        },

        changeIndex(index) {
            this.$store.commit("SET_INDEX", index)
        },
        selectItem(index) {

            if(this.answer) {
                return
            }

            this.answer = true

            if(this.question2[this.questionIndex].answer[index].istrue) {
                this.right ++
                layer.open({
                    content: "答题正确",
                    skin: 'msg',
                    time: 1 // 2秒后自动关闭
                })
                this.$refs.right.play()
            }else {
                this.error ++
                layer.open({
                    content: "答题错误",
                    skin: 'msg',
                    time: 1 // 2秒后自动关闭
                })
                this.$refs.error.play()
            }

            setTimeout(() => {
                
                if(this.questionIndex === this.question2.length - 1) {
                    alert(`答题结束,答对${this.right}题,答错${this.error}题`)
                    this.$store.commit("SET_INDEX", 1)
                    return
                }
                
                this.$store.commit("SET_QUESTION_INDEX", this.questionIndex + 1)
                this.answer = false
            }, 1000)
        }
    },
    computed: {
        lastIndex() {
            return this.question2.length - this.questionIndex - 1
        },
        ...mapState({
            questionIndex: state => state.questionIndex,
            question2: state => state.question2,
        })
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

.back-button{
    width: rem(90 * 750/1080);
    height: rem(90 * 750/1080);
    z-index: 10;
    position: fixed;
    left: rem(40);
    top: rem(40);
    .image{
        width: 100%;
        height: 100%;
    }
}

.fiexd-box{
    width: 100vw;
    height: rem(1338 * 750 / 1080);
    justify-content: center;
    display: flex;
    position: fixed;
    top: rem(40);
    
    .image{
        height: rem(1338 * 750 / 1080);
    }

    .button-iamge {
        height: rem(244 * 750 / 1080);
        margin: 0 rem(140);
    }

    .timer,.now,.last{
        position: absolute;
        color: #ffffff;
        font-size: rem(30);
        font-weight: 600;
        width: rem(60);
    }

    .timer{
        right: rem(70);
        top: rem(276);
        text-align: center;
    }
    .now{
        bottom: rem(26);
        left: rem(336);
    }
    .last{
        bottom: rem(26);
        left: rem(550);
    }

    .question-wapper{
        width: rem(600);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        top: rem(340);
        font-size: rem(30);
        color: #ffffff;

        .title{
            display: flex;
            font-size: rem(36);
            line-height: rem(60);
            justify-content: center;
            margin-bottom: rem(30);
        }

        .anser-list{
            padding-left: rem(20);
            box-sizing: border-box;
            margin-top: rem(15);
            line-height: rem(60);
            background: rgba($color: #000000, $alpha: .5);
        }
    }
}

</style>