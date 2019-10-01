var express = require('express');
var router = express.Router();
var axios = require('axios');
var _ = require('lodash');
var url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.params);
  console.log(req.body);
  res.render('index', { title: 'Express' });
});
router.post('/', function (req, res, next) {
  console.log(req.params);
  console.log(req.body);
  console.log(req.files);
  console.log(req.query);
  res.render('index', { title: 'Express' });
});

/**
 * Movie Index
 */
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

router.get('/movie/main/slide', async (req, res, next) => {
  console.log(req.query, 'queryqueryqueryqueryquery');
  // let query_arr = _.reduce(req.query, (arr, val, key) => {
  //   arr.push(`${key}=${val}`)
  //   return arr;
  // }, []);
  // let get_query = query_arr.join('&');

  // axios.get(`https://yts.tl/api/v2/list_movies.json?limit=20&${get_query}`)
  //   .then((response) => {
  //     console.log(response.data);
  //     res.json(response.data)
  //   })

  let body = {}
  const arr = [
    {
      id: 0,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url(http://images.adrise.tv/9FUmvLnHDwq15BAdwGS7MWlOpLY=/0x94:2037x850/1920x676/smart/img.adrise.tv/9086aff4-8fd0-4535-a361-1e212b6998bb.jpg)`,
        backgroundPosition: `center`
      },
      link: `www.naver.com/1`
    },
    {
      id: 1,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url("//images.adrise.tv/_tS5UL-kYfkHHk3JiLdx75_1vco=/0x203:3510x1506/1920x676/smart/img.adrise.tv/b13caf4a-2acc-43cb-9f52-8a9e5336c607.jpg")`,
        backgroundPosition: `center`,
      },
      link: `www.naver.com/2`
    },
    {
      id: 2,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url("//images02.adrise.tv/tvSrRPWTtjMApXtfkbTCesAOtdM=/0x620:2000x1361/1920x676/smart/img.adrise.tv/49182b8f-c258-4a6c-8252-20991fffda21.jpg")`,
        backgroundPosition: `center`,
      },
      link: `www.naver.com/3`
    },
    {
      id: 3,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url("//images02.adrise.tv/paqvJjkY5MP1i88VaNNjTreP4NA=/1920x676/smart/img.adrise.tv/0a60ab2f-e19a-4b11-89ae-73132685b343.jpg")`,
        backgroundPosition: `center`,
      },
      link: `www.naver.com/4`
    }
  ];
  body.data = {};
  body.data.movies = arr;
  res.json(body);
});

/**
 * Movie Detail
 */

router.get('/movie/detail', async (req, res, next) => {
  console.log(req.query, 'detaildetaildetaildetaildetail');

  let query_arr = _.reduce(req.query, (arr, val, key) => {
    arr.push(`${key}=${val}`)
    return arr;
  }, []);
  let get_query = query_arr.join('&');
  console.log(get_query);

  axios.get(`https://yts.tl/api/v2/movie_details.json?${get_query}`)
    .then((response) => {
      console.log(response.data);
      res.json(response.data)
    })
});




router.post('/file/upload', function (req, res, next) {
  console.log(req.params);
  console.log(req.body);
  console.log(req.files);
  console.log(req.query);
  setTimeout(() => {
    res.json({result:1});
  }, 5000);
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
