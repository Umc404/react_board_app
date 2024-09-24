import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './board.css';
import axios from 'axios';

const BoardDetail = () => {

    const { id } = useParams();
   
    // 특정 조건을 만족하는 요소의 index를 찾는 함수 findIndex()
    // boardList.findIndex(b=>b.id === Number(id))
    // params는 String 으로 값을 가져옴 ===> 따라서 Number로 형변환
    // 굳이 findIndex를 사용하는 이유 id의 값과 index(boardList의 index)가 맞지 않기 때문

    // const idx = BoardList.findIndex(d=>d.id === Number(id));

    const [ detail, setDetail ] = useState([]);

    const getDetailData = async () => {
        try {
            const brDetail = await axios(`/detail/${id}`);
            // console.log(brDetail);
            setDetail(brDetail.data[0]);
            console.log(brDetail.data[0]);
        }catch{
            console.log('error');
        }
    }
    useEffect(()=>{
        getDetailData();
    },[]);

    const onDelete = async () => {
        if(window.confirm('삭제하시겠습니까?')) {
            await axios.get(`/delete/${id}`)
            window.location.href='/';
            
        }
    }


    return (
        <div className='boardDetail'>
            <table className='table'>
                <thead>
                    <tr>
                        <td>
                            <h3>{detail.title}</h3>
                            <span>
                                조회수 : {detail.conCnt}
                            </span>
                            <span>
                                {detail.reg_date}
                            </span>
                            <span>
                                작성자 : {detail.writer}
                            </span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <h3>{detail.contents}</h3>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='links'>
                <Link to={"/"}>
                    <button>목록</button>
                </Link>
                <Link to={`/update/${id}`}>
                    <button>게시글 수정</button>
                </Link>
                <button onClick={onDelete}>삭제</button>
            </div>
        </div>
    );
};

export default BoardDetail;