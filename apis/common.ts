import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import axios, { AxiosError, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as _ from "lodash";

const host = `${process.env.EXPO_PUBLIC_SERVER_HOST}/api`;
export async function getRequest<B extends BaseDTO>(paths: string, params: B): Promise<AxiosResponse | AxiosError> {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${host}/${paths}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });
    return response;
  }catch (error) {
    const response = error as AxiosError;

    const isRefresh = await checkRefresh(response);
    if(!isRefresh) {
      return response;
    }
    const refreshData = await refresh();
    if(!refreshData) {
      return response;
    }
    return getRequest(paths, params)
  }
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
    const response = error as AxiosError;
    const isRefresh = await checkRefresh(response);
    if(!isRefresh) {
      return response;
    }
    const refreshData = await refresh();
    if(!refreshData) {
      return response;
    }
    return postRequest(paths, body, headers)
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
    const response = error as AxiosError;
    const isRefresh = await checkRefresh(response);
    if(!isRefresh) {
      return response;
    }
    const refreshData = await refresh();
    if(!refreshData) {
      return response;
    }
    return putRequest(paths, body, headers)
  }
}

export async function deleteRequest<B extends BaseDTO>(paths: string, params: B): Promise<AxiosError | AxiosResponse> {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(`${host}/${paths}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });
    return response;
  }catch(error) {
    const response = error as AxiosError;
    const isRefresh = await checkRefresh(response);
    if(!isRefresh) {
      return response;
    }
    const refreshData = await refresh();
    if(!refreshData) {
      return response;
    }
    return deleteRequest(paths, params)
  }
  
}

async function check () {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${host}/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.status;
  }catch (error) {
    return (error as AxiosError).status
  }
  
}

async function checkRefresh(error: AxiosError) {
  const response = error as AxiosError;
  if(response.status !== 401) {
    return false
  }
  const status = await check();
  if(status === 200){
    return false;
  }

  return true
}

async function refresh() {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if(_.isEmpty(refreshToken)) {
    await AsyncStorage.clear()
    return false
  }
  try {
    const response = await postRequest("auth/u/refresh", {
      refreshToken
    })
    const data = (response as AxiosResponse).data;
    await AsyncStorage.setItem("token", data.token);
    return true
  }catch(error) {
    await AsyncStorage.clear()
    return false
  }
}