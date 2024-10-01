import { writeJSONFile } from "./handleJSON";
import fs from "fs/promises";

jest.mock("fs/promises", () => ({
  writeFile: jest.fn(),
}));
// because data before pass to writeJSONFile() had been validated (check null, empty,..)
// so data always is standard type. => I done  check CASE INVALID DATA.
describe("writeJSONFile", () => {
  let mockWriteFile: jest.Mock;

  beforeEach(() => {
    mockWriteFile = fs.writeFile as jest.Mock;
  });
  // CASE 1:  INVALID FILE PATH
  it("should throw an error for invalid file path", async () => {
    const invalidFilePath = "invalid/../../path/file.json";
    const data = {
      fullname: "Test Success",
      email: "test@email.com",
    };

    await expect(writeJSONFile(invalidFilePath, data)).rejects.toThrow(
      "Invalid file path"
    );
  });
  //  CASE 2: SUCCESS
  it("should write data to file successfully", async () => {
    const validFilePath = "src/api/account.json";
    const data = {
      fullname: "Test Success",
      email: "test@email.com",
    };

    // Mock the writeFile to simulate success
    mockWriteFile.mockResolvedValueOnce(undefined);

    // Verify that writeFile was called with correct parameters
    const result = await writeJSONFile(validFilePath, data);

    // Expect status 200 and success message
    expect(result).toEqual({
      status: 200,
      message: 'write file success',
    });
  });

  // CASE 3: DATA IS EMPTY OBJECT
  it("should throw an error if data object is empty", async () => {
    const validFilePath = "src/api/account.json";
    const invalidData = {}; // This is an empty object

    await expect(writeJSONFile(validFilePath, invalidData)).rejects.toThrow(
      "Data object cannot be empty"
    );
  });
});
