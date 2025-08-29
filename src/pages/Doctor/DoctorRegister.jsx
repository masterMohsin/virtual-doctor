import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../api/api.js";

const DoctorRegister = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    licenseNumber: "",
    bloodGroup: "",
    specialization: "",
    qualification: "",
    yearsOfExperience: "",
    affiliation: "",
    consultantHours: "",
  });

  useEffect(() => {
    const messages = [
      "Contact with doctors Globally..",
      "Make your Appointment online..",
      "Make your life Easy..",
    ];

    const typingText = document.getElementById("typingText");
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = messages[messageIndex];
      typingText.textContent = current.substring(0, charIndex);

      if (!isDeleting) {
        charIndex++;
        if (charIndex > current.length) {
          isDeleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
        }
      }

      setTimeout(type, isDeleting ? 40 : 80);
    }

    type();
  }, []);

  const [profileImage, setProfileImage] = useState(null);
  const [degreeCertificate, setDegreeCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profileImage") setProfileImage(files[0]);
    if (name === "degreeCertificate") setDegreeCertificate(files[0]);
  };

  // Function to parse consultant hours string and convert to proper format
  const parseConsultantHours = (hoursString) => {
    if (!hoursString) return [];
    
    // Try to parse common formats like "10am-04pm", "9:00 AM - 5:00 PM", etc.
    const timeMatch = hoursString.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
    
    if (timeMatch) {
      const startTime = timeMatch[1].trim();
      const endTime = timeMatch[2].trim();
      
      // Convert to 24-hour format
      const convertTo24Hour = (timeStr) => {
        const cleanTime = timeStr.replace(/\s*(am|pm)/i, '');
        const isPM = /pm/i.test(timeStr);
        const [hours, minutes] = cleanTime.split(':').map(Number);
        
        let hour24 = hours;
        if (isPM && hours !== 12) hour24 += 12;
        if (!isPM && hours === 12) hour24 = 0;
        
        return `${hour24.toString().padStart(2, '0')}:${(minutes || 0).toString().padStart(2, '0')}`;
      };
      
      const start24 = convertTo24Hour(startTime);
      const end24 = convertTo24Hour(endTime);
      
      // Create consultant hours for weekdays (Mon-Fri) - match backend schema exactly
      const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      return weekdays.map(day => ({
        day,
        start: start24,
        end: end24,
        slotMinutes: 30,
        isClosed: false
      }));
    }
    
    // If parsing fails, return default hours for weekdays
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return weekdays.map(day => ({
      day,
      start: "09:00",
      end: "17:00",
      slotMinutes: 30,
      isClosed: false
    }));
  };

  // Alternative function to create consultant hours from individual inputs
  const createConsultantHours = () => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return weekdays.map(day => ({
      day,
      start: "09:00",
      end: "17:00", 
      slotMinutes: 30,
      isClosed: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
   
    if (register.password !== register.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms & Conditions");
      setSuccess("");
      return;
    }

    // Validate consultation hours format
    if (register.consultantHours) {
      const timeFormat = /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i;
      if (!timeFormat.test(register.consultantHours)) {
        setError("Please enter consultation hours in the correct format (e.g., 9:00 AM - 5:00 PM)");
        setSuccess("");
        return;
      }
    }
    
    setLoading(true);
    
    try {
      // Prepare the registration data - match backend User model fields exactly
      const registrationData = {
        fullName: register.fullName,
        email: register.email,
        password: register.password,
        confirmPassword: register.confirmPassword,
        dateOfBirth: register.dateOfBirth,
        gender: register.gender,
        phoneNumber: register.phoneNumber,
        address: register.address,
        licenseNumber: register.licenseNumber,
        bloodGroup: register.bloodGroup,
        specialization: register.specialization,
        qualification: register.qualification,
        yearsOfExperience: parseInt(register.yearsOfExperience) || 0,
        affiliation: register.affiliation,
        consultantHours: parseConsultantHours(register.consultantHours)
      };

      // Use FormData for file uploads
      const formData = new FormData();
      
      // Add all the data to FormData
      Object.entries(registrationData).forEach(([key, value]) => {
        if (key === 'consultantHours') {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });
      
      if (profileImage) formData.append("profileImage", profileImage);
      if (degreeCertificate) formData.append("degreeCertificate", degreeCertificate);
      
      const response = await API.post('/auth/register-doctor', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/doctor/login"), 2000);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.status === 409) {
        setError("A doctor with this email already exists");
      } else if (err.response?.status === 500) {
        setError("Something went wrong on the server. Please try again later or contact support.");
      } else {
        setError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Registration failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] flex items-center justify-center min-h-screen p-0 m-0">
      <style>
        {`
          @keyframes waveRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .wave {
            animation: waveRotate 50s linear infinite;
          }
        `}
      </style>
      <div className="flex flex-col md:flex-row w-full h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#0EBE7F] text-white p-10 flex flex-col justify-center items-start h-full relative">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-white"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">
              Welcome to
            </h1>
            <h2 className="text-4xl font-bold text-white mt-2 tracking-wide">
              Virtual Doctor
            </h2>
            <p className="mt-4 text-lg font-medium text-white/90 max-w-md">
              Your smart healthcare companion. Connect, consult, and care — all
              in one place.
            </p>
          </div>
          <div className="h-10 text-lg mt-8 text-white font-mono">
            <span id="typingText" className="inline-block"></span>
            <span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0f0f]">
          <div className="relative w-full max-w-3xl bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 overflow-hidden mx-4">
            {/* Waves */}
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 -top-[70%] wave z-0"></div>
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 top-[30%] wave z-0 delay-1000"></div>

            {/* Content */}
            <div className="relative z-10 text-white text-center mb-6">
              <h2 className="text-2xl font-bold">Register Your Account</h2>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-2 gap-4">
              {/* Profile & Degree Image Upload - same row */}
              <div className="flex items-center justify-center gap-2 text-white text-sm col-span-1">
                <label htmlFor="profileImage" className="flex items-center gap-2 cursor-pointer hover:text-green-300" aria-label="Upload profile image">
                  📷 Profile Image
                </label>
                <input type="file" id="profileImage" name="profileImage" className="hidden" onChange={handleFileChange} accept="image/*" aria-label="Profile image upload" />
                {profileImage && <span className="ml-2 text-xs text-green-300">{profileImage.name}</span>}
              </div>
              <div className="flex items-center justify-center gap-2 text-white text-sm col-span-1">
                <label htmlFor="degreeCertificate" className="flex items-center gap-2 cursor-pointer hover:text-green-300" aria-label="Upload degree certificate">
                  📜 Degree Certificate
                </label>
                <input type="file" id="degreeCertificate" name="degreeCertificate" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" aria-label="Degree certificate upload" />
                {degreeCertificate && <span className="ml-2 text-xs text-green-300">{degreeCertificate.name}</span>}
              </div>

              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="fullName"
                value={register.fullName}
                onChange={handleInput}
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="email"
                value={register.email}
                onChange={handleInput}
              />

              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="password"
                value={register.password}
                onChange={handleInput}
                minLength={6}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="confirmPassword"
                value={register.confirmPassword}
                onChange={handleInput}
                minLength={6}
              />

              <input
                type="date"
                placeholder="Date of Birth"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                name="dateOfBirth"
                value={register.dateOfBirth}
                onChange={handleInput}
              />
              <select
                name="gender"
                value={register.gender}
                onChange={handleInput}
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Phone Number"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="phoneNumber"
                value={register.phoneNumber}
                onChange={handleInput}
              />
              <input
                type="text"
                placeholder="License Number"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="licenseNumber"
                value={register.licenseNumber}
                onChange={handleInput}
              />

              <input
                type="text"
                placeholder="Specialization"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="specialization"
                value={register.specialization}
                onChange={handleInput}
              />
              <input
                type="text"
                placeholder="Qualification"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                name="qualification"
                value={register.qualification}
                onChange={handleInput}
              />

              <input
                type="number"
                placeholder="Years of Experience"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                name="yearsOfExperience"
                value={register.yearsOfExperience}
                onChange={handleInput}
                min="0"
              />
              <input
                type="text"
                placeholder="Blood Group"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                name="bloodGroup"
                value={register.bloodGroup}
                onChange={handleInput}
              />

              <input
                type="text"
                placeholder="Affiliation (e.g., Hospital)"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                required
                name="affiliation"
                value={register.affiliation}
                onChange={handleInput}
              />
              <input
                type="text"
                placeholder="Address"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                name="address"
                value={register.address}
                onChange={handleInput}
              />

              <input
                type="text"
                placeholder="Consultant Hours (e.g., 9:00 AM - 5:00 PM)"
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none col-span-2"
                required
                name="consultantHours"
                value={register.consultantHours}
                onChange={handleInput}
              />
              <div className="col-span-2 text-xs text-white/60 text-center">
                Format: Start Time - End Time (e.g., 9:00 AM - 5:00 PM, 10am-6pm)
              </div>

              <label className="col-span-2 flex items-center gap-2 text-white text-sm">
                <input
                  type="checkbox"
                  className="accent-green-500"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                  aria-label="Accept Terms & Conditions"
                />
                I accept the Terms & Conditions
              </label>

              <button
                type="submit"
                className="col-span-2 bg-emerald-500 hover:bg-emerald-400 cursor-pointer transition-colors text-white py-3 rounded-lg font-medium text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {error && (
                <p className="col-span-2 text-center text-red-400 text-sm">{error}</p>
              )}
              {success && (
                <p className="col-span-2 text-center text-green-400 text-sm">{success}</p>
              )}
              <p className="col-span-2 text-center text-white/60 text-sm">
                Already have an account?{" "}
                <NavLink
                  to="/doctor/login"
                  className="text-green-400 underline cursor-pointer"
                >
                  Login
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;
