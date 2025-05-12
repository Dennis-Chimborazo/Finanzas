import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

// funcion para obtener el token almacenado en el localStore
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

// funcion para obtener el id del usuario almacenado en el localStore
const getId = (): number | null => {
  const loginData = localStorage.getItem("user");
  if (loginData) {
    const parsedData = JSON.parse(loginData);

    if (parsedData && parsedData.personData && parsedData.personData.personId) {
      return parsedData.personData.personId.personId;
    }
  }

  return null;
};


/**
 * Esta clase se usa para manejar 
 * las consultas con la api nestJS
 */
class ApiService {
  static async checkout(getApi: string, navigate: NavigateFunction): Promise<void> {
    const token = getToken();

    try {
      const response: AxiosResponse = await axios.get(apiUrl + getApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
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

  // Metodo para registrar el usuario
  static async save<T>(postApi: string, form: T): Promise<any> {
    const token = getToken();
    const response: AxiosResponse = await axios.post(apiUrl + postApi, form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  }


  //Metodo para logear el usuario
  static async login(): Promise<any> {
    const token = getToken();
    const response: AxiosResponse = await axios.post(apiUrl +'auth/login', {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  }

  //Metodo para obtener las cuentas por el usuario id
  static async search(getApi: string): Promise<any[]> {
    const id=getId();
    const token = getToken();
    const response: AxiosResponse = await axios.get(apiUrl + `${getApi}?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
    });
    return Array.isArray(response.data) ? response.data : [];
  }

  static async update<T>(putApi: string, id: string, form: T): Promise<any> {
    const token = getToken();
    const response: AxiosResponse = await axios.put(apiUrl + "/" + putApi + "/" + id, form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  }

  static async delete(deleteApi: string, id: string): Promise<any> {
    const token = getToken();
    const response: AxiosResponse = await axios.delete(apiUrl + "/" + deleteApi + "/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      }
    });
    return response.data;
  }
}

export default ApiService;
