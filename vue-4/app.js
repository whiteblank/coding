import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'i4SRTcD38Ivzjrqv88a6QaGW-gzGzoHsz';
var APP_KEY = 'j9sJO2wnT1pfFyKncqvEJUlx';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//     words: 'Hello World!'
// }).then(function(object) {
//     alert('LeanCloud Rocks!');
// })

var app1 = new Vue({
	el: "#app",
	data: {
		actionType: 'signUp',
		newTodos: '',
		todoList: [],
		formData: {
			username: '',
			password: ''
		},
		username: '',
		currentUser: null
	},
	created: function(){
			var _this = this;
			window.onbeforeunload = function(){
				var dataString = JSON.stringify(_this.todoList);
				window.localStorage.setItem('myTodos',dataString);
				// window.localStorage.setItem('CurInput',_this.newTodos);
			};
			// _this.newTodos = window.localStorage.getItem('CurInput');
			_this.todoList = JSON.parse(window.localStorage.getItem('myTodos'));
			_this.currentUser = this.getCurrentUser();
			if(_this.currentUser){
				_this.username = this.currentUser.username;
			}
		},
	methods: {
		addTodos: function(){
			this.todoList.push({
				title: this.newTodos,
				createdAt: new Date(),
				done: false
			});
			this.newTodos = '';
		},
		removeTodos: function(todo){
			var index = this.todoList.indexOf(todo);
			this.todoList.splice(index,1);
		},
		signUp: function () {
		    let user = new AV.User();
		    user.setUsername(this.formData.username);
		    user.setPassword(this.formData.password);
			user.signUp().then((loginedUser) => { // 👈，将 function 改成箭头函数，方便使用 this
				this.currentUser = this.getCurrentUser() // 👈
			}, (error) => {
				alert('注册失败') // 👈
			});
		},
		logIn: function () {
			var _this = this;
			AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => { // 👈
				this.currentUser = this.getCurrentUser() // 👈
				_this.username = this.currentUser.username;
			}, function (error) {
				alert('登录失败') // 👈
			});
		},
		getCurrentUser: function(){
			let current = AV.User.current();
			// console.log(current);
			if (current) {
				//解构赋值
				let {id, createdAt, attributes: {username}} = current;
			// 上面这句话看不懂就得看 MDN 文档了
			// 我的《ES 6 新特性列表》里面有链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
				// console.log({id, username, createdAt});//[Log] {id: "5883b4d4570c350062bf8703", username: "1", createdAt: Sun Jan 22 2017 03:21:56 GMT+0800 (CST)} (bundle.js, line 142)
				return {id, username, createdAt}; // 看文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0
			} else {
				return null;
			}
		},
		logOut: function(){
			AV.User.logOut();
			this.currentUser = null;
			window.location.reload();
		}
	}
});