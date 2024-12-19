import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseError } from "./model";

const host = "http://192.168.1.6:8080/api"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRrejUvb3V2bVVabk9obWlnTzJYUEJPZjRqM1pVUEdiLi5rRHJGbXB5WGxDSnVvODB2VVlhcSIsInVzZXJuYW1lIjoiMDM3NDA2MDE2NSIsImF1dGhvcml0aWVzIjpbXSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImFjY291bnROb25Mb2NrZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZSwiZW5hYmxlZCI6dHJ1ZSwiaWQiOjEsImV4cCI6MTczNDcxMDc2NH0.mKgk_j211r3RmpVBRUTPOpcnATvypFz9rYJrNYlnkJE"

export async function getRequest<R extends BaseModel, B extends BaseDTO>(paths: string, params: B): Promise<R> {
  const response = await axios.get(`${host}/${paths}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params
  });
  return response.data;
}

export async function postRequest<B extends BaseDTO>(paths: string, body: B): Promise<AxiosError | AxiosResponse> {
  try {
    const response = await axios.post(`${host}/${paths}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    return response;

  }catch (error) {
    return <ResponseError> error;
  }
}

export async function putRequest<B extends BaseDTO>(paths: string, body: B): Promise<AxiosError | AxiosResponse> {
  try {
    const response = await axios.put(`${host}/${paths}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;

  }catch (error) {
    return <ResponseError> error;
  }

}