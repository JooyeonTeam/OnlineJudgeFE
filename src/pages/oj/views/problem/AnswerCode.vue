<template>
  	<panel :padding="15" class="container">
    <div>
    <Form>
    <div id="titleDiv">{{$t('m.AnswerCodeTitle')}}</div>
    		
    		<div id="codeArea">
    		<CodeMirror :value.sync="code"
                    :theme="theme"
                    @resetCode="onResetToTemplate"
                    @changeTheme="onChangeTheme"
                    @changeLang="onChangeLang">
                    </CodeMirror>
                    </div>
    </Form>
    </div>
    
    <div class="footer">
      <Button
        type="primary"
        class="btn">
        {{$t('m.AqquracyTest')}}
      </Button>
      <Button
        type="primary"
        class="btn">
        {{$t('m.Feedback')}}
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
    components: {
      CodeMirror
    },
    mixins: [FormMixin],
    data () {
      return {
        statusVisible: false,
        captchaRequired: false,
        graphVisible: false,
        submissionExists: false,
        captchaCode: '',
        captchaSrc: '',
        problemID: '',
        submitting: false,
        code: '',
        language: 'C++',
        theme: 'solarized',
        submissionId: '',
        submitted: false,
        result: {
          result: 9
        },
        problem: {
          title: '',
          description: '',
          hint: '',
          my_status: '',
          template: {},
          languages: [],
          created_by: {
            username: ''
          },
          tags: [],
          io_mode: {'io_mode': 'Standard IO'}
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      let problemCode = storage.get(buildProblemCodeKey(to.params.problemID))
      if (problemCode) {
        next(vm => {
          vm.language = problemCode.language
          vm.code = problemCode.code
          vm.theme = problemCode.theme
        })
      } else {
        next()
      }
    },
    mounted () {
    },
    methods: {
      ...mapActions(['changeDomTitle']),

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
      onResetToTemplate () {
        this.$Modal.confirm({
          content: this.$i18n.t('m.Are_you_sure_you_want_to_reset_your_code'),
          onOk: () => {
            let template = this.problem.template
            if (template && template[this.language]) {
              this.code = template[this.language]
            } else {
              this.code = ''
            }
          }
        })
      }
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
  
  #titleDiv {
  	text-align: center;
  	font-size: 25px;
  	font-weight: 500;
  	padding-top: 10px;
  	padding-bottom: 20px;
  	line-height: 30px;
  	padding: 5px 15px;
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
  	width: 20%;
  	font-size: 20px;
  	margin-left: 5%;
  	margin-right: 5%;
  }
</style>