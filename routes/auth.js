
var { axios, _, router } = require('./node_modules');
// var router = express.Router();
var { api_path, queryString } = require('./common');
var { wrap } = require('./middleware');

/**
 * Login Router
 */
router.post('/login', wrap(async (req, res, next) => {
  let query = queryString(req.query);
  console.log(query);

  let profile ={
    "type": 1,
    "code": 1,
    "id": "phantom05@gmail.com",
    "name": "Phantom05",
    "imagePath": null,
    "country": "Korea South",
    "state": "Seoul",
    "language": ["DE","EN","KO"],
    "rating": 3.26,
    "jsonType": "login.res.json",
    "result": 1,
    "msg": "login success"
}

  res.json(profile)
}));

/**
 * Login Router
 */
router.post('/signup', wrap(async (req, res, next) => {
  let query = queryString(req.query);
  console.log(query);

  res.json({signup:true})
}));


module.exports = router;
