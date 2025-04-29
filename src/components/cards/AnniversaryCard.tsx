"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Input from "@/components/ui/Input";
import { downloadAsImage } from "@/lib/utils";
import type { AnniversaryCardData } from "@/types";

export default function AnniversaryCard() {
  const [data, setData] = useState<AnniversaryCardData>({
    name: "",
    designation: "",
    yearsOfService: 1,
  });
  const [preview, setPreview] = useState(true);

  // Custom styles to ensure input text is visible
  // Commented out unused variables:
  // const inputStyle = {
  //   color: 'white',
  //   fontWeight: '500'
  // };

  // Custom class name with !important to override existing styles
  // const overrideClass = "anniversary-input-field";

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  const handleDownload = async () => {
    try {
      await downloadAsImage("anniversary-card", `anniversary-${data.name}`);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download card");
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      designation: "",
      yearsOfService: 1,
    });
    toast.success("Form reset successfully!");
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Work Anniversary Card</h2>
          <p className="text-white/60">
            Create a personalized work anniversary celebration card.
          </p>
        </div>

        {/* Custom style for inputs */}
        <style jsx>{`
          .anniversary-input-field input {
            color: white !important;
          }
        `}</style>

        <Input
          label="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Enter your name"
          className="placeholder-gray-400 text-black"
          style={{
            color: 'black !important',
            caretColor: 'black !important'
          }}
        />
        <Input
          label="Designation"
          value={data.designation}
          onChange={(e) => setData({ ...data, designation: e.target.value })}
          placeholder="Enter your designation"
          className="placeholder-gray-400 text-black"
          style={{
            color: 'black !important',
            caretColor: 'black !important'
          }}
        />
        <Input
          type="number"
          label="Years of Service"
          min={1}
          value={data.yearsOfService}
          onChange={(e) =>
            setData({ ...data, yearsOfService: parseInt(e.target.value) || 1 })
          }
          placeholder="Enter years of service"
          className="placeholder-gray-400 text-black"
          style={{
            color: 'black !important',
            caretColor: 'black !important'
          }}
        />
        <button
          onClick={handleDownload}
          disabled={!data.name}
          className="btn-primary w-full"
        >
          Download Card
        </button>
        
        <div className="mt-2 flex gap-2">
          <label className="flex items-center text-sm text-white/70">
            <input
              type="checkbox"
              checked={preview}
              onChange={() => setPreview(!preview)}
              className="mr-2 h-4 w-4 rounded border-gray-300"
            />
            Show live preview
          </label>
          
          <button
            type="button"
            onClick={resetForm}
            className="ml-auto text-sm text-white/70 hover:text-white underline"
          >
            Reset Form
          </button>
        </div>
      </div>

      <div 
        className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden ${preview ? 'block' : 'hidden'}`}
        id="anniversary-card"
        style={{ width: '800px', height: '600px', maxWidth: '100%', maxHeight: '100%' }}
      >
        <div className="absolute inset-0 bg-[#1a2b44] overflow-hidden">
          {/* Sparkle effect */}
          <div className="absolute inset-0 opacity-50">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          
          {/* Logo */}
          <div className="absolute top-0 left-0 right-0 pt-10 px-6">
            <h1 className="text-white text-3xl font-bold text-center tracking-wider">
              AGNEXT
            </h1>
          </div>

          {/* Main Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
            <div className="mb-8">
              <h2 className="text-5xl font-serif text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                HAPPY
              </h2>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-5xl font-serif" style={{ 
                  color: '#FFD700',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  fontFamily: 'Playfair Display, serif'
                }}>
                  {data.yearsOfService}
                  <span className="text-2xl align-super ml-0.5">
                    {getOrdinalSuffix(data.yearsOfService)}
                  </span>
                </span>
                <h1 className="text-5xl font-serif text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Work Anniversary
                </h1>
              </div>
            </div>

            {/* Blue Ribbon */}
            <div className="w-full relative mb-8">
              {/* Left ribbon tail */}
              <div className="absolute -left-3 top-0 h-6 w-8 bg-blue-600 "></div>
              <div className="absolute -left-4 top-6 h-6 w-6 bg-blue-800 clip-triangle"></div>
              
              {/* Main ribbon */}
              <div className="relative h-24">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 ">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {data.name || "Full Name"}
                  </h3>
                  <p className="text-xl text-white/90 italic">
                    {data.designation || "Job Title / Position"}
                  </p>
                </div>
              </div>
              
              {/* Right ribbon tail */}
              <div className="absolute -right-3 top-0 h-6 w-8 bg-blue-600 transform skew-x-12"></div>
              <div className="absolute -right-4 top-6 h-6 w-6 bg-blue-800 clip-triangle-right"></div>
            </div>

            {/* Message */}
            <div className="text-[#FFF4EA] text-opacity-80 max-w-md text-sm mx-auto">{data.message || "Congratulations on reaching another milestone with us! We truly appreciate your dedication and hard work, and we're grateful for everything you de-Wishing you continued success and many more great years ahead!"}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 