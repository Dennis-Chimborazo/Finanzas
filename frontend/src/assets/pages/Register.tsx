import React, { useState, useRef } from 'react';
import {Toaster,toast} from "sonner";
import ApiService from "../service/ApiService";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    identificationType: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted form:', form);
    alert('Form submitted successfully!');
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

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />
            </div>

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

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
