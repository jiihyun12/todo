// Todo 컴포넌트로 삭제 처리 함수(handleDeleteTodo)를 전달하고, 삭제가 성공적으로 이루어지면 상태를 업데이트해서 화면에 반영한다.

import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoInsert from './TodoInsert';

const TodoContainer = () => {

  // 7분
  // http://localhost:4000/todo로 투두를 요청하여 console.log에 출력하기
  // 단 useState로 데이터를 넣고, 넣은 데이터를 출력한다.
  // 모든 비동기 요청은 사이드이팩트가 발생할 수 있다.
  const [todos, setTodos] = useState([]); // db에서 데이터가 배열로 들어가있으므로 초기값이 배열

  const [ isTodoUpdate, setIsTodoUpdate ] = useState(false);
  const handleIsTodoUpdate = () => {
    setIsTodoUpdate(!isTodoUpdate)
  }

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("http://localhost:4000/todo");
        const datas = await response.json();
        return datas;
      } catch (error) {
        console.error(error)
      }
    }

    getTodos()
    .then(setTodos)
    .catch(console.error)

  }, [isTodoUpdate]) // isTodoUpdate가 변경될 때마다 투두 목록을 다시 가져온다.

  console.log(todos)

  

  return (
    <div>
        <TodoInsert isTodoUpdate={isTodoUpdate} handleIsTodoUpdate={handleIsTodoUpdate} />
      <p className='subTitle' >남은 할일 : 😥 <span>{todos && todos.length}</span></p>  { /* 비동기 데이터는 
                                                                                            데이터가 있을지 없을지 모르므로 
                                                                                            && 연산자를 붙이면 더 안전하게 처리할 수 있다.
                                                                                             있을 때만 처리하도록 */}
      <ul>
        { todos && todos.map((todo, i) => (
          <Todo todo={todo} key={i} />
        )) }
      </ul>
    </div>
  );
};

export default TodoContainer;