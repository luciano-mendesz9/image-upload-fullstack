'use client';

import Navbar from "@/src/components/navbar";

export default function DocsPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <Navbar />

      <main className="w-full max-w-4xl mx-auto mt-10 px-5 pb-20">
        <h1 className="text-4xl font-bold mb-6 text-red-500">
          Documentação da API
        </h1>

        <section className="space-y-10">

          {/* BASE URL */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">📌 Base URL</h2>
            <pre className="bg-black text-white p-4 rounded-lg">
https://image-upload-fullstack.vercel.app
            </pre>
          </div>

          {/* UPLOAD */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">📤 Upload de Arquivo</h2>
            <p className="mb-3">Endpoint responsável por fazer upload de imagens.</p>

            <pre className="bg-gray-900 text-white p-4 rounded-lg">
POST /api/upload
            </pre>

            <h3 className="text-xl font-semibold mt-4 mb-1">Tipos aceitos:</h3>
            <ul className="list-disc ml-6">
              <li>image/png</li>
              <li>image/jpeg / image/jpg</li>
              <li>image/webp</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-1">Limite:</h3>
            <p>Máximo de <strong>2MB</strong>.</p>

            <h3 className="text-xl font-semibold mt-4 mb-1">Body (FormData):</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Campo</th>
                  <th className="p-2">Tipo</th>
                  <th className="p-2">Obrigatório</th>
                  <th className="p-2">Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">file</td>
                  <td className="p-2">File</td>
                  <td className="p-2">✔</td>
                  <td className="p-2">Imagem enviada pelo usuário</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold mt-4 mb-1">Exemplo de requisição:</h3>

            <pre className="bg-black text-white p-4 rounded-lg overflow-auto">
{`const formData = new FormData();
formData.append("file", file);

const res = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});

const data = await res.json();
console.log(data);`}
            </pre>

            <h3 className="text-xl font-semibold mt-4 mb-1">Resposta de sucesso:</h3>

            <pre className="bg-black text-white p-4 rounded-lg overflow-auto">
{`{
  "message": "Upload salvo com sucesso",
  "originalName": "foto.png",
  "savedAs": "uuid-gerado.png",
  "path": "C:/.../src/files/uuid-gerado.png"
}`}
            </pre>
          </div>

          {/* FILES */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">📥 Servir Arquivos</h2>
            <p>A API permite acessar imagens enviadas através da URL dinâmica:</p>

            <pre className="bg-gray-900 text-white p-4 rounded-lg">
GET /files/:filename
            </pre>

            <h3 className="text-xl font-semibold mt-4 mb-1">Exemplo:</h3>
            <pre className="bg-black text-white p-4 rounded-lg">
https://image-upload-fullstack.vercel.app/files/uuid-file.png
            </pre>

            <p className="mt-3">
              O servidor automaticamente define o <strong>Content-Type</strong> correto.
            </p>
          </div>

          {/* ERRORS */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">⚠️ Erros possíveis</h2>
            <ul className="list-disc ml-6">
              <li><strong>400:</strong> Nenhum arquivo enviado</li>
              <li><strong>404:</strong> Arquivo não encontrado</li>
              <li><strong>500:</strong> Erro interno ao salvar ou ler arquivo</li>
            </ul>
          </div>

        </section>
      </main>
    </div>
  );
}
