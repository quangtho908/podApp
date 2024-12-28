import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseError } from "./model";
import AsyncStorage from "@react-native-async-storage/async-storage"

const host = `${process.env.EXPO_PUBLIC_SERVER_HOST}/api`;
export async function getRequest<R extends BaseModel, B extends BaseDTO>(paths: string, params: B): Promise<R> {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${host}/${paths}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params
  });
  return response.data;
}

export async function postRequest<B extends BaseDTO>(paths: string, body: B, headers = {}): Promise<AxiosError | AxiosResponse> {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(`${host}/${paths}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers
      },
    })
    return response;

  }catch (error) {
    return <ResponseError> error;
  }
}

export async function putRequest<B extends BaseDTO>(paths: string, body: B, headers = {}): Promise<AxiosError | AxiosResponse> {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.put(`${host}/${paths}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers
      }
    })
    return response;

  }catch (error) {
    return <ResponseError> error;
  }
}

export async function deleteRequest<B extends BaseDTO>(paths: string, params: B): Promise<AxiosError | AxiosResponse> {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.delete(`${host}/${paths}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params
  });
  return response;
}