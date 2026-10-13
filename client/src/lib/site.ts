import type { SyntheticEvent } from "react";

export const ASSETS = {
  logo: "/images/logo.jpeg",
  mark: "/images/logo.jpeg",
  hero: "/images/hero.jpg",
  network: "/images/network.jpg",
  workshop: "/images/workshop.jpg",
  teamBoard: "/images/team-board.jpeg",
  mentorBerzamin: "/images/mentor-berzamin.jpeg",
  mentorNatevan: "/images/mentor-natevan.jpeg",
  mentorRamil: "/images/mentor-ramil.png",
};

export function hideBrokenImg(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = "none";
}

export const SOCIALS = {
  instagram: "https://www.instagram.com/zeroday.gdu",
  instagramLabel: "zeroday.gdu",
  github: "https://github.com/DerdliAsiq",
  githubLabel: "DerdliAsiq",
  email: "berzamin55@gmail.com",
};

export const NAV = [
  { to: "/haqqimizda", label: "Haqqımızda" },
  { to: "/istiqametler", label: "İstiqamətlər" },
  { to: "/tedris-proqrami", label: "Tədris" },
  { to: "/layiheler", label: "Layihələr" },
  { to: "/gallery", label: "Qalereya" },
  { to: "/elaqe", label: "Əlaqə" },
];
