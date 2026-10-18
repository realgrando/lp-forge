import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "custom-templates.json");

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify({ templates: [], sectionPacks: [] }, null, 2),
      "utf-8"
    );
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ templates: [], sectionPacks: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDataFile();
    const body = await req.json();
    const payload = {
      templates: Array.isArray(body.templates) ? body.templates : [],
      sectionPacks: Array.isArray(body.sectionPacks) ? body.sectionPacks : [],
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to save templates" },
      { status: 500 }
    );
  }
}
