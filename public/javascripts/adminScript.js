var app = new Vue({
    el: '#app',
    data: {
        menu: [{id: 0, title: "Помещения", isActive: true, viewer: "room"}, {id: 1, title: "Программа",}, {
            id: 2,
            title: "Видеo"
        }, {id: 3, title: "Плейлист канала"}, {id: 5, title: "Плейлист приставки"}],
        newRoomTitle: "",
        newPgmTitle: "",
        stbTitle: "",
        videoTitle:"",
        rooms: [],
        pgm: [],
        stb: [],
        videos:[],
        moment: moment,
        timeEnd: '00:00'
    },
    components: {
        vuejsDatepicker

    },
    methods: {
        ///
        videoDown:async function(item){
            this.videos.forEach(e=>{
                if(e.id==item.id)
                    e.sort+=15;
            })
            var data = await axios.post("/api/videos/resort", this.videos);
            this.videos =data.data;
        },
        videoUp:async function(item){
            this.videos.forEach(e=>{
                if(e.id==item.id)
                    e.sort-=15;
            })
            var data = await axios.post("/api/videos/resort", this.videos);
            this.videos =data.data;
        },
        deleteVideo: async function (item) {
            var data = await axios.delete("/api/videos/" + item.id);
            this.videos = this.videos.filter(e => e.id != item.id);
        },
        videoChange: async function (item, e) {
            var data = await axios.post("/api/videos/", item);
            e.target.blur();
        },
        keyDownVideo: async function (item, e) {
            if (e.keyCode == 13)
                await this.videos(item, e);
        },
        videoAdd: async function (e) {
            if (this.videoTitle.length == 0)
                return;
            var _this = this;
            var data = await axios.put("/api/videos", {title: this.videoTitle})
            this.videoTitle = "";
            e.target.blur();
            _this.videos.push(data.data)
        },
        keyDownVideoAdd: function (e) {
            if (e.keyCode == 13)
                this.videoAdd(e);
        },
        ///
        stbDown:async function(item){
            this.stb.forEach(e=>{
                if(e.id==item.id)
                    e.sort+=15;
            })
            var data = await axios.post("/api/stb/resort", this.stb);
            this.stb =data.data;
        },
        stbUp:async function(item){
            this.stb.forEach(e=>{
                if(e.id==item.id)
                    e.sort-=15;
            })
            var data = await axios.post("/api/stb/resort", this.stb);
            this.stb =data.data;
        },
        deleteStb: async function (item) {
            console.log("deleteRoom")
            var data = await axios.delete("/api/stb/" + item.id);
            this.stb = this.stb.filter(e => e.id != item.id);
        },
        stbChange: async function (item, e) {
            var data = await axios.post("/api/stb/", item);
            e.target.blur();
        },
        keyDownStb: async function (item, e) {
            if (e.keyCode == 13)
                await this.stbChange(item, e);
        },
        stbAdd: async function (e) {
            if (this.stbTitle.length == 0)
                return;
            var _this = this;
            var data = await axios.put("/api/stb", {title: this.stbTitle})
            this.stbTitle = "";
            e.target.blur();
            _this.stb.push(data.data)
        },
        keyDownStbAdd: function (e) {
            if (e.keyCode == 13)
                this.stbAdd(e);
        },
        pgmDateEndChange: async function (item, e) {
            var val = JSON.parse(e.target.value)
            item.dateEnd = moment(item.dateEnd).set("minute", val.m).toDate();
            item.dateEnd = moment(item.dateEnd).set("hour", val.h).toDate();
            (new Date()).getMinutes()
            await this.pgmChange(item, e)
        },
        pgmDateStartChange: async function (item, e) {
            var val = JSON.parse(e.target.value)
            item.dateStart = moment(item.dateStart).set("minute", val.m).toDate();
            item.dateStart = moment(item.dateStart).set("hour", val.h).toDate();

           /* item.dateEnd = item.dateStart;
            item.dateEnd = moment(item.dateEnd).set("minute", val.m).toDate();
            item.dateEnd = moment(item.dateEnd).set("hour", val.h + 1).toDate();*/

            await this.pgmChange(item, e)
        },
        padLeft: function (i) {
            if (i < 10)
                i = "0" + i;
            return i;
        },
        editStartTime: async function (item, e) {

        },
        pgmChange: async function (item, e) {
            var data = await axios.post("/api/pgm/", item);
            if (e && e.target)
                e.target.blur();
        },
        keyDownpgm: async function (item, e) {
            if (e.keyCode == 13)
                await this.pgmChange(item, e);
        },
        deletepgm: async function (item) {
            console.log("deleteRoom")
            var data = await axios.delete("/api/pgm/" + item.id);
            this.pgm = this.pgm.filter(e => e.id != item.id);
        },
        pgmAdd: async function (e) {
            if (this.newPgmTitle.length == 0)
                return;
            var _this = this;
            var data = await axios.put("/api/pgm", {title: this.newPgmTitle})
            this.newPgmTitle = "";
            e.target.blur();
            _this.pgm.push(data.data)
        },
        keyDownPgmAdd: function (e) {
            if (e.keyCode == 13)
                this.pgmAdd(e);
        },
        roomChange: async function (item, e) {
            var data = await axios.post("/api/room/", item);
            e.target.blur();
        },
        keyDownRoom: async function (item, e) {
            if (e.keyCode == 13)
                await this.roomChange(item, e);
        },
        deleteRoom: async function (item) {
            console.log("deleteRoom")
            var data = await axios.delete("/api/room/" + item.id);
            this.rooms = this.rooms.filter(e => e.id != item.id);
        },
        roomAdd: async function (e) {
            if (this.newRoomTitle.length == 0)
                return;
            var _this = this;
            var data = await axios.put("/api/room", {title: this.newRoomTitle})
            this.newRoomTitle = "";
            e.target.blur();
            _this.rooms.push(data.data)
        },
        keyDownRoomAdd: function (e) {
            if (e.keyCode == 13)
                this.roomAdd(e);
        },
        menuClick: function (item) {
            this.menu.forEach(elem => {
                elem.isActive = (elem.id == item.id);
                return elem;
            });
            this.menu = this.menu.filter(e => true);
        }
    },

    mounted: async function () {
        var data = await axios.get("/api/room");
        this.rooms = data.data;
        data = await axios.get("/api/pgm");
        this.pgm = data.data;
        data = await axios.get("/api/stb");
        this.stb = data.data;
        data = await axios.get("/api/videos");
        this.videos = data.data;
    }
});

