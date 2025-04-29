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
        <div className="flex justify-center mb-8 pt-4">
          <img 
            src="/assets/templates/logo.png"
            alt="AgNext Logo"
            className="h-20 object-contain"
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
    </div>
  );
} 