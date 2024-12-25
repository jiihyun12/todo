import React, { useEffect } from 'react';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import { useForm } from 'react-hook-form';


const Update = () => {

  // 이메일 양식 @, . 이메일 주소를 포함한 패턴을 지켜야 합니다.
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
        await fetch(`http://localhost:8000/users/modify`, {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ 
             email : email,
             password : password
        })
      })
      .then((res)=>res.json())   
      .then((res)=>console.log(res)) 
    })}>
      

      <S.Label>
        <S.Title>이름</S.Title>
        <S.Input
          type="text" placeholder="이름을 입력하세요" autoComplete='off'
          {...register("name")}
        />
       
      </S.Label>

      <S.Label>
        <S.Title>나이</S.Title>
        <S.Input
          type="text" placeholder="나이를 입력하세요" autoComplete='off'
          {...register("age")}
        />
       
      </S.Label>

      <S.Label>
        <S.Title>휴대폰</S.Title>
        <S.Input
          type="text" placeholder="휴대폰번호를 입력하세요" autoComplete='off'
          {...register("phone")}
        />
       
      </S.Label>

      <BasicButton size={"full"} shape={"small"}  variant={"black"} color={"white"} 
        disabled={isSubmitting}
      >
        회원 정보 수정
      </BasicButton>
    </S.Form>
  );
};

export default Update;