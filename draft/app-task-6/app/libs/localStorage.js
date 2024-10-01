// Set an item in localStorage
export function setLocalStorage(key, value) {
    try {
      const serializedValue = JSON.stringify(value); // Convert value to a JSON string
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to window.", error);
    }
  }
  
  // Get an item from localStorage
  export function getLocalStorage(key) {
    try {
      const serializedValue =  window.localStorage.getItem(key); // Retrieve item as string
      if (serializedValue === null) {
        return null; // Return null if key does not exist
      }
      return JSON.parse(serializedValue); // Parse back to object
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  }
  
  // Remove an item from localStorage
  export function removeLocalStorage(key) {
    try {
        window.localStorage.removeItem(key); // Remove item by key
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }
  