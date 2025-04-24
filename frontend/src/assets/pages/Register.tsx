import React, { useState, useRef } from 'react';
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
    email: '',
    profileFotoUrl: '',
  });

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
    navigate('/home');
  };

  return (
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
