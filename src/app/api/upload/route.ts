import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();
    const newFileName = `${uuid()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "src", "files");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, newFileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: "Upload salvo com sucesso",
      originalName: file.name,
      savedAs: newFileName,
      path: filePath,
      success: true,
    });
  } catch (error) {
    console.error("Erro ao processar o upload:", error);
    return NextResponse.json({
      message: "Erro ao processar o upload",
      originalName: null,
      savedAs: null,
      path: null,
      success: false,
    });
  }
}
