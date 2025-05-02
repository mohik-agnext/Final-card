"use client";

import { useState } from "react";
import { CardType } from "@/types";
import { cn } from "@/lib/utils";
import BirthdayCard from "@/components/cards/BirthdayCard";
import AnniversaryCard from "@/components/cards/AnniversaryCard";
import OnboardingCard from "@/components/cards/OnboardingCard";

const tabs: { id: CardType; label: string }[] = [
  { id: "birthday", label: "🎉 Birthday" },
  { id: "anniversary", label: "🎈 Work Anniversary" },
  { id: "onboarding", label: "🎊 Onboarding" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<CardType>("birthday");

  return (
    <div className="relative min-h-screen">
      {/* Back Button */}
      <a
        href="https://agnext.framer.ai/"
        className="absolute top-4 left-4 z-10 p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9333ea"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </a>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/templates/logo.png"
            alt="AgNext Logo"
            className="h-12 object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10">
        <div className="glass-panel">
          {/* Tabs */}
          <div className="border-b border-white/10">
            <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "tab-button",
                    activeTab === tab.id && "active"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Card Content */}
          <div className="mt-8 px-4 py-6">
            {activeTab === "birthday" && <BirthdayCard />}
            {activeTab === "anniversary" && <AnniversaryCard />}
            {activeTab === "onboarding" && <OnboardingCard />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-2 text-center bg-purple-900/50 backdrop-blur-sm mt-8">
        <p className="text-white/70 text-sm">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/mohik-kler/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/90 underline decoration-dotted"
          >
            Mohik Kler
          </a>
        </p>
      </footer>
      </div>
    </div>
  );
}