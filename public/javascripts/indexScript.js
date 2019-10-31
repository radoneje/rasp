var app = new Vue({
    el: '#app',
    data: {
        pgm:[{title:"123"}],
        pgmBak:[],
        moment:moment,
        videos:[],
        videoShow:false,
        head:{time:"",title:"", subTitle:""}
    },
    methods: {
        work:async function(){
            var _this=this;
            try {
                var dt = await  axios.get("/api/rasp")
                _this.pgm = dt.data;
                _this.pgmBak = dt.data;
                _this.rotate(_this);
                console.log("ed", _this.pgm);
            }
            catch (e) {
                console.warn(e)
                _this.pgm=_this.pgmBak;

            }
        },
        showVideo:async function(_this){
            try {
                var dt = await axios.get("/api/videos");
                _this.videos = dt.data;
            }catch (e) {
                console.warn(e)
            }
            console.warn(_this.videos)
            var arr=_this.videos.filter(e=>true);;

            show();
            async function show() {
                if(arr.length==0) {
                    _this.videoShow=false;
                    return _this.work();
                }

                _this.videoShow=true;
                let vid=arr.shift();
                _this.videos.forEach(e=>{ e.isActive=(vid.id==e.id)})
                _this.videos=_this.videos.filter(e=>true);

                await timeout(0);
                let vidElem=document.getElementById("video_"+vid.id);

                vidElem.play();
                vidElem.onended =async function() {
                    console.log("v.ended", vidElem)
                  //  setTimeout(()=>{
                        _this.videos.forEach(e=>{ e.isActive=false;})
                        _this.videos=_this.videos.filter(e=>true);
                        vidElem.currentTime = 0;
                  //  },500)

                  //  await timeout(0);

                    show();
                };
            }

        },
        rotate:async function(_this){
            await timeout(1000)
            for (const item of _this.pgm) {
                _this.head={time:moment(item.dateStart).format('DD.MM'),title:"программа научного дня", subTitle:"технологии ии"}
                _this.pgm.forEach(e=>{if(e.id==item.id) {e.isActive=true;e.eng=false }else e.isActive=false})
                _this.pgm=_this.pgm.filter(e=>true);


                await timeout(3000)
                _this.pgm.forEach(e=>{if(e.id==item.id) {e.isActive=true;e.eng=true }else e.isActive=false})
                _this.pgm=_this.pgm.filter(e=>true);
                _this.head={time:moment(item.dateStart).format('DD.MM'),title:"Science Day program", subTitle:"AI technology"}
                await timeout(3000)


                _this.pgm.forEach(e=>{e.isActive=false;})
                _this.pgm=_this.pgm.filter(e=>true);
                await timeout(500)

                _this.pgm.forEach(e=>{ e.eng=false})
                _this.pgm=_this.pgm.filter(e=>true);

            }
            _this.showVideo(_this);
        }
    },
    mounted: async function () {
        var _this=this;
        _this.work();


    }
    });
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}