import React, { useState, useRef } from 'react';
import {Toaster,toast} from "sonner";
import ApiService from "../service/ApiService";
import { useNavigate } from 'react-router-dom';
import CameraPreview from '../components/CameraPreview';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const [form, setForm] = useState({
    identificationType: 'Ecuadorian ID',
    idNumber: '',
    name: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    profileFotoUrl: '',
  });

  const [accountdata, setAccountData] = useState({
    email: '',
    passwordOne: '',
    passwordTwo: '',
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeAccountData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAccountData({
      ...accountdata,
      [e.target.name]: e.target.value,
    });
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
    navigate('/home');
  };

  const verifyPasswords =()=>{

    if (accountdata.passwordOne!==accountdata.passwordTwo) {
      toast.error("The passwords do not match");
      return false;
    }
    return true;
  }

  const saveUser = async ()=>{
    let response: string | null = null;// Aquí puedes usar let porque luego asignarás el valor
    const userData = {
      identificationType: "DNI",
      dni: "2000156055",
      name: "Juan",
      lastName: "Pérez",
      DateOfBirth: "2024-02-25",
      addres: "Calle Falsa 123",
      phoneNumber: "+541112345678",
      profileFotoUrl: "https://example.com/images/juan.jpg"
    };
    
    response = await ApiService.save("people",userData);
    console.log(response);
    
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Toaster position="top-center" visibleToasts={1} duration={3000} richColors />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identification Type */}
           <div>
            {/* Profile Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            {preview ? (
              <img src={preview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full mb-2 border" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 mb-2 flex items-center justify-center text-gray-500 text-sm">
                No photo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              capture="user"
              ref={fileInputRef}
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <button
              type="button"
              onClick={handleOpenCamera}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded transition"
            >
              Take or Upload Photo
            </button>
          </div> 
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
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

        <div className="bg-gray-50 p-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Let’s Get Started
          </h2>
          <form onSubmit={handleContinue} className="space-y-4">
            <input type="text" name="idNumber" placeholder="ID number" value={form.idNumber} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="First Name" value={form.name} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
              <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            </div>
            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm" required />

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />
            </div>
          </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Identification Type</label>
            <select
              name="identificationType"
              value={form.identificationType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            >
              <option value="">Select</option>
              <option value="passport">Passport</option>
              <option value="dni">DNI</option>
              <option value="license">Driver’s License</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>
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

                  <div className="flex justify-center gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={accountdata.email}
                onChange={handleChangeAccountData}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="passwordOne"
              value={accountdata.passwordOne}
              onChange={handleChangeAccountData}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Repeat password</label>
            <input
              type="password"
              name="passwordTwo"
              value={accountdata.passwordTwo}
              onChange={handleChangeAccountData}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

        

          {/* Submit */}
          <div className="pt-4">
            <button
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

export default Register;
