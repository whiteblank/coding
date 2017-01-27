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
		currentUser: null
	},
	created: function(){

			this.currentUser = this.getCurrentUser();
			this.fetchTodos();
		},
	methods: {
		fetchTodos: function(){
			if(this.currentUser){
				var _this =this;
				// 查询某个 AV.Object 实例，之后进行修改
				var query = new AV.Query('AllTodo');

				// find 方法是一个异步方法，会返回一个 Promise，之后可以使用 then 方法
				query.find()
				.then(function(todo) {
					let allTodos = todo[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
					let id = allTodos.id
					_this.todoList = JSON.parse(allTodos.attributes.content) // 为什么有个 attributes？因为我从控制台看到的
					_this.todoList.id = id
				}, function(error) {
				  //对象保存失败，处理 error
					console.log(error)
				});
			}
		},
		saveTodos: function(){

			var dataString = JSON.stringify(this.todoList);
			var _this = this;
			// 声明一个 Todo 类型
			var AllTodo = AV.Object.extend('AllTodo');
			// 新建一个 Todo 对象
			var allTodo = new AllTodo();

			// 新建一个 ACL 实例
			var acl = new AV.ACL();
			acl.setReadAccess(AV.User.current(),true);
			acl.setWriteAccess(AV.User.current(),true);

			
			allTodo.set('content', dataString);

			// 将 ACL 实例赋予 Post 对象
			allTodo.setACL(acl);
			allTodo.save().then(function(todo) {
				_this.todoList.id = todo.id;
				console.log('保存成功');
			},function (error) {
				alert('保存失败');
			});			
		},
		updateTodos: function(){
			var dataString = JSON.stringify(this.todoList);
			// 第一个参数是 className，第二个参数是 objectId
			var todo = AV.Object.createWithoutData('AllTodo', this.todoList.id);
			// 修改属性
			todo.set('content', dataString);
			// 保存到云端
			todo.save().then(()=>{
				console.log('更新成功')
			})
		},
		saveOrUpdateTodos: function(){
			if(this.todoList.id){
				this.updateTodos();
			}else{
				this.saveTodos();
			}
		},
		addTodos: function(){
			this.todoList.push({
				title: this.newTodos,
				createdAt: new Date(),
				done: false
			});
			this.newTodos = '';
			this.saveOrUpdateTodos()
		},
		removeTodos: function(todo){
			var index = this.todoList.indexOf(todo);
			this.todoList.splice(index,1);
			this.saveOrUpdateTodos()
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
				this.fetchTodos();
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