<template>
  	<panel :padding="15" class="container">
    <div>
    <Form ref="formFeedback" :model="formFeedback" :rules="ruleFeedback">
    		<div id="titleDiv">{{$t('m.FeedbackTitle')}}</div>

        <div class="subTitleDiv">{{$t('m.divisionTitle')}}</div>
        <div id="divisionDiv">
          <FormItem prop="divisionData">
            <input type="radio" v-model="formFeedback.divisionData" size="small" id="divisionQuestion" value="divisionQuestion" @on-enter="handleFeedback" />
            <label for="divisionQuestion" class="divisionRadio">{{$t('m.divisionQuestion')}}</label>
            <input type="radio" v-model="formFeedback.divisionData" size="small" id="divisionUncomfortable" value="divisionUncomfortable" @on-enter="handleFeedback" />
            <label for="divisionUncomfortable" class="divisionRadio">{{$t('m.divisionUncomfortable')}}</label>
            <input type="radio" v-model="formFeedback.divisionData" size="small" id="divisionError" value="divisionError" @on-enter="handleFeedback" />
            <label for="divisionError" class="divisionRadio">{{$t('m.divisionError')}}</label>
            <input type="radio" v-model="formFeedback.divisionData" size="small" id="divisionExtra" value="divisionExtra" @on-enter="handleFeedback" />
            <label for="divisionExtra" class="divisionRadio">{{$t('m.divisionExtra')}}</label>
          </FormItem>
        </div>

        <div>
          <div class="subTitleDiv">{{$t('m.divisionContent')}}</div>
          <FormItem prop="contentData">
            <textarea id="contentForm" v-model="formFeedback.contentData" :placeholder="$t('m.DescriptionContent')" @on-enter="handleFeedback"/>
          </FormItem>
        </div>

        <div>
          <div class="subTitleDiv">{{$t('m.select')}}</div>
          <p id="descripText">{{$t('m.DescriptionForSelect')}}</p>
          <FormItem prop="emailData">
            <input type="email" id="emailForm" v-model="formFeedback.emailData" :placeholder="$t('m.DescriptionEmail')" @on-enter="handleFeedback"/>
          </FormItem>
        </div>

    	</tbody>
    	</table>
    </Form>
    </div>

    <div class="footer">
      <Button
        type="primary"
        @click="handleFeedback"
        class="btn" long
        :loading="btnFeedbackLoading">
        {{$t('m.sendBtn')}}
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
    mixins: [FormMixin],
    data () {
      return {
        btnFeedbackLoading: false,
        formFeedback: {
          divisionData: '',
          contentData: '',
          emailData: ''
        },
        ruleFeedback: {
          divisionData: [
            {required: false}
          ],
          contentData: [
            {required: false}
          ],
          emailData: [
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
      handleFeedback () {
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

  .subTitleDiv {
  	font-size: 20px;
  	font-weight: 500;
  	padding-top: 10px;
  	padding-bottom: 25px;
    margin-left: 30%;
  }

  #divisionDiv {
    margin-left: 35%;
    margin-bottom: 0px;
  }

  .divisionRadio {
    font-size: 17px;
    margin-right: 60px;
  }

  #contentForm {
   border: 2px solid gray;
   width: 50%;
   height: 300px;
   font-size: 17px;
   margin-left: 35%;
  }

  #descripText {
  	color: gray;
    margin-left: 35%;
  }

  #emailForm {
    border: 2px solid gray;
    width: 300px;
    font-size: 13px;
    margin-left: 35%;
    margin-top: 15px;
    margin-bottom: 30px;
  }

  .btn {
  	width: 100px;
  	font-size: 20px;
  }
</style>
