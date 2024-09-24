// 설치한 라이브러리 변수로 받아오기
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

//express 사용하기 위한 app 생성
const app = express();

//express 사용할 서버포트 설정
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

//DB 접속
const db = mysql.createConnection({
    host : 'localhost',
    user: 'react',
    password: 'mysql',
    port:'3306',
    database:'db_react'
});

// express 접속
app.listen(PORT, ()=>{
    console.log(`server connecting on : http://localhost:${PORT}`);
});

//db 연결
db.connect((err)=>{
    if(!err){
        console.log("success");

    }else{
        console.log("fail");
    }
});

//---------- DB에서 값을 가져오기 ----------

// / => root 연결 시 보여지는 기본화면 설정
app.get('/',(req, res)=> {
    res.send("React Server Connect Success.");
})
// 게시글 목록 가져오기
app.get('/list',(req, res)=>{
    console.log('/list');
    const sql = 'select * from board order by id desc';
    db.query(sql, (err, data)=>{
        if(!err) {
            res.send(data);
        }else{
            console.log(err);
            res.send('전송 오류');
        }
    })
});

// 게시글 하나 가져오기 :id
// 화면에서 서버로 요청하는 값 : request(req)
// 서버에서 화면으로 보내주는 값 : response(res)
// 화면에서 가져온 파라미터 추출 : req.params.id
app.get('/detail/:id',(req, res)=> {
    // 파라미터 가져오기
    const id = req.params.id;
    console.log('param_id : '+id);
    // console.log('/detail');
    const sql = `select title, contents, writer, date_format(reg_date,'%Y-%m-%d') as reg_date, conCnt from board where id=${id}`
    db.query(sql, (err, data)=>{
        if(!err) {
            res.send(data);
        }else{
            console.log(err);
            res.send('전송 오류');
        }
    })
})
// 조회수
app.post('/view/:id', (req, res)=> {
    const id = req.params.id;
    console.log(id)
    const sql=`update board set conCnt = conCnt + 1 where id=${id}`
    db.query(sql, (err, data)=> {
        if(!err) {
            res.send(data);
            console.log(data);
        }else {
            console.log(err);
            res.send('전송 오류');
        }
    })
})
// board 등록
app.post('/insert', (req, res)=> {
    // 파라미터 가져오기 request.body
    const { title, writer, contents } = req.body;

    const sql = `insert into board (title, writer, contents) values (?,?,?)`;

    db.query(sql, [title, writer, contents], (err, data)=> {
        if(!err) {
            res.send(data);
            // res.sendStatus(200); // 전송 잘 됨.
        }else{
            console.log(err);
            res.send('전송 오류');
        }
    })
})

app.post('/update/:id', (req, res)=> {
    // 파라미터 추출
    const id = req.params.id;
    const { title, writer, contents } = req.body;
    const sql = `update board set title=?, writer=?, contents=? where id=?`;

    db.query(sql, [title, writer, contents, id], (err, data)=> {
        if(!err) {
            res.send(data);
            console.log(data);
            // res.sendStatus(200);
            // res.send(data)와 같은 뜻이며 같이 넣으면 데이터베이스 연결 끊김
        }else{
            console.log(err);
            res.send('전송 오류');
        }
    })
})
// 삭제
app.get('/delete/:id', (req, res)=> {
    const id = req.params.id;
    const sql = `delete from board where id=${id}`;
    db.query(sql, (err, data)=> {
        if(!err) {
            res.send(data);
        }else{
            console.log(err);
            res.send('전송 오류');
        }
    })
})
// 검색
app.get('/:index/:search', (req, res)=> {
    const search = req.params.search;
    const index = req.params.index;
    // console.log(index)
    // console.log(search)
    // const {index, search} = req.body;
    const sql=`select * from board where ${index} like '%${search}%'`;
    db.query(sql, (err, data)=> {
        if(!err) {
            res.send(data);
            console.log(data);
        }else {
            console.log(err);
            res.send('전송 오류');
        }
    })
})
