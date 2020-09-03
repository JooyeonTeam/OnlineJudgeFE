<template>
  	<panel :padding="15" class="container">
    <div>
    <Form ref="formTestcase" :model="formTestcase" :rules="ruleTestcase">
    		<div id="titleDiv">{{$t('m.AccuracyTestTitle')}}</div>
    		<p id="descripText">{{$t('m.DescriptionForAccuracyTest')}}</p>

    		<div id="testcaseDiv" style =" width: 80%; margin: 10px auto; display: flex;">
    			<FormItem prop="inputData" style="display: inline-block; width:30%; flex:1; margin:0px 10%;">
    			<textarea class="testcaseForm" v-model="formTestcase.inputData" :placeholder="$t('m.Input')" @on-enter="handleRunTestcase"style = "width: 100%; height: 80px; font-size: 15px;"></textarea>
    			</FormItem>

				<img id="arrow_img" src="../../../../assets/arrow.svg" style ="height: 50px; flex:1; width=5%;" ></img>

    			<FormItem prop="outputData" style="display: inline-block; width:30%; flex:1; margin:0px 10%;">
    			<textarea class="testcaseForm" v-model="formTestcase.outputData" :placeholder="$t('m.Output')" @on-enter="handleRunTestcase" style = "width: 100%; height: 80px; font-size: 15px;"></textarea>
    			</FormItem>
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
        btnTestcaseLoading: false,
        formTestcase: {
          inputData: '',
          outputData: ''
        },
        ruleTestcase: {
          inputData: [
            {required: false}
          ],
          outputData: [
            {required: false}
          ]
        }
      }
    },
    methods: {
      ...mapActions(['changeModalStatus', 'getProfile']),
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
  }

  .testcaseForm {
  	width: 20%;
  	height: 80px;
  	border: 2px solid gray;
  }
  #arrow_img {
  	height: 55px;
  	width: 15%;
  	margin-bottom: 15px;
  }

  .btn {
  	width: 120px;
  	font-size: 20px;
    margin-top: 50px;
  }
</style>
