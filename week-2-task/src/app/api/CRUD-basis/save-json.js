"use server";
import { NextResponse } from "next/server";
import { writeJSONFile } from "~/utils/handleJSON";

export async function saveJSON(request, filePath) {
  try {
    const { data } = await request.json(); // Extract JSON from the request body

    // Basic validation for filePath and data
    if (typeof filePath !== "string" || !filePath.startsWith("src/api/")) {
      return NextResponse.json(
        { message: "Invalid file path" },
        { status: 400 }
      );
    }

    // Call the writeJSONFile function from the service to handle file writing
    await writeJSONFile(filePath, data);

    return NextResponse.json(
      { message: "File written successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
