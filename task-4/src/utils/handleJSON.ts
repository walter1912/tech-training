"use server";
import fs from "fs/promises";
import path from "path";

// reading file JSON
export async function readJSONFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const jsonData = await fs.readFile(fullPath, "utf8");
    return JSON.parse(jsonData);
  } catch (error: any) {
    throw new Error(`Error reading file: ${error.message}`);
  }
  
}

// Function to write data to a JSON file

// Function to write data to a JSON file
export async function writeJSONFile(filePath: string, data: object) {
  const fullPath = path.join(process.cwd(), filePath);

  // Validate the file path to prevent directory traversal attacks
  if (!fullPath.startsWith(process.cwd())) {
    throw new Error('Invalid file path');
  }

  try {
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error: any) {
    throw new Error(`Error writing file: ${error.message}`);
  }
}