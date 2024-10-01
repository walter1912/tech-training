"use server";

import { NextResponse } from "next/server";
import { readJSONFile } from "~/utils/handleJSON";

export async function getJSON(request, filePath) {
  try {
    // Call the readJSONData function from the service to read the file
    const data = await readJSONFile(filePath);

    return NextResponse.json(
      data,
      { status: 200 },
      { message: "Complete get data json!" }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
