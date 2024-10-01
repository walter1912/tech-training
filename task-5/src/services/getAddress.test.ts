// Import the function to be tested

import { getAddress } from "./addressService";

// Define the type for your address data
interface Address {
  address: string;
  city: string;
}

// Mock the global fetch function
global.fetch = jest.fn();

describe('getAddress', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Clear mock calls and reset mock implementations after each test
  });
// CASE 1: GET DATA SUCCESS
  it('should return data from the API', async () => {
    // Sample data to be returned by the mock fetch
    const mockData: Address[] = [
      { address: '123 Main St', city: 'Springfield' },
      { address: '456 Elm St', city: 'Shelbyville' },
    ];

    // Set up the mock fetch implementation
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    // Call the function and check the result
    const data = await getAddress();
    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('api/addresses');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
// CASE 2: 
  it('should handle errors from the API', async () => {
    // Set up the mock fetch to simulate a failed request
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    // Expect the function to throw an error
    await expect(getAddress()).rejects.toThrow('Network error');
  });

});
