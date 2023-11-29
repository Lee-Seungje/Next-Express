"use client";

import axios from "axios";
import { useState } from "react";

export default function Test() {
  const [hello, setHello] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [repeatValue, setRepeatValue] = useState<string>("");
  const [resValue, setResValue] = useState<string>("");
  const onClick = async () => {
    const res = await axios.get("/api");

    setHello(res.data.res);
  };

  const getRepeat = async () => {
    const res = await axios.post("/test", {
      value: repeatValue,
      num: parseInt(inputValue),
    });

    setResValue(res.data.repeat);
  };

  return (
    <>
      <h1>ㅎㅇ</h1>
      <button onClick={onClick}>click</button>
      <span>{hello}</span>
      <div>
        <input
          value={repeatValue}
          className="caret-gray-800"
          onChange={(e) => setRepeatValue(e.target.value)}
          placeholder="무엇을 반복할까요?"
        />
        <input
          value={inputValue}
          className="c-caret-gray-800"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="몇 번 반복할까요?"
        />
        <button onClick={getRepeat}>click</button>
        <h1>{resValue}</h1>
      </div>
    </>
  );
}
