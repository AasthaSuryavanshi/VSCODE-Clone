var express = require('express');
var router = express.Router();
const fs = require('node:fs');

/* GET home page. */
const folder = "files"
router.get('/', function(req, res, next) {
  fs.readdir(`./${folder}`,{withFileTypes: true},function(err,files){                   //readdir - read the files inside the mentioned path
    // console.log(files);                                                             //withfiletype - used to tell ki konsi file h aur konsa folder phir uske hisab se icons decide karega.
    res.render('index', {files: files, folder: folder})               //left side vala variable used in ejs n right side vala is value to be renderd.

  })
});
router.get('/fileRefreash',function(req,res,next){
  fs.writeFile(`./${folder}/${req.query.fileSearch}`,"",function(err){
    res.redirect(`back`)
  })
});
router.get('/fileCreate',function(req,res,next){
  fs.writeFile(`./${folder}/${req.query.fileSearch}`,"",function(err){
    res.redirect('/')
  })
});
router.get('/folderCreate',function(req,res,next){
  fs.mkdir(`./${folder}/${req.query.folderSearch}`,function(err){
    res.redirect('/');
  })
});
router.get('/delete/file/:filename',function(req,res,next){
  fs.unlink(`./${folder}/${req.params.filename}`,function(err){
    res.redirect('/');
  })
});
router.get('/delete/folder/:filename',function(req,res,next){
  fs.rmdir(`./${folder}/${req.params.filename}`,function(err){
    res.redirect('/');
  })
});

router.get('/file/:filename', function(req, res, next) {
  fs.readdir(`./${folder}`,{withFileTypes: true},function(err,files){                   //readdir - read the files inside the mentioned path                                                            //withfiletype - used to tell ki konsi file h aur konsa folder phir uske hisab se icons decide karega.
    fs.readFile(`./${folder}/${req.params.filename}`,"utf8",function(err,data){
      res.render('fileopened', {files: files, folder: folder, filenamesend:req.params.filename, datasend:data})               //left side vala variable used in ejs n right side vala is value to be renderd.

    })

  })
});
router.post('/file/filesave/:filenamesend', function(req, res, next){
   fs.writeFile(`./${folder}/${req.params.filenamesend}`, req.body.writing ,function(err){
    res.redirect(`back`)
   })                                                         

})

router.post(`/update/:updatedFileName`, function(req, res, next){
  fs.rename(`./${folder}/${req.params.updatedFileName}`,`./${folder}/${req.body.editInp}`,function(err){
    res.redirect('back');

  })
})



module.exports = router;
