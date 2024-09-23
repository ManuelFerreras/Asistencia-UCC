"use client";

import { useEffect, useState } from "react";
import S from "./home.module.css";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [token, setToken] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if ((codigo.length === 6 || codigo.length === 7) && token.length === 6) {
      setValid(true);
    } else {
      setValid(false);
    }
  }
    , [codigo, token]);

  const submit = async () => {
    if (codigo.length < 6 || codigo.length > 7 || token.length !== 6) {
      alert("Codigo o Token invalido");
      return;
    }

    const res = await fetch("/api/attend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo, token }),
    });

    const data = await res.json();

    alert(data?.message);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className={S.title}>Registrar Asistencia UCC</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className={S.inputArea}>
          <label className={S.label} htmlFor="codigo">Codigo UCC</label>
          <input className={S.input} maxLength={7} type="text" pattern="\d*" id="codigo" onChange={
            (e) => {
              setCodigo(e.target.value);
            }
          } />
        </div>

        <div className={S.inputArea}>
          <label className={S.label} htmlFor="token">Token Asistencia</label>
          <input className={S.input} maxLength={6} type="text" pattern="\d*" id="token" onChange={
            (e) => {
              setToken(e.target.value);
            }
          } />
        </div>

        <button className={S.button} disabled={!valid} onClick={submit}>Registrar Asistencia</button>
      </main>
    </div>
  );
}
