import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../modules/user';

const Main = () => {

    const {isLogin, CurrentUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlelogout = () => {

        localStorage.removeItem("jwtToken") // 토큰 삭제
        dispatch(setUser({})) // 리덕스 초기화
        dispatch(setUserStatus(false))
    }

    const locationGoogle = () => {
        window.location.href = "http://localhost:8000/auth/google";
    }

    const locationKakao = () => {
        window.location.href = "http://localhost:8000/auth/kakao";
    }

    const locationnaver = () => {
        window.location.href = "http://localhost:8000/auth/naver";
    }

    return (
        <S.Wrapper>
            <S.ImageWrapper>
                <img src={process.env.PUBLIC_URL + "/images/main/penguin.png"} />
            </S.ImageWrapper>
            <S.ButtonWrapper>
                {isLogin? (
                    <BasicButton 
                    onClick = {handlelogout}
                    size={"full"} shape={"small"} variant={"black"} color={"white"}
                    >로그아웃</BasicButton>
                ) : (
                <>
                <Link to={"/sign-in"} >
                    <BasicButton 
                    size={"full"} shape={"small"} variant={"black"} color={"white"}
                    >로그인</BasicButton>
                </Link>

                <div>
                <S.IconButton onClick={locationKakao}>
                    <img src={process.env.PUBLIC_URL + "/images/main/kakaotalk.png"} />
                </S.IconButton>
                <S.IconButton onClick={locationGoogle}>
                    <img src={process.env.PUBLIC_URL + "/images/main/google.png"} />
                </S.IconButton>
                <S.IconButton onClick={locationnaver}>
                    <img src={process.env.PUBLIC_URL + "/images/main/naver.png"} />
                </S.IconButton>
            </div>
            
                
               
                <Link to={"/sign-up"} >
                    <BasicButton 
                    size={"full"} shape={"small"} variant={"black"} color={"white"}
                    >회원가입</BasicButton>
                </Link>
                </>
                )}
                
            </S.ButtonWrapper>

            
        </S.Wrapper>
        
    );
};

export default Main;