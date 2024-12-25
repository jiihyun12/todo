import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';
import S from './style';

const MyPage = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user)

  // 프로필
  const pictureRef = useRef(null)
  const [selectedFile, setSElectedFile] = useState(null)
  const [picturePath, setPicturePath] = useState("no-member.jpg")

  useEffect(() => {
    if(!jwtToken){
      navigate("/", { replace : true })
    }
  }, [jwtToken])

  const handleLogout = () => {
    localStorage.clear()
    dispatch(setUser({}))
    dispatch(setUserStatus(false))
    navigate("/") // 로그아웃 후 리다이렉트 경로
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 업로드하는 파일
    if(file){
      // 미리보기 경로 업로드
      const fileURL = URL.createObjectURL(file)
      setPicturePath(fileURL) 
    }
  }

  const savePicture = async () => {
    const formData = new FormData();
    formData.append("picture", pictureRef.current.files[0])

    const config = {
      method : "POST",
      headers : {
        Authorization : `Bearer ${jwtToken}`,
      },
      body: formData //multipart/formData를 body에 보낸다.
    }

    await fetch("http://localhost:8000/users/picture", config)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res) // 어떤 데이터가 들어왔는지 출력
        const newPicturePath = res.filePath;
        setPicturePath(`http://localhost:8000${newPicturePath}`)
      })
      .catch(console.error)
  }

  return (
    <S.Wrapper>
      <div>
        <S.Button className='Button' onClick={handleLogout}>로그아웃</S.Button>
      </div>
      <S.Wrapper>
        <S.Label htmlFor='profile'>
          <S.Profile src={picturePath} alt="프로필 이미지" />
        </S.Label>
        <p>{currentUser.name}님 환영합니다.</p>
        <input 
          ref={pictureRef}
          onChange={handleFileChange} style={{display:"none"}} type="file" 
          name="picutre" id="profile" 
        />
        <S.Button onClick={savePicture}>프로필 이미지 변경</S.Button>
      </S.Wrapper>
    </S.Wrapper>
  );
};

export default MyPage;