import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './board.css';
// import BoardHome from './BoardHome';

const BoardSearch = () => {

    const { searchIndex, search } = useParams();
    console.log(search);
    // db에 저장되어 있는 board 요소를 가져오기 => boardList 저장
    
    const [ searchList, setSearchList ] = useState([]);

    // 비동기로 db에 접속하여 select로 가져오기
    // get : 데이터 가져올 때(생략 가능) => axios.get = axios
    // post : 데이터를 보낼 때 (반드시 써야함. 생략안됨.)

    const getBoardData = async () => {
        try {
            const searchResult = await axios.get(`/search/${index}/${search}`);
            console.log(searchResult);
            setSearchList(searchResult.data);
        }catch{
            console.log('error');
        }
    }
    // 컴포넌트가 랜더링 될 때, 혹은 업데이트 될 때 실행되는 hooks
    /*
        useEffect(()=>{
        function    },[deps]);
        - function : 실행시킬 함수.
        - deps : 배열형태로 배열안에서 검사하고자 하는 특정 값
    */
    useEffect(()=>{
        getBoardData();
    },[]);
    // 서버에서 데이터를 가져오는 것보다 화면에서 랜더링되는 속도가 빠름.
    // 조건을 걸어줘서 error 방지

    // search
    const [searchText, setSearchText] = useState({
        index:'',
        search:''
    });

    const { text } = searchText;
    
    const onChange = (e) => {
        console.log(e.target.value) // 요거 참고해서 갈아엎기
        const{ name, value } = e.target;
        setSearchText({
            ...searchText,
            [name]: value
        })
    }

    const [ index, setIndex ] = useState('title');

    // select 태그 선택 제목 || 작성자
    const onSelect = (e) => {
        setIndex(e.target.value);
        // indexVal = index;
        console.log(index);
    }

    const onSearch = async ()=> {
        console.log(searchText.search)
        if( searchText.search ==='') {
            alert('검색항목을 입력하세요.');
            return;
        }
        else {
            searchText.index = index;
            const res = searchText;
            window.location.href =`/search/${res.index}/${res.search}`;
            return await axios.get(`/search/${res.index}/${res.search}`);
            console.log(res); // 
        }
    }
    // search 엔터 이벤트
    const onSearchEnter = (e) => {
        if(e.key === 'Enter') {
            // 콘솔 확인
            console.log('enter 입력');
            console.log(searchText.search);
            // 엔터
            onSearch(searchText.search);
        }
    }
    // search end
    if(searchList.length>0){ 
        return (
            <div className='boardSearch'>
                <Link to ={'/'}><h2>Board List page</h2></Link>
                <div className='tableArea'>
                    {/* 나중에 셀렉트 태그로 분류 나누기 제목/작성자 */}
                        <div className='search'>
                        <select name="searchIndex" value={searchIndex} onChange={onSelect}>
                                <option value="title">제목</option>
                                <option value="writer">작성자</option>
                            </select>
                            <input type="text"
                                className='searchText'
                                name='search'
                                defaultValue={search}
                                onChange={onChange}
                                onKeyDown={onSearchEnter}
                            />
                            {/* <Link to={`/search/${searchText.search}`}> */}
                                <button onClick={onSearch}>search</button>
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchList.map(d => (
                                        <tr key={d.id}>
                                            <td>{d.id}</td>
                                            <td>
                                                <Link to={`/detail/${d.id}`}>{d.title}</Link>
                                            </td>
                                            <td>{d.writer}</td>
                                            <td>{d.reg_date.substring(0,10)}</td>
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
            <div className='boardSearch'>
                <Link to ={'/'}><h2>Board List page</h2></Link>
                    <div className='tableArea'>
                        <div className='search'>
                        <select name="searchIndex" value={index} onChange={onSelect}>
                                <option value="title">제목</option>
                                <option value="writer">작성자</option>
                            </select>
                            <input type="text"
                                className='searchText'
                                name='search'
                                value={text}
                                onChange={onChange}
                            />
                            <Link to={`/search/${searchText.search}`}>
                                <button onClick={onSearch}>search</button>
                            </Link>
                            </div>
                    {/*  */}
                        <table>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>제목</td>
                                    <td>작성자</td>
                                    <td>작성일자</td>
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

export default BoardSearch;