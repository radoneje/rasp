var express = require('express');
var router = express.Router();

/* GET users listing. */


router.put('/room', async (req, res, next) =>{
  var responce=await req.knex("t_rooms")
      .insert({title:req.body.title}, "*")
  res.json(responce[0]);
});
router.get('/room/', async (req, res, next) =>{
  var responce=await req.knex
      .select("*")
      .from("t_rooms")
      .orderBy("title")
      .where({isDeleted:false})
  res.json(responce);
});
router.post('/room/', async (req, res, next) =>{
  var id=req.body.id;
  delete req.body.id;
  console.log(req.body)
  var responce=await req.knex("t_rooms")
      .update(req.body)
      .where({id:id})
  res.json(req.body.id);
});
router.delete('/room/:id', async (req, res, next) =>{
  var responce=await req.knex("t_rooms")
      .update({isDeleted:true})
      .where({id:req.params.id})
  res.json(req.params.id);
});
router.put('/pgm', async (req, res, next) =>{
  var responce=await req.knex("t_pgm")
      .insert({title:req.body.title}, "*")
  res.json(responce[0]);
});
router.delete('/pgm/:id', async (req, res, next) =>{
  var responce=await req.knex("t_pgm")
      .update({isDeleted:true})
      .where({id:req.params.id})
  res.json(req.params.id);
});
router.post('/pgm/', async (req, res, next) =>{
  var id=req.body.id;
  delete req.body.id;
  var responce=await req.knex("t_pgm")
      .update(req.body)
      .where({id:id})
  res.json(req.body.id);
});
router.get('/pgm/', async (req, res, next) =>{
  var responce=await req.knex
      .select("*")
      .from("t_pgm")
      .orderBy("dateStart")
      .where({isDeleted:false})
  res.json(responce);
});

///////////////
router.put('/stb', async (req, res, next) =>{
  var responce=await req.knex("t_m3u8")
      .insert({title:req.body.title}, "*")
  var sort=await req.knex("t_m3u8").max("sort").where({isDeleted:false});
  sort[0].max+=10;
  await req.knex("t_m3u8").update({sort:sort[0].max})
      .where({id:responce[0].id})
  responce[0].sort=sort[0].max;
  res.json(responce[0]);
});
router.delete('/stb/:id', async (req, res, next) =>{
  var responce=await req.knex("t_m3u8")
      .update({isDeleted:true})
      .where({id:req.params.id})
  res.json(req.params.id);
});
router.post('/stb/', async (req, res, next) =>{
  var id=req.body.id;
  delete req.body.id;
  var responce=await req.knex("t_m3u8")
      .update(req.body)
      .where({id:id})
  res.json(req.body.id);
});
router.get('/stb/', async (req, res, next) =>{
  var responce=await req.knex
      .select("*")
      .from("t_m3u8")
      .orderBy("sort")
      .where({isDeleted:false})
  res.json(responce);
});
router.post('/stb/resort', async (req, res, next) =>{
  var arr=req.body;
  var i=10;
  arr=arr.sort((a,b)=>{return a.sort-b.sort});
  arr.forEach(e=>{
    e.sort=i;
    i+=10;
  })
  for (const item of req.body) {
    await req.knex("t_m3u8")
        .update({sort:item.sort})
        .where({id:item.id})
  }
  var responce=await req.knex
      .select("*")
      .from("t_m3u8")
      .orderBy("sort")
      .where({isDeleted:false})
  res.json(responce);

});
////////
///////////////
router.put('/videos', async (req, res, next) =>{
  var responce=await req.knex("t_video")
      .insert({title:req.body.title}, "*")
  var sort=await req.knex("t_video").max("sort").where({isDeleted:false});
  sort[0].max+=10;
  await req.knex("t_video").update({sort:sort[0].max})
      .where({id:responce[0].id})
  responce[0].sort=sort[0].max;
  res.json(responce[0]);
});
router.delete('/videos/:id', async (req, res, next) =>{
  var responce=await req.knex("t_video")
      .update({isDeleted:true})
      .where({id:req.params.id})
  res.json(req.params.id);
});
router.post('/videos/', async (req, res, next) =>{
  var id=req.body.id;
  delete req.body.id;
  var responce=await req.knex("t_video")
      .update(req.body)
      .where({id:id})
  res.json(req.body.id);
});
router.get('/videos/', async (req, res, next) =>{
  var responce=await req.knex
      .select("*")
      .from("t_video")
      .orderBy("sort")
      .where({isDeleted:false})
  res.json(responce);
});
router.post('/videos/resort', async (req, res, next) =>{
  var arr=req.body;
  var i=10;
  arr=arr.sort((a,b)=>{return a.sort-b.sort});
  arr.forEach(e=>{
    e.sort=i;
    i+=10;
  })
  for (const item of req.body) {
    await req.knex("t_video")
        .update({sort:item.sort})
        .where({id:item.id})
  }
  var responce=await req.knex
      .select("*")
      .from("t_video")
      .orderBy("sort")
      .where({isDeleted:false})
  res.json(responce);

});
////////
router.get('/1.m3u8', async (req, res, next) =>{
  var responce=await req.knex
      .select("*")
      .from("t_m3u8")
      .orderBy("sort")
      .where({isDeleted:false})
  var ret="#EXTM3U\r\n";
  responce.forEach(item=>{
    ret+='#EXTINF:-1 group-title="Общие", '+item.title+"\r\n";
    ret+=item.url+"\r\n"
  })
  res.header("Content-Type", "application/x-mpegURL");

  res.send(ret);
});

router.get('/rasp/', async (req, res, next) =>{
  var responce=await req.knex
      .select("*")
      .from("v_rasp")
      .orderBy(["room","dateStart"])
      .where({isDeleted:false})
  responce.forEach(item=>{
    item.descrArr=item.descr? item.descr.split("\n"):[];
    item.descrEngArr=item.descrEng? item.descrEng.split("\n"):[];
  })
  res.json(responce);
});
//////

module.exports = router;
