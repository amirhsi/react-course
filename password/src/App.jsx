import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMOPQRTWUXYZabcdefghijklmnopqrstuvwxyz";

    if (isCharAllowed) str += "!@#$%^&*()_+";
    if (isNumberAllowed) str += "0123456789";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [isCharAllowed, isNumberAllowed, length]);

  const passwordRef = useRef(null);

  const copyPass = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [isCharAllowed, isNumberAllowed, length, generatePassword]);

  return (
    <div className="w-full max-w-md shadow-md text-orange-500 py-3 my-8 bg-gray-800 px-4">
      <h1 className="text-white text-center my-3">Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPass}
          className="outline-none bg-blue-700 text-white px-3 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={isNumberAllowed}
            onChange={() => {
              setIsNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={isCharAllowed}
            onChange={() => {
              setIsCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Char</label>
        </div>
      </div>
    </div>
  );
}

export default App;
