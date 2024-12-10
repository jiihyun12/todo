import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import S from './style';
import useInput from '../../hooks/useInput';

const Todo = ({todo}) => {
  // console.log(todo) // 먼저 확인해보기

  const { id, title, content, userId, isChecked } = todo; // 콘솔에서 확인한 친구들 가져오기
  
  const [value, onChange, setValue] = useInput(title);

  const [ isEdit, setIsEdit ] = useState(false);
  const handleIsEdit = () => {
    setIsEdit(!isEdit) // 기존에 있는 값을 반대로 바꿔주는 역할
  }

  // 투두 삭제
  //
  

  return (
    <S.Li>
      <S.Wrapper>
        <input type="checkbox" />
          { isEdit ? (
            <input className='update-input' value={value} onChange={onChange} />
          ) : (
            <S.Title>
              {title}
            </S.Title>
          )}
      </S.Wrapper>
      <S.Wrapper>
        { isEdit ? (
          <>
            <S.Button><FontAwesomeIcon icon={faCheck} className='check' /></S.Button>
            <S.Button onClick={handleIsEdit}><FontAwesomeIcon icon={faX} className='exit' /></S.Button>
          </>
        ) : (
          <S.Button onClick={handleIsEdit}><FontAwesomeIcon icon={faPen} className='pen' /></S.Button>
        )}
        <S.Button><FontAwesomeIcon icon={faTrash} className='trash' /></S.Button>
      </S.Wrapper>
    </S.Li>
  );
};

export default Todo;