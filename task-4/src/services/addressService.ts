"use client";
import { saveData } from "./fetch-basis/saveData";

const url = "api/addresses";

export async function saveAddress(data: object) {
  const response =  await saveData(data, url);
  return response;
}
export async function getAddress() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}