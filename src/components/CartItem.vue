<template>
    <div class="cart_item" :id="index">
        <div class="cart_column column_1">
            <el-checkbox class="my_el_checkbox" v-model="course.selected"></el-checkbox>
        </div>
        <div class="cart_column column_2">
            <img :src="course.course_img" alt="">
            <span><router-link to="/course/detail/1">{{ course.name }}</router-link></span>
        </div>
        <div class="cart_column column_3">
            <el-select v-model="course.expire_id" size="mini" placeholder="请选择购买有效期" class="my_el_select">
                <el-option :label="item.expire_text" :value="item.id" :key="item.id" v-for="item in course.expire_list"></el-option>
            </el-select>
        </div>
        <div class="cart_column column_4">￥{{ course.price }}</div>
        <div class="cart_column column_4" @click="delete_course(course.id, index)">删除</div>

    </div>
</template>

<script>
export default {
    name: "CartItem",
    data() {
        return {

        }
    },
    props: ['course', 'index'],
    methods: {
        // 检查用户是否登录
        check_user_login() {
            let token = localStorage.token || sessionStorage.token;
            if (!token) {
                let self = this;
                this.$confirm("对不起,请登录后再添加购物车", {
                    callback() {
                        self.$router.push("/login");
                    }
                });
                return false
            }
            return token;
        },

        // 删除购物车中的商品
        delete_course(course_id, index) {
            let token = this.check_user_login();
            let params = {
                "course_id": course_id
            }
            this.$axios.delete(this.$settings.HOST + "cart/option/", {
                params: params,
                headers: {
                    "Authorization": "jwt " + token
                }
            }).then(response => {
                this.$message.success("亲!! 恭喜您删除成功!!")
                this.$store.commit("change_cart", {"cart_length":response.data.cart_length});

                // 向父组件提交自定义事件
                this.$emit("delete_course")
                // console.log( response.data.cart_length,11)

                // // 删除该行商品
                // let div = document.getElementById(this.index)
                // // console.log(div)
                // div.remove()
            }).catch(error => {
                this.$message.error(error.response.data)
            })
        },

        // 发起请求，在后台修改商品的选中状态
        change_selected() {
            // alert()
            // console.log(this.course.selected)
            let token = this.check_user_login();

            // 获取课程的id和选择的状态
            this.$axios({
                url: this.$settings.HOST + "cart/option/",
                method: "patch",
                data: {
                    "course_id": this.course.id,
                    "selected": this.course.selected,
                },
                headers: {
                    "Authorization": "jwt " + token
                },

            }).then(response => {
                this.$message.success("更新成功!!")
                // 向父组件提交自定义事件
                this.$emit("change_select")
            }).catch(error => {
                this.$message.error("更新失败!!")
            })
        },

        // 发起修改有效期的请求
        change_expire(){
            // alert()
            let token = this.check_user_login();
            this.$axios({
                url: this.$settings.HOST + "cart/option/",
                method: "put",
                data: {
                    "expire_id":this.course.expire_id,
                    "course_id": this.course.id,
                },
                headers: {
                    "Authorization": "jwt " + token
                },

            }).then(response => {
                this.$message.success("更新成功!!")
                this.course.price = response.data.expire_price
                this.$emit("change_expire")

            }).catch(error => {
                this.$message.error("更新失败!!")
            })
        },

    },
    watch: {
        "course.selected": function () {
            this.change_selected()

        },
        // 监测select框的有效期id的一旦发生变化，则发起修改有效期的请求
        "course.expire_id":function (){
            this.change_expire()
        }
    },

}
</script>

<style scoped>
.cart_item::after {
    content: "";
    display: block;
    clear: both;
}

.cart_column {
    float: left;
    height: 250px;
}

.cart_item .column_1 {
    width: 88px;
    position: relative;
}

.my_el_checkbox {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 16px;
    height: 16px;
}

.cart_item .column_2 {
    padding: 67px 10px;
    width: 520px;
    height: 116px;
}

.cart_item .column_2 img {
    width: 175px;
    height: 115px;
    margin-right: 35px;
    vertical-align: middle;
}

.cart_item .column_3 {
    width: 197px;
    position: relative;
    padding-left: 10px;
}

.my_el_select {
    width: 117px;
    height: 28px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}

.cart_item .column_4 {
    padding: 67px 10px;
    height: 116px;
    width: 142px;
    line-height: 116px;
}
</style>
