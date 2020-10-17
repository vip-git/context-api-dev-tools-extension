import React, { useState } from 'react';
import { useTodosDispatch } from '../contexts/TodosContext';

function TodoForm() {
  const [value, setValue] = useState('');
  const dispatch = useTodosDispatch();

  const formStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '50%'
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      text: value
    });
    setValue('');
  };

  return (
		<form onSubmit={onSubmit} style={formStyles}>
			<input
				value={value}
				placeholder='What are you planning to do?'
				onChange={(e) => setValue(e.target.value)}
				style={{
					padding: 10,
          borderRadius: 5,
          flexBasis: '35%'
				}}
			/>
			<button
				style={{
					padding: 10,
					marginLeft: 10,
					borderRadius: 5,
				}}
			>
				Create
			</button>
		</form>
	);
}

export default TodoForm;
