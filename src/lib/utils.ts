import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import html2canvas from "html2canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadAsImage(elementId: string, fileName: string) {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error("Element not found");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = image;
    link.click();
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
} 