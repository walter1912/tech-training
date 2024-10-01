"use client";
export async function saveData(
  data: object,
  url: string
): Promise<{
  message: string;
  status: number;
}> {
  let message: string = "";
  let status : number = 404;
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
  } catch (error: any) {
    message = "Error: " + error.message;
  }
  return {
    message,
    status,
  };
}
