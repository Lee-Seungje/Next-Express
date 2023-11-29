"use client";

import axios from "axios";

export default function Test() {
  const onClick = () => {
    axios.get("/api");
  };

  return (
    <>
      <h1>ㅎㅇ</h1>
      <button onClick={onClick}>click</button>
    </>
  );
}
