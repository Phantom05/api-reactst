
// var router = express.Router();
var {axios, _, router} = require('./node_modules');

var {api_path, queryString} = require('./common');
var {wrap} = require('./middleware');


/**
 * Movie Index
 */
router.get('/', wrap(async (req, res, next) => {
  let query = queryString(req.query);
  console.log(query,'탔다');
  axios.get(`${api_path.movieList}?limit=20&${query}`)
    .then((response) => {
      console.log(response.data);
      res.json(response.data)
    })
}));

/**
 * ROUTER:
 * Movie List
 */
router.get('/list',wrap(async (req, res, next) => {
  let query = queryString(req.query);
  axios.get(`${api_path.movieList}?limit=20&${query}`)
    .then((response) => {
      console.log(response.data);
      res.json(response.data)
    })
}) );

/**
 * ROUTER:
 * Movie Detail
 */

router.get('/detail',wrap(async (req, res, next) => {
  let query = queryString(req.query);
  axios.get(`${api_path.movieDetail}?${query}`)
    .then((response) => {
      console.log(response.data);
      res.json(response.data)
    })
}) );

/**
 * Main slide
 */
router.get('/list/main/slide',wrap(async (req, res, next) => {
  console.log(req.query, 'queryqueryqueryqueryquery');

  let body = {}
  const arr = [
    {
      id: 0,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url(http://images.adrise.tv/9FUmvLnHDwq15BAdwGS7MWlOpLY=/0x94:2037x850/1920x676/smart/img.adrise.tv/9086aff4-8fd0-4535-a361-1e212b6998bb.jpg)`,
        backgroundPosition: `center`
      },
      link: `/movie/detail/1`,
      title: `The Perfect Game`,
      summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!, Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!`,
    },
    {
      id: 1,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url("//images.adrise.tv/_tS5UL-kYfkHHk3JiLdx75_1vco=/0x203:3510x1506/1920x676/smart/img.adrise.tv/b13caf4a-2acc-43cb-9f52-8a9e5336c607.jpg")`,
        backgroundPosition: `center`,
      },
      link: `/movie/detail/2`,
      title: `Doc West`,
      summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!, Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!`,
    },
    {
      id: 2,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url("//images02.adrise.tv/tvSrRPWTtjMApXtfkbTCesAOtdM=/0x620:2000x1361/1920x676/smart/img.adrise.tv/49182b8f-c258-4a6c-8252-20991fffda21.jpg")`,
        backgroundPosition: `center`,
      },
      link: `/movie/detail/3`,
      title: `Kayla`,
      summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!, Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!`,
    },
    {
      id: 3,
      style: {
        backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url("//images02.adrise.tv/paqvJjkY5MP1i88VaNNjTreP4NA=/1920x676/smart/img.adrise.tv/0a60ab2f-e19a-4b11-89ae-73132685b343.jpg")`,
        backgroundPosition: `center`,
      },
      link: `/movie/detail/4`,
      title: `Better Off Zed`,
      summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!, Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit tenetur fugiat. Quos non impedit, distinctio iusto neque aperiam ipsam culpa est ab repellendus unde adipisci modi consectetur quas officia!`,
    }
  ];
  body.data = {};
  body.data.movies = arr;
  res.json(body);
}) );


// /**
//  * File Upload Test
//  */
router.post('/file/upload',wrap( async (req, res, next) => {
  console.log('movie file upload');
  setTimeout(() => {
    res.json({ result: 1 });
  }, 3000);
}));


// /* GET home Test page. */
// router.get('/', function (req, res, next) {
//   console.log(req.params);
//   console.log(req.body);
//   res.json({url:'/',use:'Test',method:'get'});
// });
// router.post('/', function (req, res, next) {
//   console.log(req.params);
//   console.log(req.body);
//   console.log(req.files);
//   console.log(req.query);
//   res.json({url:'/',use:'Test',method:'post'});
// });


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
