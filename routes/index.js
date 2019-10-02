
var {axios, _, router} = require('./node_modules');
// var router = express.Router();
var {api_path, queryString} = require('./common');
var {wrap} = require('./middleware');


/**
 * Index Router
 */
router.get('/', wrap(async (req, res, next) => {
  let query = queryString(req.query);
  console.log(query);
  console.log('형 왜 이걸타?');
  // axios.get(`${api_path.movieList}?limit=20&${query}`)
  //   .then((response) => {
  //     console.log(response.data);
  //     res.json(response.data)
  //   })
  res.json({hello:'world'})
}));

/**
 * File Test Router
 */
router.post('/file/upload', wrap(async (req, res, next) => {
  console.log('index file upload');
  setTimeout(() => {
    res.json({result:2})
  }, 1000);
}));


module.exports = router;
