import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoInsert from './TodoInsert';

const TodoContainer = () => {

  // 7분
  // http://localhost:4000/todo로 투두를 요청하여 console.log에 출력하기
  // 단 useState로 데이터를 넣고, 넣은 데이터를 출력한다.
  // 모든 비동기 요청은 사이드이팩트가 발생할 수 있다.
  const [todos, setTodos] = useState([]); 

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

  }, [isTodoUpdate]) 

  console.log(todos)

  


  return (
    <div>
        <TodoInsert isTodoUpdate={isTodoUpdate} handleIsTodoUpdate={handleIsTodoUpdate} />
      <p className='subTitle' >남은 할일 : 😥 <span>{todos && todos.filter( ( {isChecked} )=> !isChecked ).length}</span></p> 
      <ul>
        { todos && todos.map((todo, i) => (
          <Todo isTodoUpdate={isTodoUpdate} handleIsTodoUpdate={handleIsTodoUpdate}
          todo={todo} key={i}         
          />
        )) }
      </ul>
    </div>
  );
};

export default TodoContainer;