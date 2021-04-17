<template>
    <div class="header-box">
        <div class="header" style="background-color: darkseagreen">
            <div class="content">
                <div class="logo full-left">
                    <router-link to="/"><img src="/static/image/logo.png" alt="" height="78px"></router-link>
                </div>

                <ul class="nav full-left">
<!--                    <li><span><router-link :to="/header.link">{{ header.title }}</router-link></span></li>-->
                    <li v-for="(header, index) in header_list" :key="index">
                        <span v-if="header.is_site"><a :href="header.link" style="font-size: 40px">{{ header.title }}</a></span>
                        <span v-else><router-link :to="header.link" style="font-size: 20px">{{ header.title }}</router-link></span>
                    </li>
                </ul>
                <!--    用户登录    -->
                <div class="login-bar full-right" v-if="token">
                    <div class="shop-cart full-left">
                        <img src="/static/image/cart.svg" alt="">
                        <span><router-link to="/cart">{{ this.$store.state.cart_length }}购物车</router-link></span>
                    </div>
                    <div class="login-box full-left">
                        <router-link to="/login">个人中心</router-link>
                        &nbsp;|&nbsp;
                        <span @click="logout">退出登录</span>
                    </div>
                </div>
                <!--    用户未登录    -->
                <div class="login-bar full-right" v-else>
                    <div class="shop-cart full-left">
                        <img src="/static/image/cart.svg" alt="">
                        <span><router-link to="/cart">购物车</router-link></span>
                    </div>
                    <div class="login-box full-left">
                        <router-link to="/login">登录</router-link>
                        &nbsp;|&nbsp;
                        <router-link to="/register">注册</router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            header_list: [],
            token:"",
            // cart_length:"",
        }
    },
    methods: {
        // 检查用户是否登录
        // check_user_login() {
        //     let token = localStorage.token || sessionStorage.token;
        //     if (!token) {
        //         let self = this;
        //         this.$confirm("对不起,请登录后再添加购物车", {
        //             callback() {
        //                 self.$router.push("/login");
        //             }
        //         });
        //         return false
        //     }
        //     return token;
        // },
        // 获取轮播图的数据
        get_header() {
            this.$axios.get(this.$settings.HOST + "home/header/").then(response => {
                this.header_list = response.data;
                // console.log(response)
            })
        },
        // 获取用户登录信息
        get_user(){
            this.token = sessionStorage.token;
        },
        logout(){
            sessionStorage.removeItem("token")
            this.$router.go(0)
        },
        // get_cart_length(){
        //     // let cart_length = sessionStorage.cart_length
        //
        //
        //     this.$store.commit("change_cart", cart_length);
        //
        //     console.log(cart_length,55555555555)
        //
        // },
        get_cart_length() {
            // 添加购物车之前必须确保用户已登录
            let token = localStorage.token || sessionStorage.token;
            if (token){
                this.$axios({
                    url: this.$settings.HOST + "home/cartlen/",
                    method: "get",
                    headers: {
                        // 提交token时必须在请求头中声明token  jwt token
                        "Authorization": "jwt " + token
                    },
                }).then(res => {
                    // 向状态机提交修改购物车数量的行为
                    // console.log(res,444444444)
                    this.$store.commit("change_cart", {"cart_length":res.data.cart_length});
                }).catch(error => {
                    this.$message.error(error.response)
                })
            }
        }
    },
    created() {
        this.get_header();
        this.get_user();
        this.get_cart_length();
        // this.token = sessionStorage.token;
    }
}

</script>

<style scoped>
.header-box {
    height: 80px;
}

.header {
    width: 100%;
    height: 80px;
    box-shadow: 0 0.5px 0.5px 0 #c9c9c9;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    background: #fff;
}

.header .content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}

.header .content .logo {
    height: 80px;
    line-height: 80px;
    margin-right: 50px;
    cursor: pointer; /* 设置光标的形状为爪子 */
}

.header .content .logo img {
    vertical-align: middle;
}

.header .nav li {
    float: left;
    height: 80px;
    line-height: 80px;
    margin-right: 30px;
    font-size: 16px;
    color: #4a4a4a;
    cursor: pointer;
}

.header .nav li span {
    padding-bottom: 16px;
    padding-left: 5px;
    padding-right: 5px;
}

.header .nav li span a {
    display: inline-block;
}

.header .nav li .this {
    color: #4a4a4a;
    border-bottom: 4px solid #ffc210;
}

.header .nav li:hover span {
    color: #000;
}

.header .login-bar {
    height: 80px;
}

.header .login-bar .shop-cart {
    margin-right: 20px;
    border-radius: 17px;
    background: #f7f7f7;
    cursor: pointer;
    font-size: 14px;
    height: 28px;
    width: 100px;
    margin-top: 30px;
    line-height: 32px;
    text-align: center;
}

.header .login-bar .shop-cart:hover {
    background: #f0f0f0;
}

.header .login-bar .shop-cart img {
    width: 15px;
    margin-right: 4px;
    margin-left: 6px;
}

.header .login-bar .shop-cart span {
    margin-right: 6px;
}

.header .login-bar .login-box {
    margin-top: 33px;
}

.header .login-bar .login-box span {
    color: #4a4a4a;
    cursor: pointer;
}

.header .login-bar .login-box span:hover {
    color: #000000;
}

a {
    text-decoration: none;
    color: #333;
}

.member {
    display: inline-block;
    height: 34px;
    margin-left: 20px;
}

.member img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: inline-block;
}

.member img:hover {
    border: 1px solid yellow;
}

.header .login-bar .login-box1 {
    margin-top: 16px;
}

a:hover {
    display: inline-block;
}
</style>
