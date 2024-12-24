import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseError } from "./model";
import cache from "@/service/cache";

const host = "http://192.168.9.200:8080/api"
export async function getRequest<R extends BaseModel, B extends BaseDTO>(paths: string, params: B): Promise<R> {
  const token = await cache.get("token");
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
    const token = await cache.get("token");
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
  const token = await cache.get("token");
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

export async function deleteRequest<B extends BaseDTO>(paths: string, params: B): Promise<AxiosError | AxiosResponse> {
  const token = await cache.get("token");
  const response = await axios.delete(`${host}/${paths}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params
  });
  return response;
}