"use client";
export async function saveData(data, url) {
  let message = "";
  let status = 404;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }), // Send filePath and data
    });
    const result = await response.json();
    status = response.status;
    message = result.message;
  } catch (error) {
    message = "Error: " + error.message;
  }
  return {
    message,
    status,
  };
}
