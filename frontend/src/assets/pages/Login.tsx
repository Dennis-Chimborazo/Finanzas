import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseAuthService from '../../util/firebasetoken';
import { Toaster, toast } from "sonner";
import ApiService from "../service/ApiService";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  interface PersonData {
    personId: number;
    identificationType: string;
    dni: string;
    name: string;
    lastName: string;
    DateOfBirth: string;
    addres: string;
    phoneNumber: string;
    profileFotoUrl: string;
  }

  interface CustomTokenPayload {
    userId: number;
    firebaseUid: string;
    email: string;
    personId: PersonData;
  }


  const navigate = useNavigate();

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let resToken: string | null = null;// Aquí puedes usar let porque luego asignarás el valor

    if (email == '' || password == '') {
      toast.error("Complete all required fields");

    } else {
      //consumo el servicio de firebase para logearme y obtener el token
      resToken = await FirebaseAuthService.loginAndGetToken(email, password);
      if (resToken) {
        localStorage.setItem("login", JSON.stringify({
          login: true,
          token: resToken,
        }));
        
        //consumo el servicio de la api para obtener los datos del usuario
        let response=await ApiService.login();
        /**
         * 
         * console.log(response.personId.personId);
         * 
         * 
         */
        //almaceno el usuario en el localStore
        localStorage.setItem("user", JSON.stringify({
          user: true,
          personData: response
        }));

        navigate("/dashboard");
      } else {
        toast.error("Incorrect username or password ");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center px-4">
      <Toaster position="top-center" visibleToasts={1} duration={3000} richColors />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Illustration & Info */}
        <div className="bg-gradient-to-br from-green-200 to-green-100 p-10 flex flex-col justify-center">
          <img
            src="/images/banner.png"
            alt="Secure login"
            className="w-2/3 mx-auto mb-6 drop-shadow-xl"
          />
          <h2 className="text-xl font-semibold text-blue-900 mb-2 text-center">
            Stay safe and secure
          </h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>🔐 Never share your credentials.</li>
            <li>🪪 Double-check your email and password before logging in.</li>
            <li>🌐 Ensure you're on the official website.</li>
          </ul>
          <p className="text-xs text-center mt-10 text-gray-500">
            © 2025 FinanceApp. All rights reserved.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
            Sign in to your account
          </h2>

          {error && (
            <div className="mb-4 bg-red-100 text-red-700 text-sm text-center font-medium p-2 rounded">
              {error}
            </div>
          )}

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border px-4 py-2 rounded-md text-sm shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••"
                className="w-full border px-4 py-2 rounded-md text-sm shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={login}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
            >
              Log In
            </button>
          </form>

          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <a href="#" className="hover:underline hover:text-blue-700">
              Forgot email?
            </a>
            <a href="#" className="hover:underline hover:text-blue-700">
              Forgot password?
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center text-sm">
            <button className="border border-gray-300 py-2 rounded hover:bg-gray-50 transition">
              🔓 Unlock account
            </button>
            <button className="border border-gray-300 py-2 rounded hover:bg-gray-50 transition">
              🆕 Register now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
