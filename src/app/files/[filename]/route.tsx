'use server';
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;

  const filePath = path.join(process.cwd(), "src", "files", filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Arquivo não encontrado" },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(filePath);

  const ext = filename.split(".").pop()?.toLowerCase();

  const mime =
    ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : ext === "webp"
      ? "image/webp"
      : "application/octet-stream";

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

