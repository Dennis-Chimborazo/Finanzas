import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";

const apiUrl = "http://localhost:3000/";

const getToken = (): string => {
  const tokenInfo = localStorage.getItem("login");
  try {
    const parsed = tokenInfo ? JSON.parse(tokenInfo) : null;
    return parsed?.token || "";
  } catch (error) {
    console.error("Error parsing token from localStorage", error);
    return "";
  }
};

class ApiService {
  static async checkout(getApi: string, navigate: NavigateFunction): Promise<void> {
    const token = getToken();

    try {
      const response: AxiosResponse = await axios.get(apiUrl +"/"+getApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.data.message === "Token no proporcionado" ||
        response.data.message === "Token inválido o expirado"
      ) {
        navigate("/");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error en traerDatos", error);
    }
  }

  static async save<T>(postApi: string, form: T): Promise<any> {
    const token = getToken();
    console.log("Desde ApiService el token: ")
     console.log(token)
    const response: AxiosResponse = await axios.post(apiUrl + postApi, form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  }

  static async search(getApi: string, id: string | number): Promise<any[]> {
    const token = getToken();
    const response: AxiosResponse = await axios.get(apiUrl + `${getApi}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return Array.isArray(response.data) ? response.data : [];
  }

  static async update<T>(putApi: string,id: string, form: T): Promise<any> {
    const token = getToken();
    const response: AxiosResponse = await axios.put(apiUrl+ "/"+ putApi+"/"+id, form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async delete(deleteApi: string,id: string): Promise<any> {
    const token = getToken();
    const response: AxiosResponse = await axios.delete(apiUrl + "/"+  deleteApi +"/"+id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }
}

export default ApiService;
