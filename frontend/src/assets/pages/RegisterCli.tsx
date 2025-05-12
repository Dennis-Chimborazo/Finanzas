import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CameraPreview from "../components/CameraPreview";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "sonner";
import ApiService from "../service/ApiService";
import FirebaseAuthService from "../../util/firebasetoken";


const RegisterCli: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const auth = getAuth();

  const [form, setForm] = useState({
    identificationType: "DNI",
    dni: "",
    name: "",
    lastName: "",
    DateOfBirth: "",
    addres: "",
    phoneNumber: "",
    profileFotoUrl: "ssss",
  });

  const [accountdata, setAccountData] = useState({
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

  const verifyPasswords = () => {
    if (accountdata.passwordOne !== accountdata.passwordTwo) {
      toast.error("The passwords do not match");
      return false;
    }
    return true;
  };

  const verifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (accountdata.email.trim() === "") {
      toast.error("Email is required");
      return false;
    }
    if (!emailRegex.test(accountdata.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const checkFields = () => {
    if (
      !form.identificationType ||
      !form.name ||
      !form.lastName ||
      !form.DateOfBirth ||
      !form.addres ||
      !form.phoneNumber 
   //   !form.profileFotoUrl
    ) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

   //Función para guardar el usuario
  const saveUser = async () => {
    if (checkFields() && verifyPasswords() && verifyEmail()) {
      let response: string | null = null;
      let resToken: string | null = null;

      //obtengo el token de firebase
      const jwtFirebase = await FirebaseAuthService.registerWithLoginAndGetToken(accountdata.email, accountdata.passwordOne);
      resToken = jwtFirebase;
      // almaceno el token en el localstorage
      localStorage.setItem(
        "login",
        JSON.stringify({
          token: resToken,
        })
      );
      //llamo al servicio de api para guardar el usuario
      response = await ApiService.save("auth/register", form);
      localStorage.setItem(
        "login",
        JSON.stringify({
          login: true,
          token: resToken,
          personData: response,
        })
      );
      navigate("/dashboard");
    }
  };

  const handleChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountData({ ...accountdata, [e.target.name]: e.target.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
     // setForm({ ...form, profileFotoUrl: imageUrl });
    }
  };

  const handleOpenCamera = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <Toaster
        position="top-center"
        visibleToasts={1}
        duration={3000}
        richColors
      />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white rounded-xl shadow-md overflow-hidden">
        {/* Columna izquierda */}
        <div className="bg-white p-10 flex flex-col justify-center items-center text-center">
          <img
            src="/images/banner.png"
            alt="Banner"
            className="w-52 h-auto mb-6 drop-shadow-xl rounded-lg"
          />
          <h1 className="text-2xl font-bold text-blue-900 mb-4">
            Abre su cuenta transaccional
          </h1>
          <p className="text-gray-700 text-sm mb-4">
            Ahorra dinero de forma segura y úsalo cuando lo necesites para
            transferencias o pagos.
          </p>
          <ul className="text-blue-900 text-sm space-y-2">
            <li>
              ⏱ Regístrate en <strong>10 minutos</strong>
            </li>
            <li>
              💰 Depósito inicial: <strong>$0</strong>
            </li>
            <li>
              🎂 Edad mínima: <strong>18+</strong>
            </li>
            <li>
              🪪 Tipo de identificación: <strong>Ecuatoriano</strong>
            </li>
          </ul>
        </div>

        {/* Columna derecha */}
        <div className="bg-gray-50 p-10">
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
            Empecemos
          </h2>

          <form onSubmit={handleContinue} className="space-y-4">
            {/* Foto + Nombre y Apellido */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6 mb-4">
              <div className="flex flex-col items-center justify-center">
                {showCamera ? (
                  <div>

                    <CameraPreview
                      className="w-63 h-44"
                      onCapture={(imageData) => {
                        setPreview(imageData);
                   //     setForm({ ...form, profileFotoUrl: imageData });
                        setShowCamera(false);
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowCamera(false)}
                      className="mt-2 text-sm text-red-600 hover:underline"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border mb-2"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500 mb-2">
                        Sin foto
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <div className="flex gap-2 text-sm">
                      <button
                        type="button"
                        onClick={handleOpenCamera}
                        className="text-blue-700 hover:underline"
                      >
                        Subir desde galería
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCamera(true)}
                        className="text-blue-700 hover:underline"
                      >
                        Usar cámara
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 gap-4 mt-4 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded text-sm"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded text-sm"
                  required
                />
                <input
                  type="text"
                  name="dni"
                  placeholder="Número de identificación"
                  value={form.dni}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded text-sm"
                  required
                />


              </div>
            </div>

            {/* Resto del formulario */}

            <input
              type="date"
              name="DateOfBirth"
              value={form.DateOfBirth}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded text-sm"
              required
            />
            <input
              type="text"
              name="addres"
              placeholder="Dirección"
              value={form.addres}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded text-sm"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Número de teléfono"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded text-sm"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={accountdata.email}
              onChange={handleChangeAccount}
              className="w-full border px-4 py-2 rounded text-sm"
              required
            />
            <input
              type="password"
              name="passwordOne"
              placeholder="Contraseña"
              value={accountdata.passwordOne}
              onChange={handleChangeAccount}
              className="w-full border px-4 py-2 rounded text-sm"
              required
            />
            <input
              type="password"
              name="passwordTwo"
              placeholder="Repite la contraseña"
              value={accountdata.passwordTwo}
              onChange={handleChangeAccount}
              className="w-full border px-4 py-2 rounded text-sm"
              required
            />

            <button
              onClick={saveUser}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded text-sm transition"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCli;
