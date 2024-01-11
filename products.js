import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data(){
        return {
            apiUrl : `https://vue3-course-api.hexschool.io/v2`,
            apiPath :`kun123`,
            products:[],
            tempProduct:{},
        }
    },
    methods: {
        checkAdmin(){
            axios.post(`${this.apiUrl}/api/user/check`)
            .then(res=>{
                this.getData()
            })
            .catch(error=>{
                // alert(err.response.data.message);
                window.location = `login.html`
            })
        },
        getData(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
            .then(res=>{
                this.products = res.data.products;
            })
            .catch(error=>{
                alert(error.data.message)
            })
        },
        openProduct(item){
            this.tempProduct = item;
        }
    },
    mounted() {
        //取得 Token（Token 僅需要設定一次）
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        //token自動夾帶進去headers
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin();
    },
}).mount('#app')