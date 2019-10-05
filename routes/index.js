
var { axios, _, router } = require('./node_modules');
// var router = express.Router();
var { api_path, queryString } = require('./common');
var { wrap } = require('./middleware');


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
  res.json({ hello: 'world' })
}));

// /**
//  * File Test Router
//  */
// router.post('/file/upload', wrap(async (req, res, next) => {
//   console.log('index file upload');
//   setTimeout(() => {
//     res.json({result:2})
//   }, 1000);
// }));

/**
 * Page Navigation
 */

router.get('/test/board/:page', wrap(async (req, res, next) => {
 
  let people = ['Admin','Phantom','Major','Steve','Jason'];
  let boardList=[];
  for(let i = 0; i < 10; i++){
    boardList.push({
      id:i,
      title:'This is a Title',
      date:'2019-10-05',
      author:people[Math.ceil(Math.random()* people.length-1)] ,
      seq:i+50,
      num:i
    });
  };
  console.log(req);

 
//   endPage: 2
// nextPage: 2
// page: 1
// prevPage: 1
// startPage: 1
// totalPage: 2
  let pageNavigation = [
    
  ];
  let boardInfo = {};
  boardInfo.boardList = boardList;
  res.json(boardInfo)
  
}));

/**
 * Detail
 */
router.get('/test/detail/:req', wrap(async (req, res, next) => {

  res.json({ result: 5 })
}));

module.exports = router;
