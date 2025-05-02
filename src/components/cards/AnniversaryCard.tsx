"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Dancing_Script } from "next/font/google";
import { toast } from "react-hot-toast";
import Input from "@/components/ui/Input";
import { downloadAsImage } from "@/lib/utils";
import type { JSX } from "react";

const dancingScript = Dancing_Script({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

interface CardData {
  name: string;
  designation: string;
  yearsOfService: string;
}

const getOrdinalNum = (number: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = number % 100;
  return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export default function AnniversaryCard(): JSX.Element {
  const [data, setData] = useState<CardData>({
    name: "",
    designation: "",
    yearsOfService: ""
  });
  const [preview, setPreview] = useState(true);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const [nameFontSize, setNameFontSize] = useState(24);
  const [designationFontSize, setDesignationFontSize] = useState(20);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, name: e.target.value });
  };

  const handleDesignationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, designation: e.target.value });
  };

  const handleYearsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setData({ ...data, yearsOfService: value });
    }
  };

  // Adjust font size based on text length
  useEffect(() => {
    if (!nameRef.current || !designationRef.current) return;
    
    const baseNameSize = 24;
    const baseDesignationSize = 20;
    
    const maxNameWidth = 600;
    const maxDesignationWidth = 500;
    
    if (data.name) {
      setNameFontSize(baseNameSize);
      nameRef.current.style.fontSize = `${baseNameSize}px`;
      
      let currentSize = baseNameSize;
      while (nameRef.current.scrollWidth > maxNameWidth && currentSize > 20) {
        currentSize -= 2;
        nameRef.current.style.fontSize = `${currentSize}px`;
        setNameFontSize(currentSize);
      }
    }

    if (data.designation) {
      setDesignationFontSize(baseDesignationSize);
      designationRef.current.style.fontSize = `${baseDesignationSize}px`;
      
      let currentSize = baseDesignationSize;
      while (designationRef.current.scrollWidth > maxDesignationWidth && currentSize > 24) {
        currentSize -= 2;
        designationRef.current.style.fontSize = `${currentSize}px`;
        setDesignationFontSize(currentSize);
      }
    }
  }, [data.name, data.designation]);



  const handleDownload = async () => {
    try {
      await downloadAsImage("anniversary-card", `anniversary-${data.name}`);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download card");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Form Section */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Work Anniversary Card</h2>
          <p className="text-white/60">
            Create a personalized work anniversary celebration card.
          </p>
        </div>

        <Input
          label="Name"
          value={data.name}
          onChange={handleNameChange}
          placeholder="Enter name"
          maxLength={30}
          className="bg-white border-gray-300 text-black placeholder-gray-400 focus:border-blue-500"
        />
        <Input
          label="Years of Service"
          value={data.yearsOfService}
          onChange={handleYearsChange}
          placeholder="Enter years (e.g. 5)"
          type="text"
          maxLength={2}
          className="bg-white border-gray-300 text-black placeholder-gray-400 focus:border-blue-500"
        />
        <Input
          label="Designation"
          value={data.designation}
          onChange={handleDesignationChange}
          placeholder="Enter designation"
          maxLength={50}
          className="bg-white border-gray-300 text-black placeholder-gray-400 focus:border-blue-500"
        />

        <div className="glass-panel p-5">
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleDownload}
              disabled={!data.name || !data.designation}
              className="btn-primary w-full"
            >
              Download Card
            </button>

            <div className="mt-3">
              <label className="flex items-center text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={preview}
                  onChange={() => setPreview(!preview)}
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                />
                Show live preview
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Card Preview Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center p-8" style={{ marginTop: '-50px' }}>
        <div
          className="relative overflow-hidden rounded-lg shadow-xl mx-auto" 
          id="anniversary-card"
          style={{ 
            width: '1000px',
            height: '550px',
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}
        >
          <div className="w-full h-full overflow-hidden">
            <img
              src="/assets/templates/anniversary.png"
              alt="Anniversary Card Template"
              className="w-full h-full"
              style={{
                objectFit: 'fill',
                display: 'block'
              }}
            />
          </div>

          {/* Years of Service */}
          <div 
            className="absolute text-center z-8"
            style={{
              top: '28%',
              left: '13%',
              transform: 'translateY(-50%)'
            }}
          >
            <span
              className={`${dancingScript.className} text-[#FFD700] text-4xl tracking-normal inline-block`}
              style={{
                textShadow: '2px 2px 8px rgba(255, 215, 0, 0.6), -2px -2px 8px rgba(255, 215, 0, 0.6)',
                WebkitTextStroke: '1px rgba(128, 96, 0, 0.3)',
                transform: 'rotate(-1deg)'
              }}
            >
              {data.yearsOfService ? getOrdinalNum(parseInt(data.yearsOfService)) : 'X'}
            </span>
          </div>

          {/* Name and Designation */}
          <div className="absolute top-[49%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-8 w-[80%] max-w-[800px]">
            <p
              ref={nameRef}
              className="whitespace-nowrap overflow-visible font-times-new-roman"
              style={{ 
                fontSize: `${nameFontSize}px`,
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              {data.name || "Enter Name"}
            </p>
            <p
              ref={designationRef}
              className="whitespace-nowrap overflow-visible text-white/90 font-times-new-roman"
              style={{ 
                fontSize: `${designationFontSize}px`,
                letterSpacing: '0.01em'
              }}
            >
              {data.designation || "Enter Designation"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}