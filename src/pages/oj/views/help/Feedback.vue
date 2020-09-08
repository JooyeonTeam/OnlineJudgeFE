<template>
  	<panel :padding="15" class="container">

    		<div id="titleDiv">{{$t('m.FeedbackTitle')}}</div>
        <div id="descripText">{{$t('m.DescriptionForFeedback')}}</div>

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
        window.open('https://forms.gle/nhJJ8kD3mWxVAQAj8', '_blank');
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
    text-align: center;
  	color: gray;
  }

  .btn {
    margin-top: 50px;
    margin-bottom: 50px;
  	width: 120px;
  	font-size: 20px;
  }
</style>
