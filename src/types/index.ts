export type CardType = "birthday" | "anniversary" | "onboarding";

export interface BaseCardData {
  name: string;
}

export interface BirthdayCardData extends BaseCardData {}

export interface AnniversaryCardData extends BaseCardData {
  designation: string;
  yearsOfService: number;
}

export interface OnboardingCardData extends BaseCardData {
  designation: string;
  location: string;
  email: string;
  phone: string;
  welcomeMessage: string;
  reportingManager: string;
  managerMessage: string;
  userImage: string | null;
  managerImage: string | null;
  education: string;
}

export type CardData = BirthdayCardData | AnniversaryCardData | OnboardingCardData; 