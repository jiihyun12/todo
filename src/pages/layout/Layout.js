
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCreditCard, faHouse, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../modules/user';

const Layout = () => {

  // 최초 사용자가 토큰을 가지고 있는지 확인하고, 토큰 요청을 보낸다.
  // 토큰 요청시 만료되었다면 삭제하고, 만료가 되지 않았다면 자동으로 로그인 시킨다.
  const { currentUser, isLogin } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();


  const jwtToken = localStorage.getItem("jwtToken") || searchParams.get("jwtToken");
  const navigate = useNavigate()

  useEffect(() => {

    if(jwtToken){
      localStorage.setItem("jwtToken", jwtToken)
      navigate("/")
    }

    if(jwtToken){
      const isAuthenticate = async () => {
        const response = await fetch("http://localhost:8000/auth/jwt", {
          method : "POST",
          headers : {
            "Authorization" : `Bearer ${jwtToken}`
          }
        })
        const getAuthenticate = await response.json();
        return getAuthenticate;
      }

      isAuthenticate()
        .then((res) => {
          console.log(res)
          // 3) 화면에 뿌릴 수 있도록 유저정보를 파싱(redux)
          dispatch(setUser(res.user)) // currentUser
          dispatch(setUserStatus(true)) // isLogin
        })
        .catch(console.error)

    }else {
      dispatch(setUser({})) // currentUser
      dispatch(setUserStatus(false)) // isLogin
      localStorage.clear()
    }
      
  }, [jwtToken])

  return (
    <S.Background>
      <S.Wrapper>

        <S.Header>
          <Link to={"/todo"}>Jihyun Todo</Link>
        </S.Header>

        <S.Main className='main'>
          <Outlet />
        </S.Main>

        <S.Nav>
          <NavLink to={"/"}>
            <FontAwesomeIcon icon={faHouse} className='icon' />
            <p>피드</p>
          </NavLink>
          <NavLink to={"/search"}>
            <FontAwesomeIcon icon={faSearch} className='icon' />
            <p>검색</p>
          </NavLink>
          <NavLink to={"/notice"}>
            <FontAwesomeIcon icon={faBell} className='icon' />
            <p>알림</p>
          </NavLink>
          <NavLink to={"/payment"}>
            <FontAwesomeIcon icon={faCreditCard} className='icon' />
            <p>결제</p>
          </NavLink>
          <NavLink to={"/my"}>
            <FontAwesomeIcon icon={faUser} className='icon' />
            <p>My</p>
          </NavLink>
        </S.Nav>
      </S.Wrapper>
    </S.Background>
  );
};

export default Layout;