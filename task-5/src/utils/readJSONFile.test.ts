import { readJSONFile } from "./handleJSON";
import fs from "fs/promises";

// Mock fs.readFile
jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
}));

describe("readJSONFile", () => {
  let mockReadFile: jest.Mock;

  // Use beforeEach to set up the mock before each test
  beforeEach(() => {
    mockReadFile = fs.readFile as jest.Mock;
  });

  // CASE 1: CATCH ERROR IF READING FILE FAILS
  it("should throw an error if reading the file fails", async () => {
    mockReadFile.mockRejectedValueOnce(new Error("File not found"));

    await expect(readJSONFile("src/api/notfound.json")).rejects.toThrow(
      /Error reading file: File not found/
    );
  });

  // CASE 2: CATCH ERROR IF JSON PARSING FAILS
  it("should throw an error if JSON parsing fails", async () => {
    mockReadFile.mockResolvedValueOnce("invalid JSON"); // Simulate invalid JSON

    await expect(readJSONFile("src/api/account.json")).rejects.toThrow(
      /Error reading file: Unexpected token i in JSON at position 0/
    );
  });

  // CASE 3: SUCCESSFUL FILE READ
  it("should read the file successfully", async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        fullname: "Hồ Bá Thái",
        email: "walter.thaiho@gmail.com",
      })
    );

    const data = await readJSONFile("src/api/account.json");

    expect(data).toMatchObject({
      fullname: expect.any(String),
      email: expect.any(String),
    });
    expect(data.fullname).not.toBe("");
    expect(data.email).not.toBe("");
  });
  // CASE 4: EMPTY OBJECT
  it("should throw an error if received empty json", async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        fullname: "",
        email: "",
      })
    );
    await expect(readJSONFile("src/api/account.json")).rejects.toThrow(
      /File is empty/
    );
  });
});
