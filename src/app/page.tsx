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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Celebration Cards
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
          Create beautiful cards for every special occasion
        </p>
      </div>

      {/* Main Content */}
      <div className="mt-16">
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
    </div>
  );
} 