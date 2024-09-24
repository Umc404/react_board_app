import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const BoardUpdate = () => {

    const { id } = useParams();

    // 값 가져오기
    const [ detail, setDetail ] = useState(null);
    
    const getDetailData = async () => {
        try {
            const res = await axios(`/detail/${id}`);
            setDetail(res.data[0]);
            console.log(res.data[0]);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getDetailData();
    },[]);
    
    // 변경코드 짜기
    const onChange = (e) => {
        const{ name, value } = e.target;
        setDetail({
            ...detail,
            [name]: value
        });
    }
    
    const onUpdate = async () => {
        
        try{
            const res = await axios.post(`/update/${id}`, detail);
            console.log(res);
            window.location.href = `/detail/${id}`
        } catch(error) {
            console.log(error);
        }
    }
    
    if(detail !== null){ 
        return (
            <div className='boardUpdate'>
                <h3>게시글 수정</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>
                            <textarea type="text" placeholder='제목' name='title' className='title'
                            onChange={onChange} value={detail.title}/>
                            </td>
                        </tr>
                            <td>
                                <span>
                                    <textarea type="text" placeholder='작성자' name='title' className='title'
                                    onChange={onChange} value={detail.writer}/>
                                </span>
                            </td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            <textarea type="text" placeholder='내용을 입력하세요' name='contents' className='contents'
                                onChange={onChange} value={detail.contents}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='links'>
                    <button onClick={onUpdate}>수정</button>
                    <Link to={"/"}>
                        <button>목록</button>
                    </Link>
                </div>            
                    
            </div>
        );
    }
};

export default BoardUpdate;