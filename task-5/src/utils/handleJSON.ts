"use server";
import fs from "fs/promises";
import path from "path";

// reading file JSON
export async function readJSONFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const jsonData = await fs.readFile(fullPath, "utf8");
    const dataObj = JSON.parse(jsonData);
    const isEmpty = Object.values(dataObj).every((value) => value === "");
    if (isEmpty) {
      throw new Error("File is empty");
    }
    return dataObj;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // Handle the case where the file is not found
      throw new Error("Error reading file: File not found");
    } else if (error.name === "SyntaxError") {
      // Handle JSON parsing errors
      throw new Error(
        "Error reading file: Unexpected token i in JSON at position 0"
      );
    } else {
      // Handle other possible errors
      throw new Error(`Error reading file: ${error.message}`);
    }
  }
}

// Function to write data to a JSON file
export async function writeJSONFile(filePath: string, data: object) {
  const fullPath = path.join(process.cwd(), filePath);

  // Validate the file path to prevent directory traversal attacks
  if (
    (!fullPath.startsWith(process.cwd()) && !filePath.startsWith("src/api")) ||
    path.resolve(filePath).includes("..")
  ) {
    throw new Error("Invalid file path");
  }
  // Check if the object is empty
  if (Object.keys(data).length === 0) {
    throw new Error("Data object cannot be empty");
  }
  try {
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf8");
    return {
      status: 200,
      message: "write file success",
    };
  } catch (error: any) {
    throw new Error(`Error writing file: ${error.message}`);
  }
}
