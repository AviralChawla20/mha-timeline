import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Tv, ArrowUp, Star, Zap, Circle, Film, Book, AlertCircle, Home as HomeIcon, ChevronRight, Library, X, Calendar, User, Globe, Play, ChevronLeft, SkipForward, SkipBack } from 'lucide-react';

// --- DATA HELPERS ---

// Helper to generate episode blocks with specific themes
const generateEpisodes = (seasonNum, startEp, endEp, themeColor, links = {}) => {
  const episodes = [];
  // Handle skipping episodes if necessary (logic handled by calling this function multiple times for ranges)
  for (let i = startEp; i <= endEp; i++) {
    episodes.push({
      title: `Episode ${i}`, // Placeholder title until provided
      detail: `Season ${seasonNum} - Episode ${i}`,
      type: "episode",
      season: `Season ${seasonNum}`,
      episodeNumber: i,
      theme: themeColor, // Custom theme color for this block
      videoUrl: links[i] || null
    });
  }
  return episodes;
};

// --- DATA DEFINITIONS ---

// Season 1 (Yellow/Gold - All Might Era)
const season1Data = [
  { title: "Izuku Midoriya: Origin", detail: "Season 1 - Episode 1", type: "episode", season: "Season 1", episodeNumber: 1, theme: "yellow", videoUrl: "https://drive.google.com/file/d/1SleDFE3sPjLDiC0sN5fqteqqK80pHpR6/view?usp=drive_link" },
  { title: "What It Takes to Be a Hero", detail: "Season 1 - Episode 2", type: "episode", season: "Season 1", episodeNumber: 2, theme: "yellow", videoUrl: "https://drive.google.com/file/d/1NO3iX6Spr51Qz1ZBgVh9zeK8vss7LpJ6/view?usp=drive_link" },
  { title: "Roaring Muscles", detail: "Season 1 - Episode 3", type: "episode", season: "Season 1", episodeNumber: 3, theme: "yellow" , videoUrl:"https://drive.google.com/file/d/1BBe9JOj2as8gIkCU1YwLY-54sqyRv29w/view?usp=drive_link"},
  { title: "Start Line", detail: "Season 1 - Episode 4", type: "episode", season: "Season 1", episodeNumber: 4, theme: "yellow",videoUrl:"https://drive.google.com/file/d/1kuQRbuA_zsakejefYs9cR31xjcjy413A/view?usp=drive_link" },
  { title: "What I Can Do For Now", detail: "Season 1 - Episode 5", type: "episode", season: "Season 1", episodeNumber: 5, theme: "yellow",videoUrl:"https://drive.google.com/file/d/1zRy_VpbSOItOY-I8l4ybMekR5a9XvTnR/view?usp=drive_link" },
  { title: "Rage, You Damned Nerd", detail: "Season 1 - Episode 6", type: "episode", season: "Season 1", episodeNumber: 6, theme: "yellow" ,videoUrl:"https://drive.google.com/file/d/1yrbJ5DKbWSvpWUVt7gBDxN3tlwFzWAIf/view?usp=drive_link"},
  { title: "Deku vs. Kacchan", detail: "Season 1 - Episode 7", type: "episode", season: "Season 1", episodeNumber: 7, theme: "yellow",videoUrl:"https://drive.google.com/file/d/1fZYXKpZpXBPPSnzHmF49A43BnczNOGDl/view?usp=drive_link" },
  { title: "Bakugo's Start Line", detail: "Season 1 - Episode 8", type: "episode", season: "Season 1", episodeNumber: 8, theme: "yellow" ,videoUrl:"https://drive.google.com/file/d/1JQ5VRLXymxhGRB7pw53FaT6B1D0-w38f/view?usp=drive_link"},
  { title: "Yeah, Just Do Your Best, Iida!", detail: "Season 1 - Episode 9", type: "episode", season: "Season 1", episodeNumber: 9, theme: "yellow" ,videoUrl:"https://drive.google.com/file/d/1V5c1HDmnvVubij4l5368DyDaMy0B4siA/view?usp=drive_link"},
  { title: "Encounter with the Unknown", detail: "Season 1 - Episode 10", type: "episode", season: "Season 1", episodeNumber: 10, theme: "yellow",videoUrl:"https://drive.google.com/file/d/13hEsxODSAgwcUXi8Tnjo2RkI9CxJKsSx/view?usp=drive_link" },
  { title: "Game Over", detail: "Season 1 - Episode 11", type: "episode", season: "Season 1", episodeNumber: 11, theme: "yellow" ,videoUrl:"https://drive.google.com/file/d/1IgchBcp-7DnMp-HrfsP58zjjknvFF9fA/view?usp=drive_link"},
  { title: "All Might", detail: "Season 1 - Episode 12", type: "episode", season: "Season 1", episodeNumber: 12, theme: "yellow",videoUrl:"https://drive.google.com/file/d/1EH9JqSXHzwICTqMF502nIw8RA1423oam/view?usp=drive_link" },
  { title: "In Each of Our Hearts", detail: "Season 1 - Episode 13", type: "episode", season: "Season 1", episodeNumber: 13, theme: "yellow" ,videoUrl:"https://drive.google.com/file/d/1_b_Si7cgWTYWi5O9DbMsyld5LAtBWIVy/view?usp=drive_link"},
];

const season2Data_p1 = [
  { title: "That’s the Idea, Ochaco", detail: "Season 2 - Episode 14", type: "episode", season: "Season 2", episodeNumber: 1, theme: "blue",videoUrl:"https://drive.google.com/file/d/1oi_991ZdGiaxr9NttQLpsk_I4LC92a2r/view?usp=drive_link" },
  { title: "Roaring Sports Festival", detail: "Season 2 - Episode 15", type: "episode", season: "Season 2", episodeNumber: 2, theme: "blue",videoUrl:"https://drive.google.com/file/d/1nKKVZ0-8Az9ypHXY8ux0N2_iSNnykxO9/view?usp=drive_link" },
  { title: "In Their Own Quirky Ways", detail: "Season 2 - Episode 16", type: "episode", season: "Season 2", episodeNumber: 3, theme: "blue",videoUrl:"https://drive.google.com/file/d/1zV9Zi46Rc6MVY-IE5f0XkIomZYzgLcp3/view?usp=drive_link" },
  { title: "Strategy, Strategy, Strategy", detail: "Season 2 - Episode 17", type: "episode", season: "Season 2", episodeNumber: 4, theme: "blue",videoUrl:"https://drive.google.com/file/d/1E2Pg4mFTt1ME-sVhlkKlDCjkny9CT2O5/view?usp=drive_link" },
  { title: "Cavalry Battle Finale", detail: "Season 2 - Episode 18", type: "episode", season: "Season 2", episodeNumber: 5, theme: "blue",videoUrl:"https://drive.google.com/file/d/1lxPDRf6O5R4e-J2dZyVVcDgoqAOhBWpT/view?usp=drive_link" },
  { title: "The Boy Born with Everything", detail: "Season 2 - Episode 19", type: "episode", season: "Season 2", episodeNumber: 6, theme: "blue" ,videoUrl:"https://drive.google.com/file/d/1jOkgq6mB45rSFtdFzWNazzpxTI4eFs3N/view?usp=drive_link"},
  { title: "Victory or Defeat", detail: "Season 2 - Episode 20", type: "episode", season: "Season 2", episodeNumber: 7, theme: "blue" ,videoUrl:"https://drive.google.com/file/d/1yCufzKwDmd7NEKwg3Yz8X9VXBJXQAj3z/view?usp=drive_link"},
  { title: "Battle on, Challengers!", detail: "Season 2 - Episode 21", type: "episode", season: "Season 2", episodeNumber: 8, theme: "blue" ,videoUrl:"https://drive.google.com/file/d/1iRUQNhfCvWAQtPZkDhLgY6WTEeWRPKyw/view?usp=drive_link"},
  { title: "Bakugo vs. Uraraka", detail: "Season 2 - Episode 22", type: "episode", season: "Season 2", episodeNumber: 9, theme: "blue" },
  { title: "Shoto Todoroki: Origin", detail: "Season 2 - Episode 23", type: "episode", season: "Season 2", episodeNumber: 10, theme: "blue" },
  { title: "Fight On, Iida", detail: "Season 2 - Episode 24", type: "episode", season: "Season 2", episodeNumber: 11, theme: "blue" },
  { title: "Todoroki vs. Bakugo", detail: "Season 2 - Episode 25", type: "episode", season: "Season 2", episodeNumber: 12, theme: "blue" },
  { title: "Encounter", detail: "Season 2 - Episode 26", type: "episode", season: "Season 2", episodeNumber: 13, theme: "blue" },
  { title: "Bizarre! Gran Torino Appears", detail: "Season 2 - Episode 27", type: "episode", season: "Season 2", episodeNumber: 14, theme: "blue" },
  { title: "Midoriya and Shigaraki", detail: "Season 2 - Episode 28", type: "episode", season: "Season 2", episodeNumber: 15, theme: "blue" },
  { title: "Hero Killer: Stain vs U.A. Students", detail: "Season 2 - Episode 29", type: "episode", season: "Season 2", episodeNumber: 16, theme: "blue" },
  { title: "Climax", detail: "Season 2 - Episode 30", type: "episode", season: "Season 2", episodeNumber: 17, theme: "blue" },
  { title: "The Aftermath of Hero Killer: Stain", detail: "Season 2 - Episode 31", type: "episode", season: "Season 2", episodeNumber: 18, theme: "blue" },
  { title: "Everyone’s Internships", detail: "Season 2 - Episode 32", type: "episode", season: "Season 2", episodeNumber: 19, theme: "blue" },
  { title: "Listen Up!! A Tale From the Past", detail: "Season 2 - Episode 33", type: "episode", season: "Season 2", episodeNumber: 20, theme: "blue" },
];

const season2Data_p2 = [  { title: "Gear up for Final Exams", detail: "Season 2 - Episode 34", type: "episode", season: "Season 2", episodeNumber: 21, theme: "blue" },
  { title: "Yaoyorozu: Rising", detail: "Season 2 - Episode 35", type: "episode", season: "Season 2", episodeNumber: 22, theme: "blue" },
  { title: "Struggle!!", detail: "Season 2 - Episode 36", type: "episode", season: "Season 2", episodeNumber: 23, theme: "blue" },
  { title: "Katsuki Bakugo: Origin", detail: "Season 2 - Episode 37", type: "episode", season: "Season 2", episodeNumber: 24, theme: "blue" },
  { title: "Encounter", detail: "Season 2 - Episode 38", type: "episode", season: "Season 2", episodeNumber: 25, theme: "blue" },];

const season3Data_p1 = [  { title: "Special Episode: Save the World With Love!!", detail: "Season 3 - Episode 58", type: "episode", season: "Season 3", episodeNumber: 58, theme: "red" },];
  const season3Data_p2 = [
  { title: "Game Start", detail: "Season 3 - Episode 39", type: "episode", season: "Season 3", episodeNumber: 39, theme: "red" },
  { title: "Wild, Wild Pussycats", detail: "Season 3 - Episode 40", type: "episode", season: "Season 3", episodeNumber: 40, theme: "red" },
  { title: "Kota", detail: "Season 3 - Episode 41", type: "episode", season: "Season 3", episodeNumber: 41, theme: "red" },
  { title: "My Hero", detail: "Season 3 - Episode 42", type: "episode", season: "Season 3", episodeNumber: 42, theme: "red" },
  { title: "Drive It Home, Iron Fist!", detail: "Season 3 - Episode 43", type: "episode", season: "Season 3", episodeNumber: 43, theme: "red" },
  { title: "Roaring Upheaval", detail: "Season 3 - Episode 44", type: "episode", season: "Season 3", episodeNumber: 44, theme: "red" },
  { title: "What a Twist!", detail: "Season 3 - Episode 45", type: "episode", season: "Season 3", episodeNumber: 45, theme: "red" },
  { title: "From Iida to Midoriya", detail: "Season 3 - Episode 46", type: "episode", season: "Season 3", episodeNumber: 46, theme: "red" },
  { title: "All For One", detail: "Season 3 - Episode 47", type: "episode", season: "Season 3", episodeNumber: 47, theme: "red" },
  { title: "Symbol of Peace", detail: "Season 3 - Episode 48", type: "episode", season: "Season 3", episodeNumber: 48, theme: "red" },

];

const season3Data_p3 = [  { title: "One For All", detail: "Season 3 - Episode 49", type: "episode", season: "Season 3", episodeNumber: 49, theme: "red" },
  { title: "End of the Beginning, Beginning of the End", detail: "Season 3 - Episode 50", type: "episode", season: "Season 3", episodeNumber: 50, theme: "red" },
  { title: "Moving into Dorms", detail: "Season 3 - Episode 51", type: "episode", season: "Season 3", episodeNumber: 51, theme: "red" },
  { title: "Create Those Ultimate Moves", detail: "Season 3 - Episode 52", type: "episode", season: "Season 3", episodeNumber: 52, theme: "red" },
  { title: "The Test", detail: "Season 3 - Episode 53", type: "episode", season: "Season 3", episodeNumber: 53, theme: "red" },
];
const season3Data_p4 = [{ title: "Shiketsu High Lurking", detail: "Season 3 - Episode 54", type: "episode", season: "Season 3", episodeNumber: 54, theme: "red" },
{ title: "Class 1-A", detail: "Season 3 - Episode 55", type: "episode", season: "Season 3", episodeNumber: 55, theme: "red" },
{ title: "RUSH!", detail: "Season 3 - Episode 56", type: "episode", season: "Season 3", episodeNumber: 56, theme: "red" },
{ title: "Rescue Exercises", detail: "Season 3 - Episode 57", type: "episode", season: "Season 3", episodeNumber: 57, theme: "red" },

{ title: "What’s the Big Idea?", detail: "Season 3 - Episode 59", type: "episode", season: "Season 3", episodeNumber: 59, theme: "red" },
{ title: "A Talk About Your Quirk", detail: "Season 3 - Episode 60", type: "episode", season: "Season 3", episodeNumber: 60, theme: "red" },
{ title: "Deku vs. Kacchan, Part 2", detail: "Season 3 - Episode 61", type: "episode", season: "Season 3", episodeNumber: 61, theme: "red" },
{ title: "A Season for Encounters", detail: "Season 3 - Episode 62", type: "episode", season: "Season 3", episodeNumber: 62, theme: "red" },
{ title: "Unrivaled", detail: "Season 3 - Episode 63", type: "episode", season: "Season 3", episodeNumber: 63, theme: "red" },];

  const season4Data = [
  { title: "The Scoop on U.A. Class 1-A", detail: "Season 4 - Episode 64", type: "episode", season: "Season 4", episodeNumber: 64, theme: "emerald" },
  { title: "Overhaul", detail: "Season 4 - Episode 65", type: "episode", season: "Season 4", episodeNumber: 65, theme: "emerald" },
  { title: "Boy Meets...", detail: "Season 4 - Episode 66", type: "episode", season: "Season 4", episodeNumber: 66, theme: "emerald" },
  { title: "Fighting Fate", detail: "Season 4 - Episode 67", type: "episode", season: "Season 4", episodeNumber: 67, theme: "emerald" },
  { title: "Let’s Go, Gutsy Red Riot", detail: "Season 4 - Episode 68", type: "episode", season: "Season 4", episodeNumber: 68, theme: "emerald" },
  { title: "An Unpleasant Talk", detail: "Season 4 - Episode 69", type: "episode", season: "Season 4", episodeNumber: 69, theme: "emerald" },
  { title: "GO!!", detail: "Season 4 - Episode 70", type: "episode", season: "Season 4", episodeNumber: 70, theme: "emerald" },
  { title: "Suneater of the Big Three", detail: "Season 4 - Episode 71", type: "episode", season: "Season 4", episodeNumber: 71, theme: "emerald" },
  { title: "Red Riot", detail: "Season 4 - Episode 72", type: "episode", season: "Season 4", episodeNumber: 72, theme: "emerald" },
  { title: "Temp Squad", detail: "Season 4 - Episode 73", type: "episode", season: "Season 4", episodeNumber: 73, theme: "emerald" },
  { title: "Unforeseen Hope", detail: "Season 4 - Episode 74", type: "episode", season: "Season 4", episodeNumber: 74, theme: "emerald" },
  { title: "Infinite 100%", detail: "Season 4 - Episode 75", type: "episode", season: "Season 4", episodeNumber: 75, theme: "emerald" },
  { title: "A Bright Future", detail: "Season 4 - Episode 76", type: "episode", season: "Season 4", episodeNumber: 76, theme: "emerald" },
  { title: "Smoldering Flames", detail: "Season 4 - Episode 77", type: "episode", season: "Season 4", episodeNumber: 77, theme: "emerald" },
  { title: "Win Those Kids’ Hearts", detail: "Season 4 - Episode 78", type: "episode", season: "Season 4", episodeNumber: 78, theme: "emerald" },
  { title: "Match 1", detail: "Season 4 - Episode 79", type: "episode", season: "Season 4", episodeNumber: 79, theme: "emerald" },
  { title: "Match 2", detail: "Season 4 - Episode 80", type: "episode", season: "Season 4", episodeNumber: 80, theme: "emerald" },
  { title: "Match 3", detail: "Season 4 - Episode 81", type: "episode", season: "Season 4", episodeNumber: 81, theme: "emerald" },
  { title: "Match 4", detail: "Season 4 - Episode 82", type: "episode", season: "Season 4", episodeNumber: 82, theme: "emerald" },
  { title: "Prepping for the School Festival", detail: "Season 4 - Episode 83", type: "episode", season: "Season 4", episodeNumber: 83, theme: "emerald" },
  { title: "School Festival Start!!", detail: "Season 4 - Episode 84", type: "episode", season: "Season 4", episodeNumber: 84, theme: "emerald" },
  { title: "Let It Flow! School Festival!", detail: "Season 4 - Episode 85", type: "episode", season: "Season 4", episodeNumber: 85, theme: "emerald" },
  { title: "Hero Billboard Chart JP", detail: "Season 4 - Episode 86", type: "episode", season: "Season 4", episodeNumber: 86, theme: "emerald" },
  { title: "Japanese Hero Billboard Chart", detail: "Season 4 - Episode 87", type: "episode", season: "Season 4", episodeNumber: 87, theme: "emerald" },
  { title: "His Start", detail: "Season 4 - Episode 88", type: "episode", season: "Season 4", episodeNumber: 88, theme: "emerald" },
];

const season5Data_p1 = [
  { title: "All Hands on Deck! Class 1-A", detail: "Season 5 - Episode 89", type: "episode", season: "Season 5", episodeNumber: 89, theme: "purple" },
  { title: "Vestiges", detail: "Season 5 - Episode 90", type: "episode", season: "Season 5", episodeNumber: 90, theme: "purple" },
  { title: "Clash! Class A vs Class B!", detail: "Season 5 - Episode 91", type: "episode", season: "Season 5", episodeNumber: 91, theme: "purple" },
  { title: "Make It Happen, Shinso!", detail: "Season 5 - Episode 92", type: "episode", season: "Season 5", episodeNumber: 92, theme: "purple" },
  { title: "Operation New Improv Moves", detail: "Season 5 - Episode 93", type: "episode", season: "Season 5", episodeNumber: 93, theme: "purple" },
  { title: "Foresight", detail: "Season 5 - Episode 94", type: "episode", season: "Season 5", episodeNumber: 94, theme: "purple" },
  { title: "Match 3", detail: "Season 5 - Episode 95", type: "episode", season: "Season 5", episodeNumber: 95, theme: "purple" },
  { title: "Match 3 Conclusion", detail: "Season 5 - Episode 96", type: "episode", season: "Season 5", episodeNumber: 96, theme: "purple" },
  { title: "Conclusion!", detail: "Season 5 - Episode 97", type: "episode", season: "Season 5", episodeNumber: 97, theme: "purple" },
  { title: "Early Bird!", detail: "Season 5 - Episode 98", type: "episode", season: "Season 5", episodeNumber: 98, theme: "purple" },
  { title: "Our Brawl", detail: "Season 5 - Episode 99", type: "episode", season: "Season 5", episodeNumber: 99, theme: "purple" },
  { title: "Long Time No See, Selkie", detail: "Season 5 - Episode 100", type: "episode", season: "Season 5", episodeNumber: 100, theme: "purple" },
  
];

const season5Data_p2 = [{title: "One Thing at a Time", detail: "Season 5 - Episode 101", type: "episode", season: "Season 5", episodeNumber: 101, theme: "purple" }];
const season5Data_p3 = [
{ title: "Have a Merry Christmas!", detail: "Season 5 - Episode 102", type: "episode", season: "Season 5", episodeNumber: 102, theme: "purple" },
{ title: "One for All", detail: "Season 5 - Episode 103", type: "episode", season: "Season 5", episodeNumber: 103, theme: "purple" },
{ title: "Off to Endeavor’s Agency!", detail: "Season 5 - Episode 104", type: "episode", season: "Season 5", episodeNumber: 104, theme: "purple" },
{ title: "Smoldering Flames", detail: "Season 5 - Episode 105", type: "episode", season: "Season 5", episodeNumber: 105, theme: "purple" },
{ title: "The Unforgiven", detail: "Season 5 - Episode 106", type: "episode", season: "Season 5", episodeNumber: 106, theme: "purple" },
{ title: "More of a Hero Than Anyone", detail: "Season 5 - Episode 107", type: "episode", season: "Season 5", episodeNumber: 107, theme: "purple" },
{ title: "My Villain Academia", detail: "Season 5 - Episode 108", type: "episode", season: "Season 5", episodeNumber: 108, theme: "purple" },
{ title: "Revival Party", detail: "Season 5 - Episode 109", type: "episode", season: "Season 5", episodeNumber: 109, theme: "purple" },
{ title: "Sad Man’s Parade", detail: "Season 5 - Episode 110", type: "episode", season: "Season 5", episodeNumber: 110, theme: "purple" },
{ title: "Tenko Shimura: Origin", detail: "Season 5 - Episode 111", type: "episode", season: "Season 5", episodeNumber: 111, theme: "purple" },
{ title: "Tomura Shigaraki: Origin", detail: "Season 5 - Episode 112", type: "episode", season: "Season 5", episodeNumber: 112, theme: "purple" },
{ title: "The High, Deep Blue Sky", detail: "Season 5 - Episode 113", type: "episode", season: "Season 5", episodeNumber: 113, theme: "purple" },];

const season6Data = [
  { title: "A Quiet Beginning", detail: "Season 6 - Episode 114", type: "episode", season: "Season 6", episodeNumber: 114, theme: "zinc" },
  { title: "Mirko, the No. 5 Hero", detail: "Season 6 - Episode 115", type: "episode", season: "Season 6", episodeNumber: 115, theme: "zinc" },
  { title: "One’s Justice", detail: "Season 6 - Episode 116", type: "episode", season: "Season 6", episodeNumber: 116, theme: "zinc" },
  { title: "Inheritance", detail: "Season 6 - Episode 117", type: "episode", season: "Season 6", episodeNumber: 117, theme: "zinc" },
  { title: "The Thrill of Destruction", detail: "Season 6 - Episode 118", type: "episode", season: "Season 6", episodeNumber: 118, theme: "zinc" },
  { title: "Encounter Part 2", detail: "Season 6 - Episode 119", type: "episode", season: "Season 6", episodeNumber: 119, theme: "zinc" },
  { title: "Disaster Walker", detail: "Season 6 - Episode 120", type: "episode", season: "Season 6", episodeNumber: 120, theme: "zinc" },
  { title: "Dabi’s Dance", detail: "Season 6 - Episode 121", type: "episode", season: "Season 6", episodeNumber: 121, theme: "zinc" },
  { title: "Tartarus", detail: "Season 6 - Episode 122", type: "episode", season: "Season 6", episodeNumber: 122, theme: "zinc" },
  { title: "The Wrong Way to Put Out a Fire", detail: "Season 6 - Episode 123", type: "episode", season: "Season 6", episodeNumber: 123, theme: "zinc" },
  { title: "Toshinori Yagi: Rising", detail: "Season 6 - Episode 124", type: "episode", season: "Season 6", episodeNumber: 124, theme: "zinc" },
  { title: "The Threads that Bind Us", detail: "Season 6 - Episode 125", type: "episode", season: "Season 6", episodeNumber: 125, theme: "zinc" },
  { title: "Black Hero", detail: "Season 6 - Episode 126", type: "episode", season: "Season 6", episodeNumber: 126, theme: "zinc" },
  { title: "Friend", detail: "Season 6 - Episode 127", type: "episode", season: "Season 6", episodeNumber: 127, theme: "zinc" },
  { title: "Tartarus Escapees", detail: "Season 6 - Episode 128", type: "episode", season: "Season 6", episodeNumber: 128, theme: "zinc" },
  { title: "The Hellish Todoroki Family", detail: "Season 6 - Episode 129", type: "episode", season: "Season 6", episodeNumber: 129, theme: "zinc" },
  { title: "The Wrong Way to Put Out a Fire (Part 2)", detail: "Season 6 - Episode 130", type: "episode", season: "Season 6", episodeNumber: 130, theme: "zinc" },
  { title: "Dark Deku", detail: "Season 6 - Episode 131", type: "episode", season: "Season 6", episodeNumber: 131, theme: "zinc" },
  { title: "Full Power!!", detail: "Season 6 - Episode 132", type: "episode", season: "Season 6", episodeNumber: 132, theme: "zinc" },
  { title: "The Lovely Lady Nagant", detail: "Season 6 - Episode 133", type: "episode", season: "Season 6", episodeNumber: 133, theme: "zinc" },
  { title: "Hired Gun", detail: "Season 6 - Episode 134", type: "episode", season: "Season 6", episodeNumber: 134, theme: "zinc" },
  { title: "The Encounter, Part 2", detail: "Season 6 - Episode 135", type: "episode", season: "Season 6", episodeNumber: 135, theme: "zinc" },
  { title: "The Final Act Begins", detail: "Season 6 - Episode 136", type: "episode", season: "Season 6", episodeNumber: 136, theme: "zinc" },
  { title: "A Young Woman’s Declaration", detail: "Season 6 - Episode 137", type: "episode", season: "Season 6", episodeNumber: 137, theme: "zinc" },
  { title: "No Man Is an Island", detail: "Season 6 - Episode 138", type: "episode", season: "Season 6", episodeNumber: 138, theme: "zinc" },
  // { title: "Izuku Midoriya: Resolve",detail: "Memories", type: "special", season: "Special", episodeNumber: "Memories" , theme: "zinc"},
];

const season7Data_p1 = [
  { title: "In the Nick of Time! A Big-Time Development!", detail: "Season 7 - Episode 139", type: "episode", season: "Season 7", episodeNumber: 139, theme: "orange" },
  { title: "Apotheosis", detail: "Season 7 - Episode 140", type: "episode", season: "Season 7", episodeNumber: 140, theme: "orange" },
  { title: "Villain", detail: "Season 7 - Episode 141", type: "episode", season: "Season 7", episodeNumber: 141, theme: "orange" },
  { title: "Division", detail: "Season 7 - Episode 142", type: "episode", season: "Season 7", episodeNumber: 142, theme: "orange" },
  
];

const season7Data_p2 = [{ title: "Let You Down", detail: "Season 7 - Episode 143", type: "episode", season: "Season 7", episodeNumber: 143, theme: "orange" },
{ title: "Specter", detail: "Season 7 - Episode 144", type: "episode", season: "Season 7", episodeNumber: 144, theme: "orange" },
{ title: "Peace Sign", detail: "Season 7 - Episode 145", type: "episode", season: "Season 7", episodeNumber: 145, theme: "orange" },
{ title: "The Story of How We All Became Heroes", detail: "Season 7 - Episode 146", type: "episode", season: "Season 7", episodeNumber: 146, theme: "orange" },
{ title: "EXTRAS", detail: "Season 7 - Episode 147", type: "episode", season: "Season 7", episodeNumber: 147, theme: "orange" },
{ title: "Shout", detail: "Season 7 - Episode 148", type: "episode", season: "Season 7", episodeNumber: 148, theme: "orange" },
{ title: "UNITY", detail: "Season 7 - Episode 149", type: "episode", season: "Season 7", episodeNumber: 149, theme: "orange" },
{ title: "A Bond of Flames", detail: "Season 7 - Episode 150", type: "episode", season: "Season 7", episodeNumber: 150, theme: "orange" },
{ title: "All Might Rising Rematch", detail: "Season 7 - Episode 151", type: "episode", season: "Season 7", episodeNumber: 151, theme: "orange" },
{ title: "One Who Is Like a God", detail: "Season 7 - Episode 152", type: "episode", season: "Season 7", episodeNumber: 152, theme: "orange" },
{ title: "Sky-High Are Your Hopes", detail: "Season 7 - Episode 153", type: "episode", season: "Season 7", episodeNumber: 153, theme: "orange" },
{ title: "The Decisive Battle", detail: "Season 7 - Episode 154", type: "episode", season: "Season 7", episodeNumber: 154, theme: "orange" },
{ title: "Stand Strong", detail: "Season 7 - Episode 155", type: "episode", season: "Season 7", episodeNumber: 155, theme: "orange" },
{ title: "A World Without Heroes", detail: "Season 7 - Episode 156", type: "episode", season: "Season 7", episodeNumber: 156, theme: "orange" },
{ title: "FINALE - Plus Ultra", detail: "Season 7 - Episode 157", type: "episode", season: "Season 7", episodeNumber: 157, theme: "orange" },
{ title: "Epilogue Part 1", detail: "Season 7 - Episode 158", type: "episode", season: "Season 7", episodeNumber: 158, theme: "orange" },
{ title: "Epilogue Part 2", detail: "Season 7 - Episode 159", type: "episode", season: "Season 7", episodeNumber: 159, theme: "orange" },];

// Constructing the chronological Anime Timeline
const animeData = [
  ...season1Data,
  { title: "Save! Rescue Training!", detail: "OVA / Special", type: "special" ,theme: "pink"},
  { title: "Hero Notebook", detail: "OVA / Special", type: "special" , theme: "pink"},
  
  // Season 2 (Blue - Sports Festival/Stain)
  ...season2Data_p1,
  { title: "Training of the Dead", detail: "OVA / Special", type: "special" ,theme: "pink"},
  ...season2Data_p2,
  
  // Season 3 Ep 58 (Red - Chronological Placement)
  // { title: "Episode 58", detail: "Special Chronological Placement", type: "episode", season: "Season 3", episodeNumber: 58, theme: "red", note: "Watch before S3 Start" },
  ...season3Data_p1,
  { title: "Two Heroes", detail: "Movie 1", type: "movie" , theme:'lime'},
  { title: "Two Heroes: End Roll", detail: "Special Picture Drama", type: "special" ,theme: "pink"},
  
  // Season 3 Part 1 (Red - All For One)
  ...season3Data_p2,
  { title: "All Might: Rising", detail: "OVA / Special", type: "special" ,theme: "pink"},
  
  // Season 3 Part 2 (Red)
  ...season3Data_p3, // Includes note for Ep 53 pause in UI if needed
  { title: "Make It! Do-or-Die", detail: "Survival Training Pt.1 & 2", type: "special" ,theme: "pink"},
  // Resuming S3 (Ep 53 second half - 57, skipping 58, 59-63)
  ...season3Data_p4,
  
  // Season 4 (Green - Overhaul/School Festival)
  ...season4Data,
  
  // Season 5 Part 1 (Purple - Joint Training)
  ...season5Data_p1,
  
  { title: "Heroes Rising", detail: "Movie 2", type: "movie" , theme:'lime'},
  { title: "Heroes Rising Epilogue", detail: "Plus End Roll Picture Drama", type: "special" ,theme: "pink"},
  
  // Season 5 Ep 101
  ...season5Data_p2,
  
  { title: "U.A. Heroes Battle", detail: "OVA / Special", type: "special" ,theme: "pink"},
  
  // Season 5 Part 2 (Purple - MVA)
  ...season5Data_p3,
  
  { title: "Departure", detail: "Special", type: "special", note: "Before World Heroes’ Mission" ,theme: "pink"},
  { title: "World Heroes’ Mission", detail: "Movie 3", type: "movie" , theme:'lime', videoUrl:"https://drive.google.com/file/d/1sHoFSmEbfXRKYjfF1B5C7VGnLoa3_4DJ/view?usp=drive_link"},
  { title: "Hero League Baseball", detail: "OVA / Special", type: "special" ,theme: "pink"},
  { title: "Laugh! As If You Are in Hell", detail: "OVA / Special", type: "special" ,theme: "pink"},
  
  // Season 6 (Zinc/Grey - Dark War Arc)
  ...season6Data,
  
  { title: "Izuku Midoriya: Resolve", type: "special", sub: "Memories" ,theme: "pink"},
  { title: "Tohsinori Yagi: Embers", type: "special", sub: "Memories" ,theme: "pink"},
  { title: "Heroes: Convictions", type: "special", sub: "Memories" ,theme: "pink"},
  { title: "Tomura Shigaraki: Destruction", type: "special", sub: "Memories" ,theme: "pink"},
  
  // Season 7 Part 1 (Orange - Star/Final War)
  ...season7Data_p1,
  
  { title: "A Piece of Cake", detail: "OVA / Special", type: "special" ,theme: "pink"},
  { title: "You’re Next", detail: "Movie 4", type: "movie" , theme:'lime', videoUrl: "https://drive.google.com/file/d/1wySSAZ-wHvw72rw_G8oVJ9wjpVulpJ-E/view?usp=drive_link"},
  
  // Season 7 Part 2 (Orange)
  ...season7Data_p2,
  
  { title: "MHA: Vigilantes", detail: "Season 1", type: "spin-off", sub: "Complete [1-13]" },
];

const mangaData = [
  { title: "U.A. Beginnings Saga", detail: "Start of Series", type: "saga" },
  { title: "Volume 1", detail: "Chapters 1-7", type: "volume" },
  { title: "Volume 2", detail: "Chapters 8-10", type: "volume" },
  { title: "Volume 3", detail: "Chapter 10.5", type: "volume" },
  { title: "Volume 2 (Cont.)", detail: "Chapters 11-17", type: "volume" },
  { title: "Volume 3 (Cont.)", detail: "Ch 18-23, 23.5, 24-26", type: "volume" },
  { title: "Volume 4", detail: "Chapters 27-34", type: "volume" },
  { title: "Volume 8 (Flashback)", detail: "Chapter 34.5", type: "volume" },
  { title: "Volume 4 (Cont.)", detail: "Chapter 35", type: "volume" },
  { title: "Volume 5", detail: "Chapters 36-44", type: "volume" },
  { title: "Volume 6", detail: "Chapters 45-49", type: "volume" },
  { title: "Volume 5 (Omake)", detail: "Chapter 49.5", type: "volume" },
  { title: "Volume 6 (Cont.)", detail: "Chapters 50-53", type: "volume" },
  { title: "Volume 7", detail: "Chapters 54-59", type: "volume" },
  { title: "School Briefs I", detail: "Light Novel", type: "novel" },
  { title: "Volume 7 (Cont.)", detail: "Chapters 60-62", type: "volume" },
  { title: "Volume 8", detail: "Chapters 63-67", type: "volume" },
  { title: "Ultra Archive", detail: "Chapter 67.5", type: "special" },
  { title: "Volume 8 (Cont.)", detail: "Chapters 68-70", type: "volume" },
  { title: "Volume Origin", detail: "Special", type: "special" },
  { title: "Team-Up Missions Vol 1", detail: "Chapter 3.3", type: "spin-off" },
  { title: "Two Heroes", detail: "Movie Tie-in", type: "movie" },
  { title: "Volume 8 (Cont.)", detail: "Chapter 71", type: "volume" },
  { title: "Volume 9", detail: "Chapters 72-80", type: "volume" },
  { title: "Volume 10", detail: "Chapters 81-83", type: "volume" },
  { title: "School Briefs II", detail: "Light Novel", type: "novel" },
  { title: "Volume 10 (Cont.)", detail: "Ch 84, 84.5, 85-89", type: "volume" },
  { title: "Volume 11", detail: "Chapters 90-99", type: "volume" },
  { title: "Rise of Villains Saga", detail: "Major Arc Start", type: "saga" },
  { title: "Volume 12", detail: "Chapters 100-108", type: "volume" },
  { title: "Volume 13", detail: "Chapters 109-118", type: "volume" },
  { title: "Volume 14", detail: "Chapters 119-121", type: "volume" },
  { title: "School Briefs III", detail: "Light Novel", type: "novel" },
  { title: "Volume 14 (Cont.)", detail: "Chapters 122-128", type: "volume" },
  { title: "Volume 15-19", detail: "Chapters 129-177", type: "volume", sub: "Overhaul & Cultural Festival Arcs" },
  { title: "Volume 20", detail: "Chapters 178-183", type: "volume" },
  { title: "School Briefs IV", detail: "Light Novel", type: "novel" },
  { title: "Volume 20 (Cont.)", detail: "Chapters 184-188", type: "volume" },
  { title: "Volume 21", detail: "Chapters 189-200", type: "volume" },
  { title: "Vigilantes Begins", detail: "Vol 14 [0.2], Vol 1-3", type: "spin-off" },
  { title: "Vigilantes Continued", detail: "Vol 2-9 [Ch 7-65]", type: "spin-off" },
  { title: "Volume 22-25", detail: "Ch 201-242", type: "volume", sub: "Joint Training & MLA Arcs" },
  { title: "Team-Up Missions Vol 2", detail: "Ch 9.1, 9.2", type: "spin-off" },
  { title: "Volume Rising", detail: "Special", type: "special" },
  { title: "Heroes Rising", detail: "Movie Tie-in", type: "movie" },
  { title: "Volume 25-26", detail: "Ch 243-252", type: "volume" },
  { title: "School Briefs V & VI", detail: "Light Novels", type: "novel" },
  { title: "Volume 26 (Cont.)", detail: "Ch 252-257", type: "volume" },
  { title: "Volume World Heroes", detail: "Special", type: "special" },
  { title: "World Heroes Mission", detail: "Movie Tie-in", type: "movie" },
  { title: "Vigilantes Conclusion", detail: "Vol 9-15 [Ch 66-126]", type: "spin-off" },
  { title: "Team-Up Missions", detail: "Vol 1-8 (Mixed Chapters)", type: "spin-off" },
  { title: "Volume 26-31", detail: "Ch 258-306", type: "volume", sub: "War Arc" },
  { title: "Final Act Saga", detail: "Major Arc Start", type: "saga" },
  { title: "Volume 32-35", detail: "Ch 307-342", type: "volume" },
  { title: "Volume Next", detail: "Special", type: "special" },
  { title: "You're Next", detail: "Movie Tie-in", type: "movie" },
  { title: "Volume 35-42", detail: "Ch 343-431", type: "volume", sub: "Final War" },
  { title: "Ultra Age", detail: "Chapter 431.5", type: "special" },
];

const libraryData = [
    {
        id: "vol1",
        title: "Volume 1: Izuku Midoriya: Origin",
        image: "https://m.media-amazon.com/images/I/81AjnD8nvHL._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "4 August 2015",
        category: "Main Series",
        language: "English",
        description: "Midoriya inherits the superpower of the world’s greatest hero, but greatness won’t come easy. What would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless? Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn’t got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all, gives him a chance to change his destiny…"
    },
    {
        id: "vol1_variant",
        title: "Volume 1 (Scholastic Variant)",
        image: "https://i.ibb.co/1JM5msVR/US-Volume-1-Scholastic-Cover.png",
        author: "Kohei Horikoshi",
        date: "4 August 2015",
        category: "Variant Cover",
        language: "English",
        description: "Midoriya inherits the superpower of the world’s greatest hero, but greatness won’t come easy. What would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless? Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn’t got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all, gives him a chance to change his destiny…"
    },
    {
        id: "vol2",
        title: "Volume 2: Rage, You Damned Nerd",
        image: "https://m.media-amazon.com/images/I/81ctOuD4lIL._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "3 November 2015",
        category: "Main Series",
        language: "English",
        description: "Getting into U.A. High School was difficult enough, but it was only the beginning of Midoriya’s long road toward becoming a superhero. The new students all have amazing powers, and although Midoriya has inherited All Might’s abilities, he can barely control them. What’s more, the first-year students are told they will have to compete just to avoid being expelled!"
    },
    {
        id: "vol3",
        title: "Volume 3: All Might",
        image: "https://m.media-amazon.com/images/I/815IWVldmFL._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "2 February 2016",
        category: "Main Series",
        language: "English",
        description: "A sinister group of villains has attacked the first-year U.A. students, but their real target is All Might. It’s all that Midoriya and his classmates can do to hold them off until reinforcements arrive. All Might joins the battle to protect the kids, but as his power runs out, he may be forced into an extremely dangerous bluff!"
    },
    {
        id: "vol4",
        title: "Volume 4: The Boy Born with Everything",
        image: "https://m.media-amazon.com/images/I/91Os+dWdLdL._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "3 May 2016",
        category: "Main Series",
        language: "English",
        description: "The U.A. High sports festival is a chance for the budding heroes to show their stuff and find a superhero mentor. The students have already struggled through a grueling preliminary round, but now they have to team up to prove they’re capable of moving on to the next stage. The whole country is watching, and so are the shadowy forces that attacked the academy…"
    },
    {
        id: "vol5",
        title: "Volume 5: Todoroki Shoto: Origin",
        image: "https://m.media-amazon.com/images/I/819S87qt98L._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "2 August 2016",
        category: "Main Series",
        language: "English",
        description: "The final stages of the U.A. High sports festival promise to be explosive, as Uraraka takes on Bakugo in a head-to-head match! Bakugo never gives anyone a break, and the crowd holds its breath as the battle begins. The finals will push the students of Class 1-A to their limits and beyond!"
    },
    {
        id: "vol6",
        title: "Volume 6: Struggle!",
        image: "https://m.media-amazon.com/images/I/81RF6hFOnvL._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "1 November 2016",
        category: "Main Series",
        language: "English",
        description: "In the aftermath of the sports festival, the Class 1-A students begin their internships. Midoriya goes to study under Gran Torino, who was once All Might’s mentor. Gran Torino appears to be a washed-up nutjob, but the old hero still has more moves than a football team, and Midoriya has a lot to learn! Elsewhere, the League of Villains enacts another sinister plot and unleashes a terrifying new enemy!"
    },
    {
        id: "vol7",
        title: "Volume 7: Katsuki Bakugo: Origin",
        image: "https://m.media-amazon.com/images/I/81f274gTf3L._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "7 February 2017",
        category: "Main Series",
        language: "English",
        description: "Midoriya has learned a few tricks from Gran Torino, but some things just have to be experienced to be understood. Even though he’s not ready, when the League of Villains attacks in the town of Hosu, Midoriya rushes to help Ida, who is engaged in a life-and-death struggle with Hero Killer Stain. Stain has some very particular ideas about heroes and their place in society—and he means to purge the world of every hero he can find!"
    },
    {
        id: "vol8",
        title: "Volume 8: Yaoyorozu Rising",
        image: "https://m.media-amazon.com/images/I/81VCYrUAqiL._SL1500_.jpg",
        author: "Kohei Horikoshi",
        date: "2 May 2017",
        category: "Main Series",
        language: "English",
      description: "The U.A. students have reached the practical portion of their final exam, but they didn’t expect to have to beat their own teachers in order to pass! Paired with his archrival Bakugo, Midoriya has to try to take on none other than All Might himself. Working with Bakugo is one thing, but is giving everything he’s got to beat All Might more than Midoriya can handle? And in a nearby arena, Yaoyorozu and Todoroki endure a similar struggle. Meanwhile, a sinister new adversary prepares to make a move…"
    }
  ,
    {
    "id": "vol9",
    "title": "Volume 9: My Hero",
    "image": "https://m.media-amazon.com/images/I/81eVrBK23SL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "1 August 2017",
    "category": "Main Series",
    "language": "English",
    "description": "It’s off to summer camp for Midoriya and the U.A. students! But this is no ordinary vacation—it’s high-impact training where the students are expected to develop their Quirks even further! The teachers have set up some tough challenges, but none will be as difficult and as life changing as the threat a new group of enemies poses. What’s even worse is who the villains’ target is and why…"
  },
  {
    "id": "vol10",
    "title": "Volume 10: All For One",
    "image": "https://m.media-amazon.com/images/I/81BukbxPXDL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "7 November 2017",
    "category": "Main Series",
    "language": "English",
    "description": "The League of Villains has kidnapped Bakugo, and the resulting negative publicity has thrown U.A. into a huge uproar. With the public’s trust in heroes threatened, the faculty convenes to figure out what to do. But Midoriya and the students of Class 1-A have plans of their own—an operation to rescue Bakugo that could get them thrown out of school!"
  },
  {
    "id": "vol11",
    "title": "Volume 11: End of the Beginning, Beginning of the End",
    "image": "https://m.media-amazon.com/images/I/81pqu3-+PSL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "6 February 2018",
    "category": "Main Series",
    "language": "English",
    "description": "Bakugo’s abduction by the League of Villains was a carefully calculated move designed to draw out the heroes—All Might in particular—and destroy them. Midoriya and his friends set out on a rescue mission that eventually pulls in not only All Might but also several other heroes! The casualties mount, until at last the mastermind of the plot appears—All for One, the only villain powerful enough to take on All Might head-to-head and possibly win!"
  },
  {
    "id": "vol12",
    "title": "Volume 12: The Test",
    "image": "https://m.media-amazon.com/images/I/917qS1EqK9L._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "3 April 2018",
    "category": "Main Series",
    "language": "English",
    "description": "Class 1-A is working on developing their ultimate moves—a process that will test their strength and creativity in all-new ways! To help them out, Mei Hatsume, a student from the Support Course, is brought in to develop improvements to their costumes. The attention from Mei might be more than Midoriya can handle, but he’ll need every edge he can get to pass the next hurdle for the students of U.A.—the Provisional Licensing Exam!"
  },
  {
    "id": "vol13",
    "title": "Volume 13: A Talk About Your Quirk",
    "image": "https://m.media-amazon.com/images/I/81vzSKLUBDL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "5 June 2018",
    "category": "Main Series",
    "language": "English",
    "description": "The students of Class 1-A have reached another milestone—the Provisional Licensing Exam. After making it through the first part of the test, they ready themselves for the next phase, which takes place in a simulated disaster area. Midoriya and his friends have to rescue as many victims as they can..."
  },
  {
    "id": "vol14",
    "title": "Volume 14: Overhaul",
    "image": "https://m.media-amazon.com/images/I/8111p2X1ATL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "7 August 2018",
    "category": "Main Series",
    "language": "English",
    "description": "Summer vacation is over, and it’s back to school for the students of U.A. High! But before classes can get started, Midoriya and Bakugo need to settle a beef between them that’s been a long time coming..."
  },
  {
    "id": "vol15",
    "title": "Volume 15: Fighting Fate",
    "image": "https://m.media-amazon.com/images/I/81qd2KQ-gzL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "2 October 2018",
    "category": "Main Series",
    "language": "English",
    "description": "A new and sinister enemy appears in the form of Chisaki Kai, the young leader of the Hassaikai yakuza gang..."
  },
  {
    "id": "vol16",
    "title": "Volume 16: Red Riot",
    "image": "https://m.media-amazon.com/images/I/81yHtpGM7YL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "4 December 2018",
    "category": "Main Series",
    "language": "English",
    "description": "The Hassaikai crime gang, led by the young boss Chisaki, has been working on a plan to distribute a Quirk-destroying drug..."
  },
  {
    "id": "vol18",
    "title": "Volume 18: Bright Future",
    "image": "https://m.media-amazon.com/images/I/81hwHys6PLL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "2 April 2019",
    "category": "Main Series",
    "language": "English",
    "description": "Midoriya is in the fight of his life—an all-out battle with Overhaul..."
  },
  {
    "id": "vol19",
    "title": "Volume 19: School Festival",
    "image": "https://m.media-amazon.com/images/I/81hBurIehoL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "4 June 2019",
    "category": "Main Series",
    "language": "English",
    "description": "In the wake of tragedy, Class 1-A prepares for the upcoming culture festival..."
  },
  {
    "id": "vol20",
    "title": "Volume 20: School Festival Start!!",
    "image": "https://m.media-amazon.com/images/I/813dlh9e7EL._SL1500_.jpg",
    "author": "Kohei Horikoshi",
    "date": "6 August 2019",
    "category": "Main Series",
    "language": "English",
    "description": "With All Might in retirement, Endeavor takes up the mantle of the number one hero..."
  }
];

// --- COMPONENTS ---

// const WatchPage = ({ episode, onNavigate, onBack }) => {
//     if (!episode) return null;

//     // Convert view link to preview link for embedding if it's a google drive link
//     let embedUrl = episode.videoUrl;
//     if (embedUrl && embedUrl.includes('drive.google.com') && embedUrl.includes('/view')) {
//         embedUrl = embedUrl.replace('/view', '/preview');
//     }

//     // Color mapping for WatchPage UI based on episode theme
//     const getThemeClasses = (theme) => {
//         switch(theme) {
//             case 'blue': return { text: 'text-blue-400', bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-400', shadow: 'shadow-blue-500/20' };
//             case 'red': return { text: 'text-red-500', bg: 'bg-red-600', hoverBg: 'hover:bg-red-500', shadow: 'shadow-red-600/20' };
//             case 'emerald': return { text: 'text-emerald-400', bg: 'bg-emerald-500', hoverBg: 'hover:bg-emerald-400', shadow: 'shadow-emerald-500/20' };
//             case 'purple': return { text: 'text-purple-400', bg: 'bg-purple-500', hoverBg: 'hover:bg-purple-400', shadow: 'shadow-purple-500/20' };
//             case 'zinc': return { text: 'text-slate-400', bg: 'bg-slate-500', hoverBg: 'hover:bg-slate-400', shadow: 'shadow-slate-500/20' };
//             case 'orange': return { text: 'text-orange-400', bg: 'bg-orange-500', hoverBg: 'hover:bg-orange-400', shadow: 'shadow-orange-500/20' };
//           case 'pink': return { text: 'text-pink-400', bg: 'bg-pink-500', hoverBg: 'hover:bg-pink-500', shadow: 'shadow-pink-500/50' };
//           case 'lime': return { text: 'text-lime-400', bg: 'bg-lime-500', hoverBg: 'hover:bg-lime-500', shadow: 'shadow-lime-500/50' };
//             default: return { text: 'text-yellow-400', bg: 'bg-yellow-500', hoverBg: 'hover:bg-yellow-400', shadow: 'shadow-yellow-500/20' };
//         }
//     };

//     const themeColors = getThemeClasses(episode.theme);

//     return (
//         <div className="h-full w-full flex flex-col relative bg-black">
//             {/* Header */}
//             <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
//                 <button 
//                     onClick={onBack}
//                     className={`flex items-center gap-2 text-white/80 hover:${themeColors.text} transition-colors`}
//                 >
//                     <ChevronLeft size={24} />
//                     <span className="font-bold uppercase text-sm tracking-widest">Back to Timeline</span>
//                 </button>
//                 <div className="text-right">
//                     <h2 className={`${themeColors.text} font-black uppercase italic text-lg`}>{episode.season}</h2>
//                     <p className="text-white font-bold text-sm">{episode.title}</p>
//                 </div>
//             </div>

//             {/* Video Player Container */}
//             <div className="flex-1 flex items-center justify-center bg-slate-900 relative group">
//                 {embedUrl ? (
//                     <iframe 
//                         src={embedUrl} 
//                         className={`w-full h-full md:max-w-5xl md:h-[70vh] border-0 shadow-2xl ${themeColors.shadow}`}
//                         allow="autoplay; fullscreen"
//                         allowFullScreen
//                         title={episode.title}
//                     ></iframe>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center text-slate-500 gap-4 p-8 border-2 border-slate-700 border-dashed rounded-xl">
//                         <AlertCircle size={48} />
//                         <div className="text-center">
//                             <h3 className="text-xl font-bold text-slate-300 mb-1">Stream Unavailable</h3>
//                             <p className="text-sm">The video source for this episode hasn't been added to the archives yet.</p>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Controls Bar */}
//             <div className="bg-slate-900 border-t border-white/10 p-4 md:p-6 z-20">
//                 <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
//                     <button 
//                         onClick={() => onNavigate('prev')}
//                         className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={episode.episodeNumber <= 1}
//                     >
//                         <SkipBack size={20} />
//                         <span className="hidden md:inline font-bold text-sm uppercase">Previous Ep</span>
//                     </button>

//                     <div className="text-center">
//                         <span className="block text-slate-400 text-[10px] uppercase tracking-widest font-bold">Now Watching</span>
//                         <span className="block text-white font-black text-lg uppercase italic truncate max-w-[200px] md:max-w-md">
//                             {episode.title}
//                         </span>
//                     </div>

//                     <button 
//                         onClick={() => onNavigate('next')}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg ${themeColors.bg} ${themeColors.hoverBg} text-white transition-all active:scale-95 shadow-lg ${themeColors.shadow}`}
//                     >
//                         <span className="hidden md:inline font-bold text-sm uppercase">Next Ep</span>
//                         <SkipForward size={20} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

const WatchPage = ({ episode, onNavigate, onBack }) => {
    if (!episode) return null;

    // Convert view link to preview link for embedding if it's a google drive link
    let embedUrl = episode.videoUrl;
    if (embedUrl && embedUrl.includes('drive.google.com') && embedUrl.includes('/view')) {
        embedUrl = embedUrl.replace('/view', '/preview');
    }

    // Color mapping for WatchPage UI based on episode theme
    const getThemeClasses = (theme) => {
        switch(theme) {
            case 'blue': return { text: 'text-blue-400', bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-400', shadow: 'shadow-blue-500/20' };
            case 'red': return { text: 'text-red-500', bg: 'bg-red-600', hoverBg: 'hover:bg-red-500', shadow: 'shadow-red-600/20' };
            case 'emerald': return { text: 'text-emerald-400', bg: 'bg-emerald-500', hoverBg: 'hover:bg-emerald-400', shadow: 'shadow-emerald-500/20' };
            case 'purple': return { text: 'text-purple-400', bg: 'bg-purple-500', hoverBg: 'hover:bg-purple-400', shadow: 'shadow-purple-500/20' };
            case 'zinc': return { text: 'text-slate-400', bg: 'bg-slate-500', hoverBg: 'hover:bg-slate-400', shadow: 'shadow-slate-500/20' };
            case 'orange': return { text: 'text-orange-400', bg: 'bg-orange-500', hoverBg: 'hover:bg-orange-400', shadow: 'shadow-orange-500/20' };
            case 'pink': return { text: 'text-pink-400', bg: 'bg-pink-500', hoverBg: 'hover:bg-pink-500', shadow: 'shadow-pink-500/50' };
            case 'lime': return { text: 'text-lime-400', bg: 'bg-lime-500', hoverBg: 'hover:bg-lime-500', shadow: 'shadow-lime-500/50' };
            default: return { text: 'text-yellow-400', bg: 'bg-yellow-500', hoverBg: 'hover:bg-yellow-400', shadow: 'shadow-yellow-500/20' };
        }
    };

    const themeColors = getThemeClasses(episode.theme);

    return (
        // FIX 1: Changed h-full to min-h-screen and allowed overflow-y-auto so you can scroll on small screens
        <div className="min-h-screen w-full flex flex-col bg-black overflow-y-auto">
            
            {/* FIX 2: Removed 'absolute'. This is now a static block that pushes content down. 
                Added sticky top-0 so it stays visible if you scroll, but doesn't overlap initially. 
            */}
            <div className="w-full p-4 z-50 flex justify-between items-center bg-slate-900 border-b border-white/10 sticky top-0 shadow-lg">
                <button 
                    onClick={onBack}
                    className={`flex items-center gap-2 text-white/80 hover:${themeColors.text} transition-colors`}
                >
                    <ChevronLeft size={24} />
                    <span className="font-bold uppercase text-sm tracking-widest">Back to Timeline</span>
                </button>
                <div className="text-right">
                    <h2 className={`${themeColors.text} font-black uppercase italic text-lg`}>{episode.season}</h2>
                    <p className="text-white font-bold text-sm hidden md:block">{episode.title}</p>
                    {/* Mobile only simplified title if needed */}
                    <p className="text-white font-bold text-xs md:hidden">Ep {episode.episodeNumber}</p>
                </div>
            </div>

            {/* FIX 3: Added vertical padding (py-8) and ensures flex-1 pushes footer down. 
                Removed 'h-full' constraints that locked the layout.
            */}
            <div className="flex-1 flex flex-col items-center justify-center w-full py-8 px-4 md:px-8">
                {embedUrl ? (
                    // FIX 4: Changed formatting to aspect-video. 
                    // This ensures it fits on phones without being too tall, and respects width on laptops.
                    <div className="w-full max-w-5xl aspect-video relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                        <iframe 
                            src={embedUrl} 
                            className={`w-full h-full border-0 ${themeColors.shadow}`}
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title={episode.title}
                        ></iframe>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 gap-4 p-8 border-2 border-slate-700 border-dashed rounded-xl m-10">
                        <AlertCircle size={48} />
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-300 mb-1">Stream Unavailable</h3>
                            <p className="text-sm">The video source for this episode hasn't been added to the archives yet.</p>
                        </div>
                    </div>
                )}
                
                {/* Title below video for mobile visibility since header is small */}
                <h1 className="md:hidden text-white font-black uppercase italic text-xl mt-6 text-center">{episode.title}</h1>
            </div>

            {/* Controls Bar - Stays at bottom of flow, but user can scroll to reach it if screen is short */}
            <div className="w-full bg-slate-900 border-t border-white/10 p-4 md:p-6 z-20 mt-auto">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <button 
                        onClick={() => onNavigate('prev')}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={episode.episodeNumber <= 1}
                    >
                        <SkipBack size={20} />
                        <span className="hidden md:inline font-bold text-sm uppercase">Previous Ep</span>
                    </button>

                    <div className="text-center hidden md:block">
                        <span className="block text-slate-400 text-[10px] uppercase tracking-widest font-bold">Now Watching</span>
                        <span className="block text-white font-black text-lg uppercase italic truncate max-w-[200px] md:max-w-md">
                            {episode.title}
                        </span>
                    </div>

                    <button 
                        onClick={() => onNavigate('next')}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg ${themeColors.bg} ${themeColors.hoverBg} text-white transition-all active:scale-95 shadow-lg ${themeColors.shadow}`}
                    >
                        <span className="hidden md:inline font-bold text-sm uppercase">Next Ep</span>
                        <SkipForward size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const HomePage = ({ onNavigate }) => {
  const izukuImg = "https://i.ibb.co/kVfwwv7p/Izuku-Midoriya.png";
  const allMightImg = "https://i.ibb.co/Y4mSbpt6/Adobe-Express-file.png";

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col relative overflow-hidden font-sans text-white">
      <div className="absolute inset-0 z-0 bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-slate-900 to-emerald-500/20 animate-pulse"></div>
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1px,_transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="absolute bottom-0 left-0 md:-left-10 w-1/2 md:w-1/3 h-2/3 md:h-full z-10 opacity-80 pointer-events-none transition-transform hover:scale-105 duration-700">
        <img src={izukuImg} alt="Izuku" className="w-full h-full object-contain object-bottom drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
      </div>
      <div className="absolute bottom-0 right-0 md:-right-10 w-1/2 md:w-1/3 h-2/3 md:h-full z-10 opacity-80 pointer-events-none transition-transform hover:scale-105 duration-700">
        <img src={allMightImg} alt="All Might" className="w-full h-full object-contain object-bottom drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
      </div>

      <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-12 space-y-2 animate-[slideDown_1s_ease-out]">
          <h2 className="text-yellow-400 font-black tracking-widest uppercase text-xl md:text-2xl drop-shadow-md">
            The Ultimate Guide
          </h2>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-tight" style={{ textShadow: '4px 4px 0px #e11d48, -2px -2px 0px #0f172a' }}>
            My Hero Academia<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">
              All You Need to Know
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto bg-white rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto z-30 px-4">
          <button 
            onClick={() => onNavigate('anime')}
            className="group relative bg-gradient-to-br from-yellow-400 to-orange-500 p-1 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-xl hover:shadow-yellow-400/30"
          >
            <div className="bg-slate-900 h-full w-full rounded-xl px-6 py-6 flex flex-col items-start justify-between group-hover:bg-slate-800 transition-colors min-h-[140px]">
              <div className="w-full flex justify-between items-start mb-2">
                 <Tv className="text-yellow-400" size={32} strokeWidth={2} />
                 <ChevronRight className="text-yellow-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
              </div>
              <div className="text-left">
                <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-1">Watch Order</p>
                <h3 className="text-2xl font-black uppercase italic text-white group-hover:text-yellow-400 transition-colors">Anime</h3>
              </div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('manga')}
            className="group relative bg-gradient-to-br from-emerald-400 to-teal-500 p-1 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:-rotate-1 shadow-xl hover:shadow-emerald-400/30"
          >
            <div className="bg-slate-900 h-full w-full rounded-xl px-6 py-6 flex flex-col items-start justify-between group-hover:bg-slate-800 transition-colors min-h-[140px]">
              <div className="w-full flex justify-between items-start mb-2">
                 <BookOpen className="text-emerald-400" size={32} strokeWidth={2} />
                 <ChevronRight className="text-emerald-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
              </div>
              <div className="text-left">
                <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1">Read Order</p>
                <h3 className="text-2xl font-black uppercase italic text-white group-hover:text-emerald-400 transition-colors">Manga</h3>
              </div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('library')}
            className="group relative bg-gradient-to-br from-pink-500 to-purple-500 p-1 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-xl hover:shadow-pink-500/30"
          >
            <div className="bg-slate-900 h-full w-full rounded-xl px-6 py-6 flex flex-col items-start justify-between group-hover:bg-slate-800 transition-colors min-h-[140px]">
              <div className="w-full flex justify-between items-start mb-2">
                 <Library className="text-pink-400" size={32} strokeWidth={2} />
                 <ChevronRight className="text-pink-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
              </div>
              <div className="text-left">
                <p className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-1">Archive</p>
                <h3 className="text-2xl font-black uppercase italic text-white group-hover:text-pink-400 transition-colors">Library</h3>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="relative z-20 pb-4 text-slate-500 text-xs font-mono text-center uppercase">
        Plus Ultra Archives © 2025
      </div>
    </div>
  );
};

const TimelineCard = ({ item, index, borderColor, textColor, shadowColor, themeColor, onClick }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollScale, setScrollScale] = useState(0.85);
  const [scrollOpacity, setScrollOpacity] = useState(0.4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          if (ratio > 0.6) {
            setIsVisible(true);
            setScrollScale(1.05);
            setScrollOpacity(1);
          } else if (ratio > 0.3) {
            setIsVisible(false);
            setScrollScale(0.95);
            setScrollOpacity(0.7);
          } else {
            setIsVisible(false);
            setScrollScale(0.85);
            setScrollOpacity(0.4);
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'movie': return <Film size={18} />;
      case 'season': return <Tv size={18} />;
      case 'episode': return <Play size={18} fill="currentColor" />;
      case 'volume': return <Book size={18} />;
      case 'saga': return <Zap size={18} />;
      case 'special': return <Star size={18} />;
      case 'spin-off': return <AlertCircle size={18} />;
      case 'novel': return <BookOpen size={18} />;
      default: return <Circle size={18} />;
    }
  };

  const getThemeMap = (theme) => {
      // Returns a set of colors for a specific theme
      const maps = {
          'blue':   { border: 'border-blue-500',   shadow: 'shadow-blue-500/50',   bg: 'bg-blue-500',   badge: 'bg-blue-500 border-blue-400',   text: 'text-blue-400' },
          'red':    { border: 'border-red-600',    shadow: 'shadow-red-600/50',    bg: 'bg-red-600',    badge: 'bg-red-600 border-red-400',    text: 'text-red-500' },
          'emerald':{ border: 'border-emerald-500',shadow: 'shadow-emerald-500/50',bg: 'bg-emerald-500',badge: 'bg-emerald-500 border-emerald-400', text: 'text-emerald-400' },
          'purple': { border: 'border-purple-500', shadow: 'shadow-purple-500/50', bg: 'bg-purple-500', badge: 'bg-purple-600 border-purple-400', text: 'text-purple-400' },
          'zinc':   { border: 'border-slate-500',  shadow: 'shadow-slate-500/50',  bg: 'bg-slate-500',  badge: 'bg-slate-600 border-slate-400',   text: 'text-slate-400' },
          'orange': { border: 'border-orange-500', shadow: 'shadow-orange-500/50', bg: 'bg-orange-500', badge: 'bg-orange-500 border-orange-300', text: 'text-orange-400' },
        'pink': { border: 'border-pink-500', shadow: 'shadow-pink-500/50', bg: 'bg-pink-500', badge: 'bg-pink-500 border-pink-300', text: 'text-pink-400' },
          'lime':   { border: 'border-lime-500',   shadow: 'shadow-lime-500/50',   bg: 'bg-lime-500',   badge: 'bg-lime-500 border-lime-300',   text: 'text-lime-400' },
          'yellow': { border: 'border-yellow-400', shadow: 'shadow-yellow-400/50', bg: 'bg-yellow-400', badge: 'bg-yellow-500 border-yellow-300', text: 'text-yellow-400' },
      };
      return maps[theme] || null;
  };

  // Determine active colors: Use Item Theme if exists, otherwise fall back to Parent Props
  const itemThemeColors = item.theme ? getThemeMap(item.theme) : null;
  
  const activeBorderColor = itemThemeColors ? itemThemeColors.border : borderColor;
  const activeShadowColor = itemThemeColors ? itemThemeColors.shadow : shadowColor; // FIXES THE GLOW
  const activeBgColor     = itemThemeColors ? itemThemeColors.bg : themeColor;     // FIXES THE BOTTOM BAR
  const activeTextColor   = itemThemeColors ? itemThemeColors.text : textColor;

  // Function to determine badge style, allowing overrides from item.theme
  const getBadgeColor = (type, themeOverride) => {
    // Maps defined themes to Tailwind classes
    const themeMap = {
      'blue': 'bg-blue-500 text-white border-blue-400',
      'red': 'bg-red-600 text-white border-red-400',
      'emerald': 'bg-emerald-500 text-white border-emerald-400',
      'purple': 'bg-purple-600 text-white border-purple-400',
      'zinc': 'bg-slate-600 text-white border-slate-400',
      'orange': 'bg-orange-500 text-white border-orange-300',
      'yellow': 'bg-yellow-500 text-black border-yellow-300',
      'pink': 'bg-pink-500 text-white border-pink-400',
      'lime': 'bg-lime-500 text-white border-lime-400'
    };

    if (themeOverride && themeMap[themeOverride]) {
        return themeMap[themeOverride];
    }

    switch(type) {
      case 'movie': return 'bg-lime-600 text-white border-lime-400';
      case 'season': return 'bg-blue-600 text-white border-blue-400';
      case 'episode': return 'bg-yellow-500 text-black border-yellow-300';
      case 'volume': return 'bg-slate-700 text-white border-slate-500';
      case 'saga': return 'bg-yellow-500 text-black border-yellow-300';
      case 'special': return 'bg-pink-600 text-white border-pink-400';
      case 'spin-off': return 'bg-orange-600 text-white border-orange-400';
      case 'novel': return 'bg-pink-600 text-white border-pink-400';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTextColor = (theme) => {
      const map = {
          'blue': 'text-blue-400',
          'red': 'text-red-500',
          'emerald': 'text-emerald-400',
          'purple': 'text-purple-400',
          'zinc': 'text-slate-400',
          'orange': 'text-orange-400',
          'yellow': 'text-yellow-400',
      };
      return map[theme] || textColor;
  }

  // New function to determine border color based on theme
  const getThemeBorderColor = (theme) => {
      const map = {
          'blue': 'border-blue-500',
          'red': 'border-red-600',
          'emerald': 'border-emerald-500',
          'purple': 'border-purple-500',
          'zinc': 'border-slate-500',
          'orange': 'border-orange-500',
          'yellow': 'border-yellow-400',
      };
      return map[theme] || borderColor;
  }

  const currentScale = isHovered ? 1.15 : scrollScale;
  const currentOpacity = isHovered ? 1 : scrollOpacity;
  const currentZIndex = isHovered ? 50 : (isVisible ? 10 : 0);

  
  // Use item.theme to override border color if available
  // const activeBorderColor = item.theme ? getThemeBorderColor(item.theme) : borderColor;

  // const activeStyle = (isVisible || isHovered)
  //   ? `border-4 ${activeBorderColor} ${shadowColor} shadow-[0_0_50px_-10px_rgba(0,0,0,0.3)] bg-slate-900`
  //   : 'border border-white/10 bg-slate-900/50 grayscale-[0.5]';
  
  const activeStyle = (isVisible || isHovered)
    // NOW USING activeShadowColor INSTEAD OF PROP shadowColor
    ? `border-4 ${activeBorderColor} ${activeShadowColor} shadow-[0_0_50px_-10px_rgba(0,0,0,0.3)] bg-slate-900`
    : 'border border-white/10 bg-slate-900/50 grayscale-[0.5]';

  const isPlayable = item.type === 'episode' || item.type === 'movie' || item.type === 'special';
  const cursorClass = isPlayable ? 'cursor-pointer' : 'cursor-default';

  // Use custom text color if theme is present on episode, otherwise fallback to prop
  const displayTextColor = item.theme ? getTextColor(item.theme) : textColor;

  return (
    <div 
      ref={cardRef}
      onClick={() => isPlayable && onClick && onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative transition-all duration-300 ease-out flex items-center justify-center my-4 ${cursorClass}`}
      style={{
        transform: `scale(${currentScale})`,
        opacity: currentOpacity,
        zIndex: currentZIndex
      }}
    >
      <div 
        className={`w-full p-6 rounded-3xl relative overflow-hidden group ${activeStyle} transition-colors duration-300`}
      >
        {(isVisible || isHovered) && (
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-white to-transparent" style={{ backgroundSize: '4px 4px' }}></div>
        )}
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <div className={`text-4xl font-black italic opacity-20 ${displayTextColor} absolute -top-2 -right-2 select-none`}>
            #{String(index + 1).padStart(3, '0')}
          </div>

          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-2 ${getBadgeColor(item.type, item.theme)} transition-transform duration-500 ${(isVisible || isHovered) ? 'rotate-[-10deg] scale-110' : 'rotate-0'}`}>
            {getIcon(item.type)}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-[10px] uppercase font-bold tracking-wider py-0.5 px-2 rounded border ${getBadgeColor(item.type, item.theme)}`}>
                {item.type === 'episode' ? item.season : item.type}
              </span>
              
              {isPlayable && isHovered && (
                <span className="text-[10px] uppercase font-bold tracking-wider py-0.5 px-2 rounded bg-white text-black animate-pulse">
                  Click to Watch
                </span>
              )}

              {item.note && (
                <span className="text-[10px] uppercase font-bold tracking-wider py-0.5 px-2 rounded border border-yellow-500/50 text-yellow-500 animate-pulse">
                  Note
                </span>
              )}
            </div>

            <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-1 ${(isVisible || isHovered) ? 'text-white' : 'text-slate-300'}`}>
              {item.title}
            </h3>
            
            {item.type === 'episode' ? (
                <p className={`font-medium ${(isVisible || isHovered) ? displayTextColor : 'text-slate-500'}`}>
                   Episode {item.episodeNumber}
                </p>
            ) : (
                <p className={`font-medium ${(isVisible || isHovered) ? textColor : 'text-slate-500'}`}>
                    {item.detail}
                </p>
            )}
            
            {item.sub && (
              <p className="text-sm text-slate-400 mt-1 font-mono">
                {item.sub}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Shimmer Bar - NOW USES activeBgColor */}
        {(isVisible || isHovered) && (
          <div className={`absolute bottom-0 left-0 h-1 w-full ${activeBgColor} animate-[shimmer_2s_infinite]`}></div>
        )}
      </div>
    </div>
  );
};

// 

const LibraryPage = ({ onNavigate }) => {
    const [selectedBook, setSelectedBook] = useState(null);

    return (
        // Root container: No scroll here, just takes up full space
        <div className="h-full w-full relative bg-slate-900">
            
            {/* 1. SCROLLABLE AREA: Independent container for the books */}
            <div className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar px-6 py-24 perspective-container">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 animate-[slideDown_0.5s_ease-out]">
                        <h2 className="text-pink-400 font-black tracking-widest uppercase text-lg mb-2">My Hero Academia</h2>
                        <h1 className="text-5xl font-black uppercase italic text-white" style={{ textShadow: '4px 4px 0px #be185d' }}>
                            Complete Literary Archive
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-32"> {/* Added pb-32 so content isn't hidden behind button */}
                        {libraryData.map((book) => (
                            <div 
                                key={book.id}
                                onClick={() => setSelectedBook(book)}
                                className="group relative cursor-pointer"
                            >
                                <div className="aspect-[2/3] w-full rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-pink-500 group-hover:shadow-pink-500/50 relative bg-slate-800">
                                    <img 
                                        src={book.image} 
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-white font-bold text-sm uppercase tracking-wider">View File</span>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-center font-bold text-slate-300 group-hover:text-pink-400 transition-colors uppercase text-sm">{book.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. FLOATING UI: Button stays pinned to bottom, outside scroll area */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
                <button 
                    onClick={() => onNavigate('home')} 
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 border border-white/20 hover:bg-slate-700 transition-colors shadow-lg pointer-events-auto"
                >
                    <HomeIcon size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Return Home</span>
                </button>
            </div>

            {/* 3. MODAL: Fixed overlay independent of scroll position */}
            {selectedBook && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-slate-900 border border-pink-500/50 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row">
                        <button 
                            onClick={() => setSelectedBook(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-pink-600 rounded-full text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Side */}
                        <div className="w-full md:w-2/5 h-64 md:h-auto bg-slate-800 relative shrink-0">
                            <img 
                                src={selectedBook.image} 
                                alt={selectedBook.title}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Info Side (Inner Scroll) */}
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 rounded bg-pink-600/20 border border-pink-500 text-pink-400 text-xs font-bold uppercase tracking-widest mb-2">
                                    {selectedBook.category}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white leading-tight mb-4">
                                    {selectedBook.title}
                                </h2>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6 font-mono">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-pink-500" />
                                        <span>{selectedBook.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-pink-500" />
                                        <span>{selectedBook.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} className="text-pink-500" />
                                        <span>{selectedBook.language}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-pink max-w-none">
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                    {selectedBook.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [view, setView] = useState('home'); // home, anime, manga, library, watch
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef(null);

  const toggleView = (newView) => {
    setView(newView);
    setTimeout(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, 10);
  };

  const handleEpisodeClick = (item) => {
      setCurrentEpisode(item);
      setView('watch');
  };

  const handleEpisodeNavigate = (direction) => {
      if (!currentEpisode) return;
      
      const currentIndex = animeData.indexOf(currentEpisode);
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      
      // Find next/prev item that is actually an episode/movie/special
      // Simple check for bounds first
      if (nextIndex >= 0 && nextIndex < animeData.length) {
          setCurrentEpisode(animeData[nextIndex]);
      }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowScrollTop(scrollContainerRef.current.scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render Logic
  const renderContent = () => {
      if (view === 'home') return <HomePage onNavigate={toggleView} />;
      if (view === 'library') return <LibraryPage onNavigate={toggleView} />;
      if (view === 'watch') return <WatchPage episode={currentEpisode} onBack={() => toggleView('anime')} onNavigate={handleEpisodeNavigate} />;
      
      // Timeline Views
      const data = view === 'anime' ? animeData : mangaData;
      const themeColor = view === 'anime' ? 'bg-yellow-400' : 'bg-emerald-500';
      const textColor = view === 'anime' ? 'text-yellow-400' : 'text-emerald-500';
      const borderColor = view === 'anime' ? 'border-yellow-400' : 'border-emerald-500';
      const shadowColor = view === 'anime' ? 'shadow-yellow-400/50' : 'shadow-emerald-500/50';

      return (
        <div className="max-w-2xl mx-auto py-24 px-4 space-y-4">
          {data.map((item, index) => (
            <TimelineCard 
              key={index} 
              item={item} 
              index={index} 
              themeColor={themeColor}
              borderColor={borderColor}
              textColor={textColor}
              shadowColor={shadowColor}
              onClick={handleEpisodeClick}
            />
          ))}
          
          <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-4 opacity-50">
            <p className="text-sm font-bold uppercase tracking-widest">End of Timeline</p>
            <button onClick={() => toggleView('home')} className="text-xs border border-slate-600 px-4 py-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors">
                Back to Home
            </button>
          </div>
        </div>
      );
  };

  return (
    <div className="h-screen w-full bg-slate-900 overflow-hidden font-sans text-white selection:bg-red-600 selection:text-white relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>
      
      {/* Dynamic Backgrounds based on View */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none transition-all duration-700 
        ${view === 'anime' ? 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-500 via-slate-900 to-yellow-500' : 
          view === 'manga' ? 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-emerald-500' :
          view === 'library' ? 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-pink-500 via-slate-900 to-pink-500' :
          view === 'watch' ? 'bg-black' :
          'bg-slate-900'
        }`}>
      </div>

      {/* Header (Only show on non-home/non-watch pages) */}
      {view !== 'home' && view !== 'watch' && (
          <header className="relative z-20 flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-4 md:mb-0 cursor-pointer group" onClick={() => toggleView('home')}>
              <div className={`p-2 rounded-full ${view === 'anime' ? 'bg-yellow-400' : view === 'manga' ? 'bg-emerald-500' : 'bg-pink-500'} text-slate-900 font-black text-xl group-hover:scale-110 transition-transform`}>
                UA
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white" style={{ textShadow: '2px 2px 0px #e11d48' }}>
                  My Hero <span className={view === 'anime' ? 'text-yellow-400' : view === 'manga' ? 'text-emerald-500' : 'text-pink-500'}>
                      {view === 'library' ? 'Archive' : 'Timeline'}
                  </span>
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold group-hover:text-white transition-colors">Return Home</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={() => toggleView('home')} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-white/10" title="Go Home">
                    <HomeIcon size={20} />
                </button>

                <div className="flex p-1 bg-slate-800 rounded-full border border-white/10 shadow-inner">
                    <button onClick={() => toggleView('anime')} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${view === 'anime' ? 'bg-yellow-400 text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <Tv size={14} /> <span className="hidden md:inline">Anime</span>
                    </button>
                    <button onClick={() => toggleView('manga')} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${view === 'manga' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <BookOpen size={14} /> <span className="hidden md:inline">Manga</span>
                    </button>
                    <button onClick={() => toggleView('library')} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${view === 'library' ? 'bg-pink-500 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <Library size={14} /> <span className="hidden md:inline">Archive</span>
                    </button>
                </div>
            </div>
          </header>
      )}

      {/* Main Content Area */}
      {/* <main 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative z-10 h-[calc(100vh-80px)] overflow-y-auto scroll-smooth hide-scrollbar perspective-container"
      >
          {renderContent()}
      </main> */}
      {/* Main Content Area */}
<main 
    ref={scrollContainerRef}
    onScroll={handleScroll}
    // CONDITIONAL CLASS: If view is library, hidden overflow. If anime/manga, normal scrolling.
    className={`relative z-10 h-[calc(100vh-80px)] ${view === 'library' ? 'overflow-hidden' : 'overflow-y-auto scroll-smooth perspective-container'} hide-scrollbar`}
>
    {renderContent()}
</main>

      {/* Scroll to Top (Hidden on Home/Watch) */}
      {view !== 'home' && view !== 'watch' && (
        <button 
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-30 p-4 rounded-full bg-red-600 text-white shadow-lg transition-all duration-500 hover:bg-red-500 hover:scale-110 active:scale-95 border-4 border-white ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
            <ArrowUp size={24} strokeWidth={3} />
        </button>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default App;