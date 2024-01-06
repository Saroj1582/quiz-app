import { useRef } from "react";

function Start({ setUsername }) {
  const inputRef = useRef();

  function handleClick() {
    inputRef.current.value && setUsername(inputRef.current.value);
  }

  return (
    <>
      <div className="startContainer">
        <div className="start">
          <input
            className="inputStart"
            type="text"
            placeholder="Enter your username"
            ref={inputRef}
          />
          <button onClick={handleClick} className="inputButton">
            Start
          </button>
        </div>
      </div>
    </>
  );
}

export default Start;
