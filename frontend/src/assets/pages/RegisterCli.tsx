import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraPreview from '../components/CameraPreview';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Toaster,toast} from "sonner";
import ApiService from "../service/ApiService";


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
    profileFotoUrl: "",
  });

  const [accountdata, setAccountData] = useState({
    email: '',
    passwordOne: '',
    passwordTwo: '',
  });

  const verifyPasswords =()=>{
    if (accountdata.passwordOne!==accountdata.passwordTwo) {
      toast.error("The passwords do not match");
    return  true;
    }
    return  true;
  }
  const verifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (accountdata.email.trim() === '') {
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
    if (form.identificationType==''||form.name==''||form.lastName==''||
        form.DateOfBirth==''|| form.addres==''|| form.profileFotoUrl==''||
        form.phoneNumber==''||form.phoneNumber==''
     ) {
      toast.error("All fields are required");
       return false;
    }
    return true;    

  }
  const saveUser = async ()=>{
      
            
    if (checkFields()) {
    if (verifyPasswords() && verifyEmail()) {
        let response: string | null = null;// Aquí puedes usar let porque luego asignarás el valor
        let resToken: string | null = null;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, accountdata.email, accountdata.passwordOne);
            const user = userCredential.user;
            const token = await user.getIdToken(); // Get the token
            resToken = token; // Store the token
            response = await ApiService.save("auth/register",form);

            localStorage.setItem("login", JSON.stringify({
                login: true,
                token: resToken,
                personData:response
            }));
         navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in:", error);
        }
        }
    }

  }

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
      setForm({ ...form, profileFotoUrl: imageUrl });
    }
  };

  const handleOpenCamera = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registered:', form);
    alert('Registration completed!');
    //navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
      <Toaster position="top-center" visibleToasts={1} duration={3000} richColors />
        {/* Columna izquierda: Banner y texto */}
        <div className="bg-white p-10 flex flex-col justify-center items-center">
          <img
            src="/images/banner.png"
            alt="Banner"
            className="w-52 h-auto mb-6 drop-shadow-xl rounded-lg"
          />
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            Open Your Transactional Account
          </h1>
          <p className="text-gray-700 mb-4 text-sm text-center">
            Save money securely and use it when needed for transfers or payments.
          </p>
          <ul className="text-blue-900 text-sm space-y-2 text-center">
            <li>⏱ Register in <strong>10 minutes</strong></li>
            <li>💰 Initial deposit: <strong>$0</strong></li>
            <li>🎂 Minimum age: <strong>18+</strong></li>
            <li>🪪 ID Type: <strong>Ecuadorian</strong></li>
          </ul>
        </div>
  
        {/* Columna derecha: Formulario */}
        <div className="bg-gray-50 p-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Let’s Get Started
          </h2>
          
          <form onSubmit={handleContinue} className="space-y-4">
            <div className="text-center">
              {showCamera ? (
                <div className="mb-4">
                  <CameraPreview
                    onCapture={(imageData) => {
                      setPreview(imageData);
                      setForm({ ...form, profileFotoUrl: imageData });
                      setShowCamera(false);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCamera(false)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-24 h-24 mx-auto mb-2 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                      No photo
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
  
                  <div className="flex justify-center gap-4 mb-4">
                    <button
                      type="button"
                      onClick={handleOpenCamera}
                      className="text-sm text-blue-700 hover:underline"
                    >
                      Upload from gallery
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCamera(true)}
                      className="text-sm text-blue-700 hover:underline"
                    >
                      Use camera
                    </button>
                  </div>
                </>
              )}
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="First Name" value={form.name} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
              <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            </div>
            <input type="text" name="dni" placeholder="ID number" value={form.dni} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="date" name="DateOfBirth" value={form.DateOfBirth} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="text" name="addres" placeholder="Address" value={form.addres} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="email" name="email" placeholder="Email" value={accountdata.email} onChange={handleChangeAccount} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="password" name="passwordOne" placeholder="Password" value={accountdata.passwordOne} onChange={handleChangeAccount} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="password" name="passwordTwo" placeholder="Repeat Password" value={accountdata.passwordTwo} onChange={handleChangeAccount} className="w-full border px-4 py-2 rounded text-sm" required />
  
            <button
                onClick={saveUser}
              type="submit"
              className="w-full bg-blue-300 hover:bg-blue-400 text-blue-900 font-semibold py-2 rounded text-sm transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default RegisterCli;