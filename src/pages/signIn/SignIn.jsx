import React, { useEffect } from 'react';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

  // 로그인 이후 처리
  const { isLogin, currentUser} = useSelector(state =>state.user)
  const dispatch = useDispatch();
  // console.log(isLogin, currentUser)

  const navigate = useNavigate();

  // 이메일 양식 @, . 이메일 주소를 포함한 패턴을 지켜야 합니다.
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  console.log()
  const { register, handleSubmit, getValues, 
          formState: { isSubmitting, isSubmitted, errors } 
        } = useForm({ mode : "onChange" });

  return (
    <S.Form onSubmit={handleSubmit( async (data)=>{
      console.log(data)
      // 회원가입 데이터 요청하기
      // fetch()이용, localhost:8000

      const {email, password} = data;
        await fetch(`http://localhost:8000/auth/local`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ 
             email : email,
             password : password
        })
      })
      .then((res)=>res.json())   
      .then((res)=>{
      if(!res.ok){alert(res.message)}
      // 정상 응답 및 로그인 처리
      // 1) 받은 token 정보를 저장
      localStorage.setItem("jwtToken", res.jwtToken);
      // 2) 리다이렉트 해야 하는 페이징 처리
      navigate("/")
      // 3) 화면에 뿌릴 수 있도록 유저정보를 파싱(redux)
      console.log(res)

    }) 

    })}>

      <S.Label>
        <S.Title>이메일</S.Title>
        <S.Input 
          id="email" type="text" placeholder="이메일을 입력하세요" autoComplete='off'
          {...register("email", {
            required : true,
            pattern : {
              value : emailRegex
            }
          })}

        />
        {errors?.email?.type === 'required' && (
          <S.ConfirmMessage>이메일을 입력해주세요</S.ConfirmMessage>
        )}
        {errors?.email?.type === 'pattern' && (
          <S.ConfirmMessage>이메일을 양식을 확인해주세요</S.ConfirmMessage>
        )}
      </S.Label>

      <S.Label>
        <S.Title>비밀번호</S.Title>
        <S.Input
          id="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete='off'
          {...register("password",{
            required : true,
            pattern : {
              value : passwordRegex,
            }
          })}
        />
        { errors?.password?.type === 'required' && (
          <S.ConfirmMessage>비밀번호를 입력하세요</S.ConfirmMessage>
        )}
        { errors?.password?.type === 'pattern' && (
          <S.ConfirmMessage>소문자, 숫자, 특수문자를 각 하나씩 포함한 8자리 이상이어야 합니다</S.ConfirmMessage>
        )}
      </S.Label>

      <BasicButton size={"full"} shape={"small"}  variant={"black"} color={"white"} 
        disabled={isSubmitting}
      >
        로그인
      </BasicButton>
    </S.Form>
  );
};

export default SignIn;