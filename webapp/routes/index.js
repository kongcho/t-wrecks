var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/twrecks', function(req, res) {
    res.render('twrecks', { title: 'T-Wrecks', subtitle: 'wowza' });
});

router.get('/captureImage', function(req, res, next) {
res.render('captureImage', { title: 'T-Wrecks Webcam' });
});
router.post('/captureImage', function(req, res, next) {
//console.log("FormData "+ req.body.base64);
var base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
fs.writeFile("uploads/out.png", base64Data, 'base64', function(err) {
if(err){
console.log(err);
			}else{
res.send(JSON.stringify({'status': 1, 'msg': 'Image Uploaded'}));
		}
	});
});

module.exports = router;
