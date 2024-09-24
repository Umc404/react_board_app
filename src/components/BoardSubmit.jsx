import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BoardSubmit = () => {
    
    const [inputs, setInputs] = useState({
        title:'',
        writer:'',
        contents:''
    })
    
    const { title, contents, writer } = inputs;
    
    const onChange = (e) => {
        const{ name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        })
    }
    
    const onCreate = async () => {
        // board 객체를 서버로 전송
        // board 객체의 내용 중 하나라도 null 이면 안됨.
        if(title ==='') {
            alert('title is null');
            return;
        }
        if(writer ==='') {
            alert('writer is null');
            return;
        }
        if(contents ==='') {
            alert('contents is null');
            return;
        }
        if(window.confirm('등록하시겠습니까?')) {
            try{
                const res = await axios.post('/insert', inputs);
                console.log(res);
                window.location.href = "/";
            }catch (error) {
                console.log(error);
            }
        }
        
    }
    
    const onReset = () => {
        setInputs({
            ...inputs,
            title:'',
            writer:'',
            contents:''
        })
    }

    return (
        <div className='boardSubmit'>
            <div className='submitArea'>
                <h3>게시글 등록</h3>
                <textarea
                    type="text"
                    placeholder='제목'
                    name='title'
                    className='title'
                    onChange={onChange}
                    value={title}
                /><br />
                <textarea
                    type="text"
                    placeholder='작성자'
                    name='writer'
                    className='writer'
                    onChange={onChange}
                    value={writer}
                /><br />
                <textarea
                    type="text"
                    placeholder='내용을 입력하세요.'
                    name='contents'
                    className='contents'
                    onChange={onChange}
                    value={contents}
                /><br />
                    <button onClick={onCreate}>등록</button>
                <Link to={"/"}>
                    <button>목록</button>
                </Link>
                
            </div>
        </div>
    );
};

export default BoardSubmit;