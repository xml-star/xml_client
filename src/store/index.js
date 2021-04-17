import Vue from 'vue'
import Vuex from 'vuex'
import da from "element-ui/src/locale/lang/da";
import store from "element-ui/packages/cascader-panel/src/store";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 购物车课程数量
        cart_length: "",
    },
    mutations: {
        // 检测提交的动作
        change_cart(state, data){
            state.cart_length = data.cart_length
            // sessionStorage.cart_length=data.cart_length
            // state.cart_length = sessionStorage.getItem("cart_length")
        },
    }
})
