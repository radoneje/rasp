var app = new Vue({
    el: '#app',
    data: {
        pgm:[],
        opacity:0
    },
    components: {


    },
    methods: {

    },

    mounted: async function () {

        data = await axios.get("/api/pgm");
        this.pgm = data.data;
        this.opacity=1

    }
});

