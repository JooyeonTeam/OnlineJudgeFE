<template>
  	<panel :padding="15" class="container">
    <div id = "inputtestcaseDiv">
    <Form id = "formInput" ref="formInput" :model="formInput" :rules="ruleInput">
    		<div id="titleDiv">{{$t('m.InputProblemTitle')}}</div>
    		<p id="descripText">{{$t('m.DescriptionForInputProblem')}}</p>

    		<FormItem prop="problemData" align="center">
    			<textarea id="problemForm" v-model="formInput.problemData" :placeholder="$t('m.InputProblem')" @on-enter="handleInput"/>
    		</FormItem>

    			<!-- <div id = "testcaseimg" style = "padding-bottom: 15px; margin: 0 auto; text-align:left; display:flex;"> -->
    				<img id="sub_img" src="../../../../assets/testcase.svg" style = "display: inline-block;">

          <!-- </div> -->

    		<div id="testcaseDiv" style =" width: 80%; margin: 10px auto; display: flex;">

    			<FormItem prop="inputData" style="display: inline-block; width:30%; flex:1; margin:0px 10%;">
    			<textarea class="testcaseForm" v-model="formInput.inputData" :placeholder="$t('m.Input')" @on-enter="handleInput"style = "width: 100%; height: 80px; font-size: 15px;"></textarea>

    			</FormItem>

				<img id="arrow_img" src="../../../../../static/arrow.svg" style ="height: 50px; flex:1; width=5%;" ></img>

    			<FormItem prop="outputData" style="display: inline-block; width:30%; flex:1; margin:0px 10%;">
    			<textarea class="testcaseForm" v-model="formInput.outputData" :placeholder="$t('m.Output')" @on-enter="handleInput" style = "width: 100%; height: 80px; font-size: 15px;"></textarea>
    			</FormItem>
        <br/>
    		</div>

        <textarea v-for = "item in items">
          {{item.message}}
        </textarea>
        <div id = "app">
          <!-- <my-component  v-for="(item, index) in items" v-bind:item="item"  v-bind:index="index" v-bind:key="item.id"></my-component> -->
          <!-- <Form> -->
          <!-- </Form> -->
        </div>
        <br/>
        <form v-on:submit.prevent="addNewTodo">

          <!-- <input
            v-model="newTodoText"
            id="new-todo"
            placeholder="E.g. Feed the cat"
          > -->
          <div style = "width: 65%; margin: 0 auto; text-align: center;">
          <button id = "addTCbtn" >테스트 케이스 추가</button>
        </div>
        </form>
        <br/><br/><br/>
        <my-component v-for="(item, index) in items"  v-bind:item="item"  v-bind:index="index"  v-bind:key="item.id" ></my-component>

        <div id="todo-list-example">
            <div style = "margin: 0 auto; text-align: center;"
              is="todo-item"
              v-for="(todo, index) in todos"
              v-bind:key="todo.id"
              v-bind:title="todo.title"
              v-on:remove="todos.splice(index, 1)"
            ></div>
        </div>
      <br/><br/>
    	</tbody>
    	</table>
    </Form>
    </div>
    <div class="footer">
      <Button
        type="primary"
        @click="handleInput"
        class="btn" long30
        :loading="btnInputLoading">
        {{$t('m.showAnswercode')}}
      </Button>
    </div>
    </panel>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script>
/* eslint-disable */
  import { mapGetters, mapActions } from 'vuex'
  import api from '@oj/api'
  import Vue from 'vue'
  import { FormMixin } from '@oj/components/mixins'

  Vue.component('todo-item', {
    template: '\
      <div style = \"margin: 0 auto; text-align: center; \">\
        {{ title }}\
        <br/>\
        <Form>\
        <div style = \"margin: 0 auto; display: flex; width: 80%;\">\
        <textarea style = \"display: inline-block; flex:1; margin:0px 10%; border: 2px solid gray; width: 100%; height: 80px;font-size: 15px;\" placeholder =\"Input\"></textarea>\
        <img src = "../../../../../static/arrow.svg" style =\"height: 50px; flex:1; width=5%;\">\
        <textarea style = \"display: inline-block; flex:1; margin:0px 10%;  border: 2px solid gray;width: 100%; height: 80px;font-size: 15px;\" placeholder =\"Output\"></textarea>\
        </div>\
        </Form>\
        <br/>\
        <div style = "width: 82%;">\
        <button v-on:click="$emit(\'remove\')" style = \"float: right\">삭제</button>\
        </div>\
        <br/>\
      </div>\
    ',
    props: ['title']
  })

  export default {
    name: 'InputProblem',
    mixins: [FormMixin],
    // el: '#todo-list-example',
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
        },
        newTodoText: '',
        todos: [
        ],
        nextTodoId: 4
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
      },
      addTC() {
        this.$refs.addtc_img.style.display = "none";

      },
      addNewTodo: function () {
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText
        })
        this.newTodoText = ''
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


  // Vue.component('my-component',{
  //     template:  '<button></button>'
  //   });
  //
  // new Vue({
  //     el: "#app",
  //     div: "#inputtestcaseDiv",
  //     data:{
  //       message: 'click this button'
  //     }
  //   });
  //

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
    display: inline-block;
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
  	// width: 20%;
  	height: 80px;
  	border: 2px solid gray;
  }
  #arrow_img {
  	height: 55px;
  	// width: 15%;
  	margin-bottom: 15px;
  }

  #btns {
  	display: inline;
    width: 65%;
  }

  #addtc_img {
  	margin-top: 7px;
  	margin-left: 65%;
  }

  .btn {
  	width: 150px;
  	font-size: 20px;
  }

  #addTCbtn{

    float: left;

  }
  // //
  // #removeTCbtn{
  //   background-color: "none";
  //   border: none;
  // }
</style>
