import React, { useState } from 'react';

function Input(props) {
  const [input, setInput] = useState('');

  /**
   * Method for handle input event
   * and return to HOC Component
   * @param {*} event event
   */
  const handleInput = event => {
    if (event.key === 'Enter') {
      props.onInputChange(input);
      setInput('');
    }
  };

  /**
   * Method for set input value
   * @param {*} event
   */
  const handleChange = event => {
    setInput(event.target.value);
  };

  return (
    <>
      <div className="row px-3">
        <input
          type="text"
          name="location"
          placeholder="Ingrese la locación a buscar"
          className="mb-5"
          value={input}
          onChange={handleChange}
          onKeyPress={handleInput}
        />
      </div>
    </>
  );
}

export default Input;
