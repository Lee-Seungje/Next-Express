"use client";

import axios from "axios";
import { useState } from "react";

export default function Test() {
  const [hello, setHello] = useState<string>("");
  const onClick = async () => {
    const res = await axios.get("/api");

    setHello(res.data.res);
  };

  return (
    <>
      <h1>ㅎㅇ</h1>
      <button onClick={onClick}>click</button>
      <span>{hello}</span>
    </>
  );
}
