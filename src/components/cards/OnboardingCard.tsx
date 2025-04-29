"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import Input from "@/components/ui/Input";
import { downloadAsImage } from "@/lib/utils";
import type { OnboardingCardData } from "@/types";
import { getManagerData } from "@/lib/airtable";
import { debounce } from "lodash";

export default function OnboardingCard() {
  const [data, setData] = useState<OnboardingCardData>({
    name: "",
    designation: "",
    location: "",
    email: "",
    phone: "",
    welcomeMessage: "",
    reportingManager: "",
    managerMessage: "",
    userImage: null,
    managerImage: null,
    education: ""
  });

  const [preview, setPreview] = useState(true);
  const [isLoadingManager, setIsLoadingManager] = useState(false);

  const userImageRef = useRef<HTMLInputElement>(null);
  const managerImageRef = useRef<HTMLInputElement>(null);

  const handleDownload = async () => {
    try {
      await downloadAsImage("onboarding-card", `welcome-${data.name}`);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download card");
    }
  };

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setData(prev => ({
            ...prev,
            userImage: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManagerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setData(prev => ({
            ...prev,
            managerImage: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchManagerData = async (name: string) => {
    if (!name) {
      setData(prev => ({ ...prev, managerImage: null }));
      return;
    }

    setIsLoadingManager(true);
    try {
      console.log('Fetching manager data for:', name); // Debug log
      const managerData = await getManagerData(name);
      console.log('Received manager data:', managerData); // Debug log

      if (managerData?.imageUrl) {
        setData(prev => ({
          ...prev,
          managerImage: managerData.imageUrl
        }));
        toast.success("Manager image loaded successfully!");
      } else {
        setData(prev => ({ ...prev, managerImage: null }));
        toast.error("No manager image found for this name");
      }
    } catch (error) {
      console.error("Error fetching manager data:", error);
      toast.error("Failed to fetch manager image. Please check console for details.");
    } finally {
      setIsLoadingManager(false);
    }
  };

  // Add debounce to prevent too many API calls
  const debouncedFetchManagerData = useCallback(
    debounce((name: string) => {
      fetchManagerData(name);
    }, 500),
    []
  );

  const handleManagerNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setData(prev => ({ ...prev, reportingManager: newName }));
    debouncedFetchManagerData(newName);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Onboarding Card</h2>
          <p className="text-white/60">
            Create a welcoming card for new team members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white/80">Name</label>
              <button
                type="button"
                onClick={() => userImageRef.current?.click()}
                className="text-xs bg-white/10 text-white/70 hover:text-white rounded-full py-1 px-3 border border-white/20"
              >
                Upload Photo
              </button>
              <input
                ref={userImageRef}
                type="file"
                onChange={handleUserImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-colors"
              style={{
                color: 'black !important',
                caretColor: 'black !important'
              }}
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Designation"
              value={data.designation}
              onChange={(e) => setData({ ...data, designation: e.target.value })}
              placeholder="Enter your job title"
              className="placeholder-gray-400 text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <Input
              label="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your email address"
              type="email"
              className="placeholder-gray-400 text-white"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Phone Number"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="placeholder-gray-400 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <Input
              label="Education"
              value={data.education}
              onChange={(e) => setData({ ...data, education: e.target.value })}
              placeholder="Enter your education qualification"
              className="placeholder-gray-400 text-white"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Location"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              placeholder="Enter your work location"
              className="placeholder-gray-400 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Welcome Message
          </label>
          <textarea
            value={data.welcomeMessage}
            onChange={(e) => setData({ ...data, welcomeMessage: e.target.value })}
            placeholder="Write a short welcome message or professional summary"
            className="w-full rounded-md border-gray-300 bg-white text-black placeholder-gray-400 p-3 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
            style={{
              color: 'black !important',
              caretColor: 'black !important'
            }}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-white/80">Reporting Manager Name</label>
            <button
              type="button"
              onClick={() => managerImageRef.current?.click()}
              className="text-xs bg-white/10 text-white/70 hover:text-white rounded-full py-1 px-3 border border-white/20"
            >
              {isLoadingManager ? "Loading..." : "Upload Photo"}
            </button>
            <input
              ref={managerImageRef}
              type="file"
              onChange={handleManagerImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <input
            value={data.reportingManager}
            onChange={handleManagerNameChange}
            placeholder="Enter your manager's name"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-colors"
            style={{
              color: 'black !important',
              caretColor: 'black !important'
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Manager&apos;s Message
          </label>
          <textarea
            value={data.managerMessage}
            onChange={(e) => setData({ ...data, managerMessage: e.target.value })}
            placeholder="Enter a welcome message from your manager"
            className="w-full rounded-md border-gray-300 bg-white text-black placeholder-gray-400 p-3 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
            style={{
              color: 'black !important',
              caretColor: 'black !important'
            }}
          />
        </div>

        <button
          onClick={handleDownload}
          disabled={!data.name}
          className="btn-primary w-full"
        >
          Download Card
        </button>
        
        <div className="flex items-center justify-between mt-2">
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

      <div 
        className={`relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-white shadow-xl ${preview ? 'block' : 'hidden'}`}
        id="onboarding-card"
        style={{ width: '800px', height: '810px', maxWidth: '100%', maxHeight: '100%' }}
      >
        {/* Top Banner with Welcome Text */}
        <div className="absolute top-0 left-0 w-full h-28 bg-[#2F7164] flex flex-col items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-opacity-30 overflow-hidden">
              {/* Small circles pattern created with CSS */}
              <div className="h-full w-full" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-wide z-10">WELCOME</h1>
          <h2 className="text-3xl font-semibold text-white tracking-wider z-10">ABOARD</h2>
        </div>

        {/* Main Content */}
        <div className="absolute top-28 left-0 w-full h-[calc(100%-28px)] bg-white flex flex-col">
          {/* Profile Section - Top 40% */}
          <div className="h-[40%] flex flex-col">
            {/* Photo and Name */}
            <div className="px-8 py-4 flex items-center">
              {/* Profile Photo */}
              <div className="flex-shrink-0 mr-6 relative">
                <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  {data.userImage ? (
                    <img src={data.userImage} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#40907F] flex items-center justify-center">
                      <span className="text-4xl font-semibold text-white">
                        {data.name ? data.name[0].toUpperCase() : "?"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-grow">
                <div className="relative mb-3">
                  <div className="flex items-center">
                    <div className="relative">
                      <svg className="w-1 h-1 text-[#2F7164] opacity-0" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M95,45.7c-2.5-6.9-7.5-12.6-14.2-16.2c-4.8-2.6-10.2-4-15.6-4c-3.5,0-6.9,0.6-10.2,1.7c1.3-7.1,4.8-13.5,9.9-18.4  c5.5-5.2,12.5-8.5,20-9.3c2-0.2,3.6-1.8,3.9-3.8c0.3-2-0.9-3.9-2.9-4.5c-1-0.3-2.1-0.3-3.2-0.3C70.3-8.1,58.3-1.5,50.2,9  C42,19.6,38.5,33,40.7,46.7c0.5,3.3,1.5,6.4,2.9,9.4c4.6,9.9,14.1,16.3,24.9,16.8c0.5,0,1,0.1,1.4,0.1c5.6,0,11.1-1.6,15.8-4.8  c5.5-3.6,9.5-9,11.5-15.2C98.4,55.9,98.4,51.7,95,45.7z"></path>
                        <path d="M34.7,45.7c-2.5-6.9-7.5-12.6-14.2-16.2c-4.8-2.6-10.2-4-15.6-4c-1.7,0-3.5,0.2-5.2,0.5C-2.3,26.2-2.3,26.5-2.2,26.8  C-2,27.4-1.6,27.9-1,28.3c7.9,6.8,12.7,16.5,13.3,27c0.5,7.7-1.6,15.3-5.8,21.7c-1.2,1.8-0.9,4.3,0.8,5.8  c1.7,1.5,4.3,1.4,5.9-0.2l0.2-0.2C23.7,71.2,30.7,57.9,30.7,43.7C30.7,42.4,35.5,47.9,34.7,45.7z"></path>
                      </svg>
                    
                    </div>
                    <div className="text-3xl text-[#2F7164] font-bold italic ml-2" style={{ fontFamily: 'cursive', letterSpacing: '0.05em', textShadow: '1px 1px 0px rgba(255,255,255,0.8)' }}>Hello</div>
                  </div>
                </div>
                <div className="ml-3 space-y-2">
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">I am</div>
                  <div 
                    className="text-2xl font-bold text-[#2F7164] pb-1 relative"
                    style={{ fontFamily: 'sans-serif', letterSpacing: '0.03em' }}
                  >
                    {data.name || "Name"}
                    <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-[#2F7164]"></div>
                  </div>
                  <div className="text-base text-gray-600">{data.designation || "Job Title / Position"}</div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="px-8 py-2 flex-grow overflow-auto">
              <div className="text-sm text-gray-700 leading-relaxed">{data.welcomeMessage || "Your professional summary or welcome note goes here. Include your core skills, professional interests and what you're looking forward to in this role."}</div>
            </div>
          </div>

          {/* Bottom 60% Section */}
          <div className="h-[50%] flex flex-col justify-end">
            {/* Icon Section - Position, Education, Location */}
            <div className="w-full px-6 py-4 flex justify-between">
              <div className="flex items-start w-1/3 pr-2">
                <div className="w-10 h-10 rounded-full bg-[#2F7164] flex-shrink-0 flex items-center justify-center mr-2 shadow mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500">Position</div>
                  <div className="text-sm font-medium text-gray-800 break-words hyphens-auto">{data.designation || "Job Title / Position"}</div>
                </div>
              </div>
              
              <div className="flex items-start w-1/3 px-2">
                <div className="w-10 h-10 rounded-full bg-[#2F7164] flex-shrink-0 flex items-center justify-center mr-2 shadow mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500">Education</div>
                  <div className="text-sm font-medium text-gray-800 break-words hyphens-auto">{data.education || "Highest Degree / Certification"}</div>
                </div>
              </div>
              
              <div className="flex items-start w-1/3 pl-2">
                <div className="w-10 h-10 rounded-full bg-[#2F7164] flex-shrink-0 flex items-center justify-center mr-2 shadow mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-sm font-medium text-gray-800 break-words hyphens-auto">{data.location || "City / Office Location"}</div>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="w-full px-6 py-3 flex justify-center gap-8">
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-[#2F7164] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-700">{data.email || "username@company.com"}</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-[#2F7164] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs text-gray-700">{data.phone || "9876XXXXX"}</span>
              </div>
            </div>


            


            {/* Manager Message Section */}
            <div className="w-full bg-[#FFFAC6] py-5 px-8 flex items-start mt-[-20]">
              <div className="flex-shrink-0 mr-4 relative">
                <div className="w-14 h-14 rounded-full border-2 border-[#2F7164] overflow-hidden">
                  {data.managerImage ? (
                    <img src={data.managerImage} alt="Manager" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#2F7164]/80 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[#2F7164] italic text-sm font-medium leading-relaxed max-h-18 overflow-auto">&quot;{data.managerMessage || "A welcome message from your manager will appear here. This typically includes a greeting and brief introduction to the team."}&quot;</div>
                <div className="text-xs font-medium text-gray-700 mt-1">{data.reportingManager || "Manager Name"}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 