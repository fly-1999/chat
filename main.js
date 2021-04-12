import Vue from 'vue'
import App from './App'
// 引入 weapp.socket.io.js 
// import io from './js_sdk/socket-io/weapp.socket.io.js';
// Vue.prototype.serverUrl='http://localhost:3000';
// Vue.prototype.socket=io('http://localhost:8082')
import io from './js_sdk/hyoga-uni-socket_io/uni-socket.io.js';
Vue.prototype.socket= io('ws://localhost:8081', {
  query: {},
  transports: [ 'websocket', 'polling' ],
  timeout: 5000,
});
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		//挂载
		 store
})
app.$mount()
