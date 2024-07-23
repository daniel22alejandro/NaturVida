// src/app/api/swagger/route.js
import { NextResponse } from "next/server";
import swaggerDocs from "@/lib/swagger";

export async function GET() {
  return NextResponse.json(swaggerDocs);
}
