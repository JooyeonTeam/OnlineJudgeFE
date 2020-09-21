<template>
  	<panel :padding="40" shadow class="container">
    <div>
    <div id="titleDiv">{{$t('m.AnswerCodeTitle')}}</div>
    <p id="descripText">{{$t('m.DescriptionForAccuracyTest')}}</p>
    <br /><br /><br />
    <div id="problem-content" class="markdown-body" v-katex>
      <p class="title">{{$t('m.Description')}}</p>
      <p class="content" v-html='inputData.problemData'></p>
      <p class="title">{{$t('m.Input')}}</p>
      <p class="content" v-html='inputData.inputFormData'></p>
      <p class="title">{{$t('m.Output')}}</p>
      <p class="content" v-html='inputData.outputFormData'></p>

      <p class="content" v-html='inputData.inputData'></p>
      <p class="content" v-html='inputData.outputData'></p>
    </div>

    <div id="codeArea">
      <Card :padding="20" dis-hover>
        <CodeMirror :value.sync="code"
        :language.sync="language"
        :theme="theme"
        @resetCode="onResetToTemplate"
        @changeTheme="onChangeTheme"
        @changeLang="onChangeLang"></CodeMirror>
      </Card>
    </div>
    </div>
    <div class="footer">
      <Button
        type="primary"
        @click="handleInput"
        class="btn" long
        :loading="btnInputLoading">
        {{$t('m.AccuracyTest')}}
      </Button>
    </div>
    </panel>
</template>

<script>
/* eslint-disable */
  import {mapGetters, mapActions} from 'vuex'
  import {types} from '../../../../store'
  import CodeMirror from '@oj/components/CodeMirror.vue'
  import storage from '@/utils/storage'
  import {FormMixin} from '@oj/components/mixins'
  import {JUDGE_STATUS, buildProblemCodeKey} from '@/utils/constants'
  import api from '@oj/api'

  // 只显示这些状态的图形占用
  const filtedStatus = ['-1', '-2', '0', '1', '2', '3', '4', '8']

  export default {
    name: 'AnswerCode',
    components: {
      CodeMirror
    },
    mixins: [FormMixin],
    data () {
      return {
        inputData: {
          problemData: '',
          inputFormData: '',
          outputFormData: '',
          inputData: '',
          outputData: ''
        },
        btnInputLoading: false,
        code: '',
        language: '',
        theme: 'solarized'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      ...mapActions(['changeDomTitle', 'changeModalStatus', 'getProfile']),
      init() {
        this.language = 'Java'
        this.code = this.$route.params.matchedCode
        this.inputData.problemData = this.$route.params.problemData
        this.inputData.inputFormData = this.$route.params.inputFormData
        this.inputData.outputFormData = this.$route.params.outputFormData
        this.inputData.inputData = this.$route.params.inputData
        this.inputData.outputData = this.$route.params.outputData
      },
      handleBtnClick (mode) {
        this.changeModalStatus({
          mode,
          visible: true
        })
      },
      handleInput () {
        this.$router.push({name: 'accuracyTest', params: {'code': this.code}})
      },
      handleRoute (route) {
        this.$router.push(route)
      },
      onChangeLang (newLang) {
        if (this.problem.template[newLang]) {
          if (this.code.trim() === '') {
            this.code = this.problem.template[newLang]
          }
        }
        this.language = newLang
      },
      onChangeTheme (newTheme) {
        this.theme = newTheme
      },
    }
  }
</script>

<style scoped lang="less">
  .container {
    margin-bottom: 20px;

    .content {
      font-size: 16px;
      margin: 0 50px 20px 50px;
      > ul {
        list-style: disc;
        li {
          line-height: 2;
          .title {
            font-weight: 500;
          }
        }
      }
    }
  }

  #problem-content {
    margin-top: -50px;
    .title {
      font-size: 20px;
      font-weight: 400;
      margin: 25px 0 8px 0;
      color: #3091f2;
      .copy {
        padding-left: 8px;
      }
    }
    p.content {
      margin-left: 25px;
      margin-right: 20px;
      font-size: 15px
    }
    .sample {
      align-items: stretch;
      &-input, &-output {
        width: 50%;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        margin-right: 5%;
      }
      pre {
        flex: 1 1 auto;
        align-self: stretch;
        border-style: solid;
        background: transparent;
      }
    }
  }

  #titleDiv {
  	text-align: center;
  	font-size: 25px;
  	font-weight: 500;
  	padding-top: 10px;
  	padding-bottom: 25px;
  }

  #descripText {
  	color: gray;
  	text-align: center;
  }


  #codeArea{
  	padding-top: 10px;
  	padding-bottom: 20px;
  	padding: 50px 50px;
  }

  #answerForm {
  	margin-top: 20px;
   border: 2px solid gray;
   width: 65%;
   height: 500px;
   font-size: 15px;
  }

  .btn {
  	width: 150px;
  	font-size: 20px;
  	margin-left: 5%;
  	margin-right: 5%;
  }
</style>
