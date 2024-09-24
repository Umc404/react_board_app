import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './board.css';

const BoardList = () => {

    // db에 저장되어 있는 board 요소를 가져오기 => boardList 저장
    const [ boardList, setBoardList ] = useState([]);

    const {id} = useParams();
    // 비동기로 db에 접속하여 select로 가져오기
    // get : 데이터 가져올 때(생략 가능) => axios.get = axios
    // post : 데이터를 보낼 때 (반드시 써야함. 생략안됨.)
    const getBoardData = async () => {
        try {
            const boards = await axios('/list');
            // console.log(boards);
            setBoardList(boards.data);
        }catch{
            console.log('error');
        }
    }
    
    // const getSearchData = async () => {
    //     try {
    //         const boards = await axios.get(`/search/${searchText.index}/${searchText.search}`);('/list');
    //         // console.log(boards);
    //         setBoardList(boards.data);
    //     }catch{
    //         console.log('error');
    //     }
    // }
    useEffect(()=>{
        getBoardData();
    },[]);

    // 컴포넌트가 랜더링 될 때, 혹은 업데이트 될 때 실행되는 hooks
    /*
        useEffect(()=>{
        function    },[deps]);
        - function : 실행시킬 함수.
        - deps : 배열형태로 배열안에서 검사하고자 하는 특정 값
    */
    // 서버에서 데이터를 가져오는 것보다 화면에서 랜더링되는 속도가 빠름.
    // 조건을 걸어줘서 error 방지

    // search
    const [searchText, setSearchText] = useState({
        index:'',
        search:''
    });
    
    // const { text } = searchText;
    
    const onChange = (e) => {
        const{ name, value } = e.target;
        console.log(value)
        setSearchText({
            ...searchText,
            [name]: value
        })
    }
    // select 태그 선택자
    const [ index, setIndex ] = useState('title');
    
    const onSelect = (e) => {
        setIndex(e.target.value);
        searchText.index = e.target.value;
        // indexVal = index;
        console.log(index);
    }
    // 검색창 공란일 시 이벤트 발생. 그 후 이전으로 리턴
    const onSearch = async ()=> {
        // console.log(indexVal)
        // console.log(searchText.search);
        if( searchText.search ==='') {
            alert('검색항목을 입력하세요.');
            return;
        }
        else {
            searchText.index = index;
            const searchData = await axios.get(`/${searchText.index}/${searchText.search}`);
            setBoardList(searchData.data);
            console.log(searchData)
            // useEffect(()=>{
            //     getBoardData();
            // },[]);

            console.log(searchText); // 
            console.log(index);
            // console.log(searchText); // r객체
        }
    }
    // search 엔터 이벤트
    const onSearchEnter = (e) => {
        if(e.key === 'Enter') {
            // 콘솔 확인
            console.log('enter 입력');
            console.log(searchText);
            // 엔터
            onSearch(searchText);
        }
    }
    // search end
    // page connect count
    const conCount = async (id) => {
        await axios.post(`/view/${id}`, id);
        window.location.href=`/detail/${id}`
    }



    if(boardList.length>0){ 
        return (
            <div className='boardList'>
                <Link to={'/'}><h2>Board List page</h2></Link>
                <div className='tableArea'>
                    {/* 나중에 셀렉트 태그로 분류 나누기 제목/작성자 */}
                        <div className='search'>
                            <select name="searchIndex" value={index} onChange={onSelect}>
                                <option value="title">제목</option>
                                <option value="writer">작성자</option>
                            </select>
                            <input type="text"
                                className='searchText'
                                name='search'
                                value={searchText.search}
                                onChange={onChange}
                                onKeyDown={onSearchEnter}
                            />
                            {/* <Link to={`/${searchText.index}/${searchText.search}`}> */}
                                <button onClick={onSearch}>검색</button>
                            {/* </Link> */}
                            </div>
                        <table>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>제목</td>
                                    <td>작성자</td>
                                    <td>작성일자</td>
                                    <td>조회수</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    boardList.map(d => (
                                        <tr key={d.id}>
                                            <td>{d.id}</td>
                                            <td>
                                                <Link onClick={()=> conCount(d.id)}>{d.title}
                                                {/* to={`/detail/${d.id}`} */}
                                                </Link>
                                            </td>
                                            <td>{d.writer}</td>
                                            <td>{d.reg_date.substring(0,10)}</td>
                                            <td>{d.conCnt}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    <Link to="/submit">
                        <button>게시글 작성</button>
                    </Link>
                </div>
            </div>
        );
    }else{
        return (
            <div className='boardList'>
                <Link to={'/'}><h2>Board List page</h2></Link>
                    <div className='tableArea'>
                        <div className='search'>
                            <select name="searchIndex" value={index} onChange={onSelect}>
                                <option value="title">제목</option>
                                <option value="writer">작성자</option>
                            </select>
                            <input type="text"
                                className='searchText'
                                name='search'
                                value={searchText.search}
                                onChange={onChange}
                            />
                            {/* <Link to={`/search/${searchText.index}/${searchText.search}`}> */}
                                <button onClick={onSearch}>검색</button>
                            {/* </Link> */}
                            </div>
                    {/*  */}
                        <table>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>제목</td>
                                    <td>작성자</td>
                                    <td>작성일자</td>
                                    <td>조회수</td>
                                </tr>
                            </thead>
                        </table>
                        <Link to="/submit">
                        <button>게시글 작성</button>
                    </Link>
                </div>
            </div>
        );
    }

};

export default BoardList;