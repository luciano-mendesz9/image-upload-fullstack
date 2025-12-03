'use client';

import Navbar from "@/src/components/navbar";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [filename, setFilename] = useState("");

  async function onHandleUpload() {
    setIsLoading(true);
    setUploaded(false);

    if (!file) {
      const next = confirm('Selecione um arquivo para upload');
      if (next) {
        document.getElementById("fileInput")?.click();
      }
      setIsLoading(false);
      return;
    };

    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 2MB");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setUploaded(true);
      setFile(null);
      setReady(false);
      setFilename(data.savedAs);
      setIsLoading(false);
    }

  }

  return (
    <div className="h-full w-full">
      <Navbar />

      <main className="w-full h-full flex flex-col items-center justify-center">

        <p>Faça o upload de seus arquivos jpg, png, webp ou jpeg de até 2MB.</p>
        <div
          className="
    w-[90%] max-w-[700px] h-[300px]  
    border-dashed border-2 border-gray-500 
    flex items-center justify-center 
    mt-7 mb-7 cursor-pointer
    bg-gray-200 hover:bg-gray-300
  "
          style={{
            backgroundImage: file ? `url(${URL.createObjectURL(file)})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {!file && (
            <span>Clique para selecionar sua imagem</span>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            id="fileInput"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setReady(true);
              }
            }}
          />
        </div>


        {ready && file && (
          <>
            <span className="text-[14px] font-normal text-black">Arquivo: {file.name}</span> <br />
            <button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="text-red-400 underline cursor-pointer font-semibold mb-7"
            >
              Escolher outro arquivo
            </button>
          </>
        )}

        {uploaded && (
          <>
            <span className="text-green-600 font-semibold mb-7">Upload realizado com sucesso!</span>
            {/* // sua url */}
            <div className="mb-7">
              URL do arquivo: <a href={`/files/${filename}`} target="_blank" className="text-blue-600 underline">/files/{filename}</a>
            </div>
          </>
        )}

        <button
          onClick={onHandleUpload}
          disabled={isLoading}
          className="bg-red-400 w-[90%] max-w-[700px] text-white font-semibold p-3.5 cursor-pointer rounded-2xl hover:bg-red-800"
        >
          {isLoading ? "Enviando..." : "Enviar arquivo"}
        </button>
      </main>
    </div>
  );
}
