"use server";
import { saveJSON } from "../CRUD-basis/save-json";
import { getJSON } from "../CRUD-basis/get-json";

const filePath = "src/api/account.json"; // Path to the JSON file
export async function POST(request) {
  return await saveJSON(request, filePath);
}

export async function GET(request) {
  return await getJSON(request, filePath);
}
