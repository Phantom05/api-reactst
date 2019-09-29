var express = require('express');
var router = express.Router();
var axios = require('axios');
var _ = require('lodash');
var url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/movie', async (req, res, next) => {
  console.log(req.query, 'queryqueryqueryqueryquery');
  let query_arr = _.reduce(req.query, (arr, val, key) => {
    arr.push(`${key}=${val}`)
    return arr;
  }, []);
  let get_query = query_arr.join('&');


  axios.get(`https://yts.tl/api/v2/list_movies.json?limit=20&${get_query}`)
    .then((response) => {
      console.log(response.data);
      res.json(response.data)
    })
});


// router.get('/movie/week', function (req, res, next) {
//   axios.get(`https://yts.tl/api/v2/list_movies.json?limit=10`)
//     .then((response) => {
//       console.log(response.data);
//       res.json(response.data)
//     })

// });




// router.get('/movie/:body', function (req, res, next) {
//   console.log(req.query, 'req.query');
//   console.log(req.params.body, 'bodybodybody');
//   // let genre = req.params.body
//   axios.get(`https://yts.tl/api/v2/list_movies.json?limit=10&page=${page}&genre=${genre}`)
//     .then((response) => {
//       console.log(response.data);
//       res.json(response.data)
//     })


// });


// router.get('/movie/:genre/:page', function (req, res, next) {
//   console.log(req.query, 'gegegegn');
//   let genre = req.params.genre
//   let page = req.params.page;
//   console.log(req.params);
//   // console.log(indexInfo());
//   axios.get(`https://yts.tl/api/v2/list_movies.json?limit=10&page=${page}&genre=${genre}`)
//     .then((response) => {
//       console.log(response.data);
//       res.json(response.data)
//     })


// });

module.exports = router;
