<template>
  	<panel :padding="15" class="container">
    <div>
    <Form ref="formTestcase" :model="formTestcase" :rules="ruleTestcase">
    		<div id="titleDiv">{{$t('m.AccuracyTestTitle')}}</div>
    		<p id="descripText">{{$t('m.DescriptionForAccuracyTest')}}</p>
        <p v-html='code'></p>

    		<div id="testcaseDiv">
    			<textarea class="testcaseForm" v-model="newInput" :placeholder="$t('m.Input')" @on-enter="handleRunTestcase"></textarea>
          <img id="arrow_img" src="../../../../assets/arrow.svg"></img>
          <textarea class="testcaseForm" v-model="newOutput" :placeholder="$t('m.Output')" @on-enter="handleRunTestcase"></textarea>
    		</div>
    	</tbody>
    	</table>
    </Form>
    </div>

    <div class="footer">
      <Button
        type="primary"
        @click="handleRunTestcase"
        class="btn" long
        :loading="btnTestcaseLoading">
        {{$t('m.RunTestcaseBtn')}}
      </Button>

    </div>
    </panel>
</template>

<script>
/* eslint-disable */
  import { mapGetters, mapActions } from 'vuex'
  import api from '@oj/api'
  import { FormMixin } from '@oj/components/mixins'
  export default {
    name: 'AccuracyTest',
    mixins: [FormMixin],
    data () {
      return {
        code: '',
        btnTestcaseLoading: false,
        newInput: '',
        newOutput: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      ...mapActions(['changeModalStatus', 'getProfile']),
      init() {
        this.code = this.$route.params.code
      },
      handleBtnClick (mode) {
        this.changeModalStatus({
          mode,
          visible: true
        })
      },
      handleRunTestcase () {
      }
    },
    computed: {
      ...mapGetters(['website', 'modalStatus']),
      visible: {
        get () {
          return this.modalStatus.visible
        },
        set (value) {
          this.changeModalStatus({visible: value})
        }
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
  	padding-bottom: 25px;
  }

  #descripText {
  	color: gray;
  	text-align: center;
    margin-bottom: 100px;
  }

  #testcaseDiv {
    text-align: center;
    display: inline;
    width: 80%;
    margin: 10px auto;
    display: flex;
  }

  .testcaseForm {
    height: 80px;
  	border: 2px solid gray;
    display: inline-block;
    width:30%;
    flex:1;
    margin:0px 10%;
    font-size: 15px;
  }

  #arrow_img {
    height: 55px;
  	margin-bottom: 15px;
    flex:1;
    width: 15%;
  }

  .btn {
  	width: 120px;
  	font-size: 20px;
    margin-top: 50px;
  }
</style>
