"use client";

import { saveData } from "./fetch-basis/saveData";

const url = "api/accounts";

export async function saveAccount(data: object)  {
  const response = await saveData(data, url);
  return response;
}

export async function getAccount() {
  const response = await fetch(url);
  const data = await response.json();
 return data;
}
