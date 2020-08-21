<template>
  	<panel :padding="15" class="container">
    <div>
    <Form ref="formInput" :model="formInput" :rules="ruleInput">
    		<div id="titleDiv">
    			<img id="title_img" src="../../../../assets/inputCTimg.svg">
    			<p id="descripText">{{$t('m.DescriptionForInputProblem')}}</p>
    		</div>
    		
    		<FormItem prop="problemData" align="center">
    			<textarea id="problemForm" v-model="formInput.problemData" :placeholder="$t('m.InputProblem')" @on-enter="handleInput"/>
    		</FormItem> 		 
    		 
    		<img id="sub_img" src="../../../../assets/testcase.svg">
    		
    		<div id="testcaseDiv"  align="center">
    			<FormItem prop="inputData">
    			<div id="inputDiv">
    			<textarea id="inputForm" class="testcaseForm" v-model="formInput.inputData" :placeholder="$t('m.Input')" @on-enter="handleInput"></textarea>
    			</div>
    			</FormItem>
    			
    			<img id="arrow_img" src="../../../../assets/arrow.svg"></img>
    			
    			<FormItem prop="outputData">
    			<div id="outputDiv">
    			<textarea id="outputForm" class="testcaseForm" v-model="formInput.outputData" :placeholder="$t('m.Output')" @on-enter="handleInput"></textarea>
    			</div>
    			</FormItem>
    		</div>
    		
    		<div id="btns" align="center"> 
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
  import { mapGetters, mapActions } from 'vuex'
  import api from '@oj/api'
  import { FormMixin } from '@oj/components/mixins'

  export default {
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
  }
  
  #title_img {
  	height: 30px;
  }
  
  #sub_img {
  	margin-top: 40px;
  	width: 40%;
  	height: 25px;
  }
  
  #descripText {
  	color: gray;
  }
  
  #problemForm {
  	margin-top: 20px;
   border: 2px solid gray;
   width: 65%;
   height: 300px;
   font-size: 15px;
  }
  
  #testcaseDiv{
  	display: inline;
  }
  
  .testcaseForm {
  	width: 25%;
  	height: 80px;
  	border: 2px solid gray;
  }
  
  #inputDiv {
   display: inline-block;
   display: inline;
   width: 40%;
   }
   
   #outputDiv {
   display: inline-block;
   display: inline;
   width: 40%;
   }
  
  #arrow_img {
  	vertical-align: top;
  	margin-top: 15px;
  	display: inline;
  	height: 50px;
  	width: 15%;
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
