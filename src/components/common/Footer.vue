<template>
    <div class="footer" style="background-color: darkseagreen">
        <ul>
<!--            <li v-for = "(bottom,index) in bottom_list" :key="index">{{ bottom.title }}</li>-->
            <li v-for = "(bottom,index) in bottom_list" :key="index">
                <span v-if="bottom.is_site"><a :href="bottom.link">{{ bottom.title }}</a></span>
                <span v-else><router-link :to="bottom.link">{{ bottom.title }}</router-link></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            bottom_list: []
        }
    },
    methods: {
        get_bottom() {
            this.$axios.get(this.$settings.HOST + "home/bottom/").then(response => {
                this.bottom_list = response.data;
                // console.log(response)
            })
        },
    },
    created() {
        this.get_bottom();
    }
}
</script>

<style scoped>
.footer {
    width: 100%;
    height: 128px;
    background: #25292e;
    color: #fff;
}

.footer ul {
    margin: 0 auto 16px;
    padding-top: 38px;
    width: 810px;
}

.footer ul li {
    float: left;
    width: 112px;
    margin: 0 10px;
    text-align: center;
    font-size: 14px;
}

.footer ul::after {
    content: "";
    display: block;
    clear: both;
}

.footer p {
    text-align: center;
    font-size: 12px;
}
</style>
