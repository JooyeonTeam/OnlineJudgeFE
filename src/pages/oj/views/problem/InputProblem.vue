<template>
  	<panel :padding="15" class="container">
    <div>
    <Form ref="formInput" :model="formInput" :rules="ruleInput">
    		<div id="titleDiv">{{$t('m.InputProblemTitle')}}</div>
    		<p id="descripText">{{$t('m.DescriptionForInputProblem')}}</p>
    		
    		<FormItem prop="problemData" align="center">
    			<textarea id="problemForm" v-model="formInput.problemData" :placeholder="$t('m.InputProblem')" @on-enter="handleInput"/>
    		</FormItem> 		 
    		
    			<div id = "testcaseimg" style = "padding-bottom: 15px; margin: 0 auto; text-align:left; display:flex;">
    				<img id="sub_img" src="../../../../assets/testcase.svg">
    			</div>
    		
    		<div id="testcaseDiv" style =" width: 80%; margin: 10px auto; display: flex;">
    			
    			<FormItem prop="inputData" style="display: inline-block; width:30%; flex:1; margin:0px 10%;">
    			<textarea class="testcaseForm" v-model="formInput.inputData" :placeholder="$t('m.Input')" @on-enter="handleInput"style = "width: 100%; height: 80px; font-size: 15px;"></textarea>

    			</FormItem>

				<img id="arrow_img" src="../../../../assets/arrow.svg" style ="height: 50px; flex:1; width=5%;" ></img>

    			<FormItem prop="outputData" style="display: inline-block; width:30%; flex:1; margin:0px 10%;">
    			<textarea class="testcaseForm" v-model="formInput.outputData" :placeholder="$t('m.Output')" @on-enter="handleInput" style = "width: 100%; height: 80px; font-size: 15px;"></textarea>
    			</FormItem>
    	
    		</div>
    		
    		<div id="btns" style = "text-align: right;" > 
    			<img id="btn_img" src="../../../../assets/addTC.svg">
    			<img src="../../../../assets/removeTC.svg">
    		</div>
    	</tbody>
    	</table>
    </Form>
    </div>

    <div class="footer">
      <Button
        type="primary"
        @click="handleInput"
        class="btn" long
        :loading="btnInputLoading">
        {{$t('m.showAnswercode')}}
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
    name: 'InputProblem',
    mixins: [FormMixin],
    data () {
      return {
        btnInputLoading: false,
        formInput: {
          problemData: '',
          inputData: '',
          outputData: ''
        },
        ruleInput: {
          problemData: [
            {required: false}
          ],
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
      handleInput () {
        this.$router.push('/answerCode')
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
  
  #sub_img {
  	margin-top: 40px;
  	width: 40%;
  	height: 25px;
  }
  
  #descripText {
  	color: gray;
  	text-align: center;
  }
  
  #problemForm {
  	margin-top: 20px;
   border: 2px solid gray;
   width: 65%;
   height: 300px;
   font-size: 15px;
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
  
  #btns {
  	display: inline;
  }
  
  #btn_img {
  	margin-top: 7px;
  	margin-left: 65%;
  }
  
  .btn {
  	width: 20%;
  	font-size: 20px;
  }
</style>