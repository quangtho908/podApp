import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseError } from "./model";

export async function getRequest<R extends BaseModel, B extends BaseDTO>(paths: string, params: B): Promise<R> {
  const response = await axios.get(`http://192.168.9.200:8080/api/${paths}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRrejUvb3V2bVVabk9obWlnTzJYUEJPZjRqM1pVUEdiLi5rRHJGbXB5WGxDSnVvODB2VVlhcSIsInVzZXJuYW1lIjoiMDM3NDA2MDE2NSIsImF1dGhvcml0aWVzIjpbXSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImFjY291bnROb25Mb2NrZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZSwiZW5hYmxlZCI6dHJ1ZSwiaWQiOjEsImV4cCI6MTczNDY2NTMwMn0.oxabGxFjt2SLc4EwfvMx9Z81_6zLwCSpizs-KqQAFu4"
    },
    params
  });
  return response.data;
}

export async function postRequest<B extends BaseDTO>(paths: string, body: B): Promise<AxiosError | AxiosResponse> {
  try {
    const response = await axios.post(`http://192.168.9.200:8080/api/${paths}`, body, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRrejUvb3V2bVVabk9obWlnTzJYUEJPZjRqM1pVUEdiLi5rRHJGbXB5WGxDSnVvODB2VVlhcSIsInVzZXJuYW1lIjoiMDM3NDA2MDE2NSIsImF1dGhvcml0aWVzIjpbXSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImFjY291bnROb25Mb2NrZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZSwiZW5hYmxlZCI6dHJ1ZSwiaWQiOjEsImV4cCI6MTczNDY2NTMwMn0.oxabGxFjt2SLc4EwfvMx9Z81_6zLwCSpizs-KqQAFu4"
      },
    })
    return response;

  }catch (error) {
    return <ResponseError> error;
  }

}