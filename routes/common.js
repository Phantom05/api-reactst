



const {
  axios,
  _,
  moment_timezone,
  moment,
  EventEmitter,
  svgCaptcha,
  util
} = require('./node_modules');

let api_path = {
  movieList : `https://yts.tl/api/v2/list_movies.json`,
  movieDetail:`https://yts.tl/api/v2/movie_details.json`
};



svgCaptcha.options.charPreset = '0123456789';
const CancelToken             = axios.CancelToken;
const source                  = CancelToken.source();

const api_address = {
  userList(type){ return `/dp/api/${type}/list`},
  userDetailInfoProject(type,tabName,id){return `/dp/api/${type}/projects/${tabName}/${id}/`},
  review(type){return  `/dp/api/${type}/projects/review/`},
  user_project_detail(type,tabName){return `/dp/api/${type}/projects/${tabName}/`},
  main                 : '/dp/api/main',
  projectList          : `/dp/api/project/list`,
  info_designer_review : `/dp/api/designer/projects/review/`,
  signup               : `/dp/api/user/signup`,
  email_confirm        : `/dp/api/user/email/confirm`,
  email_check          : `/dp/api/user/email/check`,
  login                : `/dp/api/user/login`,
  info_users_project   : ``,
  logout               : `/dp/api/user/logout`,
  about                : `/dp/api/designer/mypage/about`,
  review               : `/dp/api/designer/projects/review/`,
  projectDetail        : `/dp/api/project/detail/`
}

// /dp/api/client/projects/completed/1?page=1

const pagePath = {
  'index':`/`,
  'auth':`Pages/Users/Auth`,
  'project':`Pages/Users/Project`,
  'info':`Pages/Users/Info`,
  'mypage':`Pages/Users/Mypage`,
  'view_page':`Pages/ViewPages`
}
const pageName = {
  'main':'main',
  'error':'error',
  'alert':"alert",
  'designer':'designer',
  'client':'client',
  'viewPages':{
    "pricing":"pricing",
    "about":"about"
  },
  designerDetail:"designerDetail",
}

/**
 * variables
 */
let vars = {
  type:{
    client:1,
    designer:2
  },
  result:{
    fail : 0,
    success: 1, 
    notFound : 2,
    notEnoughParam : 3,
    noAffected: 4,
    err: 5,
  },
  timeRole:{
    common:`YYYY-MM-DD hh:mm`
  }
}

const env = require('../config');
let resetColor = "\x1b[0m";
let clc = {
  bright: `\x1b[1m%s${resetColor}`,
  dim: `\x1b[2m%s${resetColor}`,
  underscore: `\x1b[4m%s${resetColor}`,
  blink: `\x1b[5m%s${resetColor}`,
  reverse: `\x1b[7m%s${resetColor}`,
  Hidden: `\x1b[8m%s${resetColor}`,
  black: `\x1b[30m%s${resetColor}`,
  red: `\x1b[31m%s${resetColor}`,
  green: `\x1b[32m%s${resetColor}`,
  yello: `\x1b[33m%s${resetColor}`,
  blue: `\x1b[34m%s${resetColor}`,
  magenta: `\x1b[35m%s${resetColor}`,
  cyan: `\x1b[36m%s${resetColor}`,
  white: `\x1b[37m%s${resetColor}`,
  bgBlack: `\x1b[40m%s${resetColor}`,
  bgRed: `\x1b[41m%s${resetColor}`,
  bgGreen: `\x1b[42m%s${resetColor}`,
  bgYellow: `\x1b[43m%s${resetColor}`,
  bgBlue: `\x1b[44m%s${resetColor}`,
  bgMagenta: `\x1b[45m%s${resetColor}`,
  bgCyan: `\x1b[46m%s${resetColor}`,
  bgWhite: `\x1b[47m%s${resetColor}`,
};

const commandLine = `==============================================================`;


function DataIntegration(){

}



 
/**
 * 
 * @param {*} type 
 */
function profilePath(type){
  if(type === 'blue'){
    return `/img-common/default_profile_img2.png`
  }else if (type === 'red'){
    return `/img-common/default_profile_img3.png`
  }else if (type === 'black'){
    return `/img-common/default_profile_img4.png`
  }
}

/**
 * 
 */
function profileImagePath(type = 'blue'){
  if(type === 'blue'){
    return `/img-common/default_profile_img2.png`
  }else if (type === 'red'){
    return `/img-common/default_profile_img3.png`
  }else if (type === 'aws'){
    return 
  }else if (type === 'black'){
    return `/img-common/default_profile_img4.svg`
  }
}




/** 
 * 
 * @param {*} image 
 * @param {*} notValue 
 */
function profileImagePathExpression(image,notValue = 'blue'){
  return (_.isNull(image) || _.isUndefined(image))?profileImagePath(notValue) : image
}

/**
 * 
 * @param {*} txt 
 * @param {*} color 
 * @param {*} bool 
 */
function log(txt, color,bool = false) {
  if(!color){
    if(bool === true){
      console.log(util.inspect(txt, false, null, true ));
    }else{
      console.log(txt);
    }
  }else{
    color = color || 'bright'
    console.log(clc[color], txt);
  }

}

/**
 * 
 */
function numWithCommas(x) {
  if (x == null || x == undefined) return '0';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/**
 * 
 */
// 날짜, 요일 포함된 시간 함수 // Fri, 2019-05-10 / 18:07:52
function timeState(t) {
  let weekName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // let newTime = weekName[t.getDay()]+', '+t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+' / '+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();

  let month = ((t.getMonth() + 1) < 10) ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
  let date = (t.getDate() < 10) ? '0' + t.getDate() : t.getDate();
  let hours = (t.getHours() < 10) ? '0' + t.getHours() : t.getHours();
  let min = (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes();
  let sec = (t.getSeconds() < 10) ? '0' + t.getSeconds() : t.getSeconds();

  let newTime = weekName[t.getDay()] + ', ' + t.getFullYear() + '-' + month + '-' + date + ' / ' + hours + ':' + min + ':' + sec
  return newTime;
}


/**
 * 
 */
function api(config) {
  let apiAddress = "";
  let mode_env = process.env.NODE_ENV;
  config = config || {log:true}
  if(config.log){
    log('API Mode API','red')
  }
  if (mode_env === 'production' || mode_env === 'prod') {
    if(config.log){
      console.log("Production Mode API");
    }
    apiAddress = 'http://15.164.27.98:13750';

  } else if (mode_env === 'development' || mode_env === 'dev') {
    if(config.log){
      console.log("Development Mode API");
    }
    apiAddress = 'http://15.164.27.98:13750';
  }
  return apiAddress;
}


/**
 * 
 */
// 년,월,일 포함된 시간 함수 2018-05-10
function getShortTime(t) {
  let month = ((t.getMonth() + 1) < 10) ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
  let date = (t.getDate() < 10) ? '0' + t.getDate() : t.getDate();
  let newTime = t.getFullYear() + '-' + month + '-' + date;
  return newTime;
}



/**
 * 
 */
function isNull(val) {
  //true 면 값이 없음, false 면 값이 없음
  return (val == undefined || val === null || (val !== null && val.length == 0 ) || val == '') ? true : false;
}

function isNullCb(val,cb){
  if(isNull(val)){
    return cb;
  }else{

  }
}


/**
 * 
 */
// 타임스탬프를 new Date형식으로 변한.
function timeStampToNewDate(timestamp) {
  let tsp = timestamp;
  let date = new Date();
  date.setTime(tsp);
  return date
}


/**
 * 
 */
async function Axois(config) {
  const result = await axios(config)
  return result;
};


// axios.get(`/endpoint`) 
// .then(
//   responseA =>
//     Promise.all([
//       responseA,
//       axios.get("/endpointB")
//     ])   
// )
// .then(
//   ([responseA,responseB]) => {
//   console.log(responseA,responseB);
// })
// .catch((err) => {
//     console.log(err.message);
// });



/**
 * 
 * @param {*} e 
 */
function axiosCatchTemplate(e){
  log(`/* ERROR: Response Server:\n===============================`, 'red')
  console.log(e.message);
  log(`=============================== */`, 'red')
}

/**
 * 
 * 단일 GET , POST
 * await aix.GET(api_address.main)
    .then((response) => {
      let data = response.data;
      body.server = data;
      res.render('Index', body.server);
      return
    })
    .catch((e) => {
      Ax.err(e)
      res.render('Index', body.test);
    });

  let obj = {
    data: {
      email:req.body.username,
      password:req.body.password
    }
  }
    await aix.POST(api_address.main, obj)
    .then((response) => {
      let data = response.data;
      body.server = data;
      res.render('Index', body.server);
      return
    })
    .catch((e) => {
      Ax.err(e)
      res.render('Index', body.test);
    });

 * 
 *  이런식으로 ALL로도 사용가능함.
 * 
  let body = {};
  body.test = indexInfo(api_address.main)
  let obj = {
    url: 'http://15.1164.27.98:13750'
  }
  const wowwowwowaaaa =  await aix.GET(api_address.main, obj)
    .then((response) =>  response)
    .catch((e) => Ax.err(e) );

  const wowwowwowbbbb = await aix.GET(api_address.main)
    .then((response) => response )
    .catch((e) => Ax.err(e) );

    aix.ALL(wowwowwowaaaa,wowwowwowbbbb)
    .then((response) =>{
      // response 는 배열로 갑들이 합쳐져서 떨어짐.
      body.server = response[0];
      res.render('Index', body.server);
    })

 */

//  {
//    color:'red',
//    text:'dsg',
//    cb:function(e){
//      console.log(e.message);
//    }
//  }

 function commandLog(config){
  log(`${commandLine}`,config.color);
  log(`${config.text}\n${commandLine}`, config.color)
  cb(e)
  log(`${commandLine}`,config.color);
 }

class Ax{
  constructor(api){
    this.api = api;
  }
  static err(thrown){

    let message = axios.isCancel(thrown)
    ? `[Response]: Request canceled.`:`[ERROR]: Response Server`;
    log(`${commandLine}`,'red');
    log(`** ${message} :\n${commandLine}`, 'red')
    console.log(` ${thrown.message}`);
    log(`${commandLine}\n\n`, 'red')
  }

  async axiosTemplate(type,address,obj){
    const main = this;
    let default_obj = {
      method:type,
      url:`${main.api}${address}`,
      timeout:1000
    };
    if(_.isObject(obj)) _.merge(default_obj,obj);
      log(`${commandLine}`,'green');
      log(`** [Request] GET data :\n${commandLine}`,`green`);
        console.log(default_obj);
      log(`${commandLine}\n\n`,`green`);
    const res = await axios(default_obj)
    .then((response)=>{
      let data = response.data;
      log(`${commandLine}`,'green');
      log(`** [SUCCESS]: Response Server:\n${commandLine}`, 'green')
        console.log(data);
      log(`${commandLine}\n\n`, 'green');
      return response;
    })
    return res
  }
   GET(address,obj){
    return this.axiosTemplate('get',address,obj);
  }
   POST(address,obj){
    return this.axiosTemplate('post',address,obj);
  }
   PUT(address,obj){
    return this.axiosTemplate('put',address,obj);
  }

  async ALL(...axiosFn){
    let myObject = {}
    const res = axios.all(axiosFn)
    .then(axios.spread((...args) => {
      log(`/* [SUCCESS Axios All Start] */`,`green`);
      for (let i = 0; i < args.length; i++) {
        console.log(args[i].config.url.replace(api({log:false}),''));
        myObject[i] = args[i].data;
      }
      log(`/* [SUCCESS Axios All End] */`,`green`);
      return myObject;
    }))
    
    return res;
  }
}



/**
 * Acx
 * const acx = new Acx(api(true),5, true);
 * 이렇게 선언 후 
 * acx.GET(`${api_address.main}/test`)
    .then(function (response) {
      console.log(response.data);
      console.log('GO!');
    })
    .catch(function (err) {
      // axios catch에서 에러나온것.
      console.error(err.message)
    })

  // on 이 이벤트를 주시하는 부분임.
  acx.on('tick', function (i) {
    if (i > 0) log(`[ COUNTDOWN ] : ${i} ..`, 'red')
  });


  //NOTE: 여기를 보면됨 위에는 예전꺼 


  // all
  const acx = new Acx(api(true),2000);이렇게 선언 후

  const a =  acx.GET(`${api_address.main}/test`)
    .then(function (response) {
      // console.log(response.data);
      console.log('GO!');
      return response.data

    })
    .catch(function (err) {
      // axios catch에서 에러나온것.
      console.error(err.message)
    })
    

  const b = acx.GET(`${api_address.main}`)
    .then(function (response) {
      // console.log(response.data);
      console.log('GO!');
      // resolve('go!')
      return 'go!'
    })
    .catch(function (err) {
      // axios catch에서 에러나온것.
      console.error(err.message)
    })


    acx.ALL(a,b).then(value=>{
      console.log('GOGO!');
    })

    // 단독
    let obj_data = {
      api:api_address.main,
      req:req
    }
  await acx.GET(obj_data)
    .then(function (response) {
      let data = response.data;
      res.render('index',data)
      return response.data;
    })
    .catch(function (err) {
      Acx.err(err,res);
      envMode('dev',function(){
        let test = dummy.indexInfo(api_address.main);
        res.render('index',test)
      })
    });


  이런식으로 사용.
  Promise와 합친 async await 임.

 * //답변이 늦으면 페이지 띄우기. 실패 후.


 countdown 함수
  // 바로 카운트 다운 들어감.
  // 제정한 카운트 다운이 모두 끝나면 reject로 프로미스가 종료되고, 보낸 axios를 종료함. 그리고 배열에 들어간 타입아웃들을 모두 종료시킴.


  axios
  //호출되지마다 바로 비동기 때림.
  //success
  // 지정한 초안에 답변이오면 timeout배열 초기화 후 resolve시켜서 프로미스 종료시킴 이떄 resolve로 답변을 프로미스의 then인자값으로 넘김.

  //catch
  //만약 답변이 왔는데 오류일 경우 axios의 catch로 넘어가며, 에러메세지를 출력하고 timeout을 리셋시키고 reject를 시킴.

  // 만약 지정한 초안에 답변이 오지 않으면 아래 countdown 함수에서 axios를 종료시키고 promise를 종료시킨 다음 reject를 날림 이때 axios를 종료될때 axios catch로 들어오게되며 첫번째 if문에서 isCancle에 걸려서 콘솔을 출력함.
 */
class Acx extends EventEmitter{
  constructor(api,seconds, superstitious){
    super();
    this.api = api
    this.seconds = seconds || (1000 * 60);
    this.superstitious = !!superstitious; // 값이 있을때.
  }
  static err(err,res,req){
    envMode('dev',function(){
      log('** Error: Acx Class static err','red');
      if(!_.isUndefined(req)) log(`** URL : ${req.originalUrl}`,'red');
      if (err.response) {
        log(err.response.data);
        log(err.response.status);
        log(err.response.headers);
      } else if (err.request) {
        log(err.request);
      } else {
        log('Error', err.message);
      }
    })
    envMode('prod',function(){
      log('** Error: Acx Class static err','red')
      if(!_.isUndefined(req)) log(`** URL : ${req.originalUrl}`,'red');
      res.render('error',{message:'error',status :404});
   })
  }
    go(type, config){
    const main = this; 
    this.configErr(type,config);

     return  new Promise( function(resolve,reject){
      const timeoutIds = [];
      let token = config.req && config.req.session && config.req.session.user &&config.req.session.user['x-access-token'];
      if(_.isUndefined(token) || _.isNull(token)) token = '';
      let default_obj = {
        method:type,
        url:`${main.api}${config.api}`,
        cancelToken:source.token,
        timeout:main.seconds,
      }
      // default_obj.headers ={ 'Content-Type': 'application/json; charset=utf-8' }
      if(type !== 'get') default_obj.headers ={ 'x-access-token': token };
        // axios
        if(_.isObject(config.data)) {
          default_obj.data = {},
          _.merge(default_obj.data,config.data);
        }
        if(_.isObject(config.headers)) {
          console.log('gwgwg');
          default_obj.headers = {},
          _.merge(default_obj.headers,config.headers);
        }
        log(`${commandLine}`,'green');
        log(`** [Request] Data :\n${commandLine}`,`green`);
        log(default_obj)
        log(`${commandLine}\n\n`,`green`);
  
         axios(default_obj)
          .then(response => {
            // fail : 0,
            // success: 1, 
            // notFound : 2,
            // notEnoughParam : 3,
            // noAffected: 4,
            // err: 5
            if(response.data.result == vars.success){
              log(`${commandLine}`,'green');
              log(`** [SUCCESS]: Response Server:\n${commandLine}`, 'green')
              log(response.data)
              log(`${commandLine}\n\n`, 'green');
              return resolve(response)
            }else if(response.data.result == vars.err){
              log(`${commandLine}`,'red');
              log(`** [Response] Response Data : `,'red');
              log(response.data);
              throw new Error(JSON.stringify(response.data));
              // throw new Error(`Result number is not 1`);
            }else{
              log(`${commandLine}`,'green');
              log(`** [SUCCESS]: Response Server:\n${commandLine}`, 'green')
              log(response.data)
              log(`${commandLine}\n\n`, 'green');
              return resolve(response)
            }
          //답변이 오면  resolve로 프로미스 then으로 넘겨주기.
        })
        .catch(thrown => {
          //딥변이 오지 않거나 오류면 프로미스 catch로 넘겨주기.
          let data = JSON.parse(thrown.message), message;
          if(axios.isCancel(thrown)){
            message = `[CANCLE]: Request timed out. Cancel axios request.`;
          }
          else{
            message =`[ERROR]: Response Server`
          }
          log(`${commandLine}`,'red');
          log(`** ${message} :\n${commandLine}`, 'red');
          log(` - method : ${type}`);
          log(` - Protocol : ${config.req.protocol}`);
          log(` - URL : ${config.req.originalUrl}`);
          log(` - Error: Result number ${data.result}`,'red');
          log(` - Response : ${thrown.message}`)
          log(`${commandLine}\n\n`, 'red');
          return reject(new Error(thrown.message))
        })
    })
  }
  configErr(type,config){
    if(_.isUndefined(config.req) || _.isNull(config.req)){
      log(`${commandLine}`,'red');
      log(`** POST Request`,'red');
      log(`** req key is not defined!`,'red');
      log(`${commandLine}\n\n`,'red')
      throw new Error('acx req key not defined') 
     }

     if(_.isUndefined(config.api)){
      log(`${commandLine}`,'red');
      log(`** ${type.toUpperCase()} Request`,'red');
      log(`** Protocol : ${config.req.protocol}`,'red');
      log(`** URL : ${config.req.originalUrl}`,'red');
      log(`** api key is not defined!`,'red');
      log(`${commandLine}\n\n`,'red')
      throw new Error('acx api key not defined')
    }
    config.data = config.data || {};
  }
  GET(config){
    return this.go('get',config);
  }
  POST(config){
    return this.go('post',config);
  }
  PUT(config){
    return this.go('put',config);
  }
  async ALL(...axiosFn){
    return Promise.all(axiosFn)
    .then(value=>{
      let message = '[ALL] Response Data'
      log(`${commandLine}`,'green');
      log(`** ${message} :\n${commandLine}`, 'green');
      log(value)
      log(`${commandLine}\n\n`, 'green')
      return value;
    })
  }
}

/**
 * 
 * @param {*} target 
 * @param {*} keyWord 
 */
function sepObject(target, keyWord){
  try{
     let newObj =_.reduce(target,(obj,val,key)=>{
       return (!_.startsWith(key,`${keyWord}`))? {...obj,[key] : val}: obj
     },{});
   
     let seqArr = _.reduce(target,function(arr,val,key){
      return (_.startsWith(key,`${keyWord}`))?arr.concat({[key.replace(`${keyWord}`,``)]:val}):arr;
     },[]);

     newObj[keyWord] = seqArr
     return newObj
  }catch(e){
    console.log(e.message);
  }
}


/**
 * seqObjectGetTrue(req.body,`project_`,true,'projectStatus');;
 * 이런식으로 사용함.
 * 첫번째가 받은 인자, 두번째가 첫번재글자로 분리할 이름, 세번째가 true값만 가져올건지, 4번째가 세팅할 이름
 * @param {*} target 
 * @param {*} keyWord 
 * @param {*} setKey 
 * @param {*} bool 
 */
function sepObjectGetTrue(target, keyWord = false,bool = undefined, setKey = undefined){
  
  if(keyWord === false){
    return target
  }
  let seqArr =_.reduce(target,function(arr,val,key){
    return (_.startsWith(key,`${keyWord}`))?arr.concat({[key]:val,active:val, name : key.replace(`${keyWord}`,``)}):arr;
   },[]);

   let newObj =_.reduce(target,(obj,val,key)=>{
    return (!_.startsWith(key,`${keyWord}`))? {...obj,[key] : val}: obj
  },{});
  
  setKey = !_.isUndefined(setKey)? setKey : keyWord;
  //  seqArr 에서 분기해서 new Obj로 만듬.
   if(_.isUndefined(bool)){
     newObj[setKey] = _.map(seqArr, (val,key) => val.name)
   }else if (bool === true){
    let filterArr = _.reduce(seqArr,(arr,val,key)=>(val.active =='true')? arr.concat(val.name) : arr ,[]);
     newObj[setKey] = filterArr;
   }else if (bool === false){
    let filterArr = _.reduce(seqArr,(arr,val,key)=>(val.active =='false')? arr.concat(val.name) : arr ,[]);
     newObj[setKey] = filterArr
   }
   
   return newObj
}

/**
 * sepObjectArrayKeyword(req.body),`project_`,true)
 * 이렇게 사용하고
 * 첫번재인자로 객체를 넣고 두번째 인자로 첫글자로 분기할것, 세번째는 true값만 가져올거냐 false만 가져올거냐, 입력안하면 모두 배열로 가져오게됨.
 * 설정한 값을 배열로 가져옴. 
 * @param {*} target 
 * @param {*} keyWord 
 * @param {*} bool 
 */
function sepObjectArrayKeyword(target, keyWord,bool){
  try{
    if(_.isUndefined(bool)){
      return _.reduce(target,function(arr,val,key){
        if(_.startsWith(key,`${keyWord}`)){
          arr.push(key.replace(`${keyWord}`,``))
        }
        return arr
      },[]);
    }else {
      return _.reduce(target,function(arr,val,key){
        if(_.startsWith(key,`${keyWord}`) && (val == 'on' || JSON.parse(val) == bool)){
          arr.push(key.replace(`${keyWord}`,``))
        }
        return arr
      },[]);
    
    }
 }catch(e){
   console.log(e.message);
 }
}

/**
 * status에는 배열,
 * onSeq에는 비교할 단어
 * 세번재 keyWord에는 제거하고 비교할 키워드.
 * @param {*} status 
 * @param {*} complareWord 
 * @param {*} keyWord 
 */
function isKeywordInArray(status,complareWord,keyWord){
  // if(Array.isArray(complareWord)){
  //   complareWord
  // }else{

  // }
  return Array.isArray(status) && status.includes(complareWord.replace(`${keyWord}`,``)) == true
}

/**
 * 
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));

 */

/**
 * Promise All 활용
 */
const getUsers = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve([{ id: 'jon' }, { id: 'andrey' }, { id: 'tania' }]), 600)
  })
}

// Second promise relies on the resulting array of first promise
const getIdFromUser = users => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(users.id), 500)
  })
}

// Third promise relies on the result of the second promise
const capitalizeIds = id => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(id.toUpperCase()), 200)
  })
}
const runAsyncFunctions = async () => {
  const users = await getUsers()

  Promise.all(
    users.map(async user => {
      const userId = await getIdFromUser(user)
      console.log(userId)

      const capitalizedId = await capitalizeIds(userId)
      console.log(capitalizedId)
    })
  )

  console.log(users)
}


/**
 * 

console.log('\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
console.log('\x1b[33m%s\x1b[0m', stringToMakeYellow);  //yellow
 */
function communication(data, cb = () => {}) {
  if (data.result !== 1) {
    console.log(clc.green, `[     ] Success Communication!`);
    cb(data)
  } else {
    console.log(clc.red, `[     ] Fail Communication!`);
    console.log(clc.red, 'ERROR**: /*=======================================');
    console.log('error', data);
    console.log(clc.red, 'ERROR**: ========================================*/');
    cb(data)
  }
}

/**
 * 
 */
function parserToReplace(url, changeTxt, txt) {
  url = (!_.isEmpty(url)) ? url.replace(txt, changeTxt) : undefined;
  console.log(url, 'parserToReplace');
  return url
}


/**
 * 
 * @param {*} string 
 */
function stringToBoolean(string){
  if(typeof string === 'string'){
    switch(string.toLowerCase().trim()){
        case "true": 
        case "1": return true;
        case "false": 
        case "0": 
        case null: return false;
        default: return null
    }
  }else if (typeof string === 'boolean'){
    return string
  }else{
    return null
  }
}

/**
 * 
 * @param {*} ip 
 */
async function getIpInfo(ip){
  ip = ip || '';
  let ip_info ;
  await axios({
    method: 'get',
    url: `http://ip-api.com/json/${ip}`,
  })
  .then((data)=>{
    console.log(data.data);
    ip_info = data.data
  });
  return ip_info
}
/**
 * getIpTimezoneInfo("MM/DD/YYYY")
 * //=> "07/29/2019"
 * 들어온 ip를 기준으로 현재 locale시간을 반환해줌.
 */
async function getIpTimezoneInfo(format = "MM/DD/YYYY") {
  const val = await getIpInfo();
  const momentData = moment_timezone().tz( val.timezone).format(format)
  return momentData
}

/**
 * 타임스템프를 변환해줌.
 * convert_timestamps(1519482900000)
 * // => 07/29/2019
 */
function convert_timestamps(timestamp, format = "MM/DD/YYYY") {
  return moment(timestamp).format(format);
}

/**
 * 타임스템프를 로컬에맞게 변환해주는 함수가 필요함
 */
function convertLocaleTimeStamps(timestamps,country,format = "MM/DD/YYYY"){
  // return moment.tz(timestamps*1000,country).format(format);
  return moment_timezone(timestamps*1000).tz(country).format(format)
}



/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function mode(mod) {
  let mode_env = process.env.NODE_ENV;
  if (mod == 'dev' && (mode_env === 'development' || mode_env === 'dev')) {
    return mod
  } else if (mod === 'prod' && (mode_env == 'production' || mode_env === 'prod')) {
    return true
  }
  return false
}

/**
 * 
 * @param {*} mod 
 * @param {*} cb 
 */
function envMode(mod,cb) {
  let mode_env = process.env.NODE_ENV;
  if (mod == 'dev' && (mode_env === 'development' || mode_env === 'dev')) {
    return cb()
  } else if (mod === 'prod' && (mode_env == 'production' || mode_env === 'prod')) {
    return cb()
  }
  return false
}


/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function rToBr(txt) {
  return txt.replace(/(\n|\r\n)/g, '<br>');
}


/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function expression(tabName, txt, text,text2 = null) {
  return (tabName === txt) ? text : text2
}


/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function equal(a1, a2) {
  return (a1 === a2) ? 1 : 0
}


/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function checkIncludes(arr, tar) {
  return arr.includes(tar)
}


/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function condiCallback(bool, fn = () => {}, txt = '') {
  return (bool) ? fn(bool) : txt
}



/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function isLoginCk() {
  return (!_.isEmpty(locals.sess.user)) ? true : false;
}

/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function toggleExp(tx1, tx2, exp1, exp2) {
  if (tx1 === tx2) {
    return exp1
  } else {
    return exp2
  }
}

/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function getTimeSet(time = 24) {
  var timeArr = [];
  for (let i = 0; i <= time; i++) {
    timeArr.push({
      time: ((i < 10) ? `0${i}` : `${i}`) + ':00',
      seq: i
    })
  }
  return timeArr
}

/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function shuffle(o) {
  o.sort(function () {
    return 0.5 - Math.random()
  });
  return o;
};

/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function shuffleJoin(o) {
  if (typeof o == 'string') {
    return o.split('').sort(function () {
      return 0.5 - Math.random()
    }).join('')
  }
  o.sort(function () {
    return 0.5 - Math.random()
  });
  return o.join('');
}

/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function zeroNum(n) {
  return (parseInt(n) < 10) ? '0' + n : String(n)
}
/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function randomRating(startNum = 0, endNum = 5) {
  return _.ceil(_.random(startNum, endNum, true), 1).toFixed(1)
}

/**
 * 
 * @param {*} num 
 * @param {*} fixed 
 */
function toFixedRating(num,fixed = 1){
  return (isNull(num))?`0.0`: parseFloat(num).toFixed(fixed)
}

/**
 * 
 * @param {*} something 
 * @param {*} trueVal 
 * @param {*} falseVal 
 */
function isNullExpression(something,trueVal = null,falseVal = null){
  return (isNull(something))?trueVal:falseVal;
}

/**
 * 
 * @param {*} something 
 * @param {*} trueVal 
 * @param {*} falseVal 
 */
function isNotNullExpression(something,trueVal = null,falseVal =null){
  return (!isNull(something))?trueVal:falseVal;
}

function isNotNullDataExpresstion(something,falseVal=null){
  return (!isNull(something))?something:falseVal;
}


/**
 * mode('dev')
 * mode('prod')
 * @param {*} mod 
 */
function formatDuration(seconds, type = 'number') {
  var time = {
      year: 31536000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    },
    res = [];

  if (seconds === 0) return 'now';
  if (type === 'number') {
    for (var key in time) {
      if (seconds >= time[key]) {
        var val = Math.floor(seconds / time[key]);
        res.push(zeroToNum(val))
        seconds = seconds % time[key];
      }
    }
    return res.join(':')

  } else if (type === 'text') {
    for (var key in time) {
      if (seconds >= time[key]) {
        var val = Math.floor(seconds / time[key]);
        res.push(val += val > 1 ? ' ' + key + 's' : ' ' + key);
        seconds = seconds % time[key];
      }
    }
    return res.length > 1 ? res.join(', ').replace(/,([^,]*)$/, ' and' + '$1') : res[0]
  }
}

/**
 * 
 */
function langSelect(current, target) {
  if (current === target) {
    return 'selected'
  }
}


/**
 * 
 * @param {*} rating 
 * @param {*} fixed 
 */
function ratingCount(rating,fixed = 0){
  let num = isNull(rating)?0:rating;
  return num.toFixed(fixed);
}

/**
 * 첫번째 글자를 대문자로 문들어준다.
 * @param {c} str 
 */
function firstCharUpper(str){
  if(typeof str === 'string' && !isNull(str)){
    return str[0].toUpperCase()+ str.substr(1)
  }
}

function setFirstCharUpperAndWhiteSpace(str,bool =false,caseObj = null){
  if(!_.isNull(caseObj)){
    _.chunk(caseObj.case,2).forEach(list=>{
      str = replaceAll(str,list[0],` ${list[1]} `)
    })
  }
  if(bool === true){
    return replaceAll( str,'-',' ').split(' ').map(list => firstCharUpper(list)).join(' ')
  }else{
    return replaceAll( firstCharUpper(str),'-',' ')
  }
}

function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

/**
 * Captcha svg를 생성해준다.
 */
function createSvgCaptcha(){
  return svgCaptcha.create({
    size: 6,
    color: true,
    noise: 1
  })
}


/**
 * 
 * @param {*} query_data 
 */
function queryString(query_data){
  let query_arr = _.reduce(query_data, (arr, val, key) => {
    arr.push(`${key}=${val}`)
    return arr;
  }, []);
  let get_query = query_arr.join('&');
  return get_query;
}


// test
// https://worldtimeapi.org/api/ip/61.36.134.210
// geobytestimezone
// http://gd.geobytes.com/GetCityDetails?callback=?
// http://ip-api.com/json?callback=?
// http://ip-api.com/json
// const ipConfig = {
//   method: 'get',
//   url: 'http://gd.geobytes.com/GetCityDetails?callback=?',
// }

// let timezone_area;
// Axois(ipConfig).then(function (data) {
//   console.log(`*================================\n`)
//   console.log(data.data, `\n`);
//   console.log(`================================*\n`);
//   // console.log(JSON.stringify(data, null, 2));
// });


// https://api.bithumb.com/public/ticker/BTC

  exports.api_path                       = api_path;
  exports.queryString                    = queryString;
  exports.vars                           = vars;
  exports.commandLine                    = commandLine;
  exports.numWithCommas                  = numWithCommas;
  exports.langSelect                     = langSelect;
  exports.log                            = log;
  exports.timeState                      = timeState;
  exports.api                            = api;
  exports.getShortTime                   = getShortTime;
  exports.isNull                         = isNull;
  exports.timeStampToNewDate             = timeStampToNewDate;
  exports.Axois                          = Axois;
  exports.randomRating                   = randomRating;
  exports.zeroNum                        = zeroNum;
  exports.shuffleJoin                    = shuffleJoin;
  exports.shuffle                        = shuffle;
  exports.getTimeSet                     = getTimeSet;
  exports.toggleExp                      = toggleExp;
  exports.isLoginCk                      = isLoginCk;
  exports.condiCallback                  = condiCallback;
  exports.checkIncludes                  = checkIncludes;
  exports.equal                          = equal;
  exports.expression                     = expression;
  exports.rToBr                          = rToBr;
  exports.mode                           = mode;
  exports.convert_timestamps             = convert_timestamps;
  exports.getIpTimezoneInfo              = getIpTimezoneInfo;
  exports.parserToReplace                = parserToReplace;
  exports.communication                  = communication;
  exports.Ax                             = Ax; // axios만 async await로 이용
  exports.Acx                            = Acx;// axios를 async await로 Promise로 이용
  exports.isNullCb                       = isNullCb;
  exports.profilePath                    = profilePath;
  exports.axiosCatchTemplate             = axiosCatchTemplate;
  exports.api_address                    = api_address;
  exports.env                            = require(`${process.cwd()}/config`);
  exports.dummy                          = require('../dummy');
  exports.pageName                       = pageName;
  exports.firstCharUpper                 = firstCharUpper;
  exports.envMode                        = envMode;
  exports.createSvgCaptcha               = createSvgCaptcha;
  exports.pagePath                       = pagePath;
  exports.sepObject                      = sepObject;
  exports.sepObjectGetTrue               = sepObjectGetTrue;
  exports.sepObjectArrayKeyword          = sepObjectArrayKeyword;
  exports.toFixedRating                  = toFixedRating;
  exports.isNullExpression               = isNullExpression;
  exports.isNotNullExpression            = isNotNullExpression;
  exports.profileImagePath               = profileImagePath;
  exports.profileImagePathExpression     = profileImagePathExpression;
  exports.replaceAll                     = replaceAll;
  exports.setFirstCharUpperAndWhiteSpace = setFirstCharUpperAndWhiteSpace;
  exports.formatDuration                 = formatDuration;
  exports.ratingCount                    = ratingCount;
  exports.convertLocaleTimeStamps        = convertLocaleTimeStamps;
  exports.getIpInfo                      = getIpInfo;
  exports.stringToBoolean                = stringToBoolean;
  exports.isNotNullDataExpresstion       = isNotNullDataExpresstion;


// client
exports.isKeywordInArray = isKeywordInArray;
