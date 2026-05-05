/**
 * pricing.js - All pricing data for the calculator
 *
 * Centralized location for all pricing information.
 * This makes it easy to update prices without touching component logic.
 */

export const ensemblePricing = {
    "String Solo":        { "1 hr": 850,  "1.5 hr": 1105, "2 hr": 1360, "2.5 hr": 1615, "3 hr": 1870 },
    "Piano Solo":         { "1 hr": 900,  "1.5 hr": 1170, "2 hr": 1440, "2.5 hr": 1710, "3 hr": 1980 },
    "String Duo":         { "1 hr": 1150, "1.5 hr": 1495, "2 hr": 1840, "2.5 hr": 2185, "3 hr": 2530 },
    "Violin & Piano Duo": { "1 hr": 1200, "1.5 hr": 1560, "2 hr": 1920, "2.5 hr": 2280, "3 hr": 2640 },
    "String Trio":        { "1 hr": 1300, "1.5 hr": 1690, "2 hr": 2080, "2.5 hr": 2470, "3 hr": 2860 },
    "String Quartet":     { "1 hr": 1500, "1.5 hr": 1950, "2 hr": 2400, "2.5 hr": 2850, "3 hr": 3300 },
};

export const zonePricing = {
    "String Solo": {
        "Vancouver": 0, "Burnaby": 50, "Richmond": 50, "North Vancouver": 60,
        "West Vancouver": 60, "New Westminster": 70, "Coquitlam": 70,
        "Port Coquitlam": 70, "Port Moody": 70, "Surrey": 100, "Delta": 100,
        "Ladner": 100, "Tsawwassen": 100, "Langley": 150, "Maple Ridge": 200,
        "Pitt Meadows": 200, "Abbotsford": 200, "Mission": 250, "Chilliwack": 300,
        "Squamish": 400, "Whistler": 600,
    },
    "Piano Solo": {
        "Vancouver": 0, "Burnaby": 60, "Richmond": 60, "North Vancouver": 70,
        "West Vancouver": 70, "New Westminster": 80, "Coquitlam": 80,
        "Port Coquitlam": 80, "Port Moody": 80, "Surrey": 110, "Delta": 110,
        "Ladner": 110, "Tsawwassen": 110, "Langley": 160, "Maple Ridge": 210,
        "Pitt Meadows": 210, "Abbotsford": 210, "Mission": 260, "Chilliwack": 310,
        "Squamish": 410, "Whistler": 610,
    },
    "String Duo": {
        "Vancouver": 0, "Burnaby": 80, "Richmond": 80, "North Vancouver": 100,
        "West Vancouver": 100, "New Westminster": 120, "Coquitlam": 120,
        "Port Coquitlam": 120, "Port Moody": 120, "Surrey": 150, "Delta": 150,
        "Ladner": 150, "Tsawwassen": 150, "Langley": 200, "Maple Ridge": 280,
        "Pitt Meadows": 280, "Abbotsford": 280, "Mission": 330, "Chilliwack": 400,
        "Squamish": 520, "Whistler": 800,
    },
    "Violin & Piano Duo": {
        "Vancouver": 0, "Burnaby": 90, "Richmond": 90, "North Vancouver": 110,
        "West Vancouver": 110, "New Westminster": 130, "Coquitlam": 130,
        "Port Coquitlam": 130, "Port Moody": 130, "Surrey": 170, "Delta": 170,
        "Ladner": 170, "Tsawwassen": 170, "Langley": 220, "Maple Ridge": 300,
        "Pitt Meadows": 300, "Abbotsford": 300, "Mission": 360, "Chilliwack": 430,
        "Squamish": 560, "Whistler": 850,
    },
    "String Trio": {
        "Vancouver": 0, "Burnaby": 110, "Richmond": 110, "North Vancouver": 130,
        "West Vancouver": 130, "New Westminster": 160, "Coquitlam": 160,
        "Port Coquitlam": 160, "Port Moody": 160, "Surrey": 200, "Delta": 200,
        "Ladner": 200, "Tsawwassen": 200, "Langley": 260, "Maple Ridge": 340,
        "Pitt Meadows": 340, "Abbotsford": 340, "Mission": 410, "Chilliwack": 490,
        "Squamish": 640, "Whistler": 980,
    },
    "String Quartet": {
        "Vancouver": 0, "Burnaby": 140, "Richmond": 140, "North Vancouver": 170,
        "West Vancouver": 170, "New Westminster": 200, "Coquitlam": 200,
        "Port Coquitlam": 200, "Port Moody": 200, "Surrey": 260, "Delta": 260,
        "Ladner": 260, "Tsawwassen": 260, "Langley": 340, "Maple Ridge": 440,
        "Pitt Meadows": 440, "Abbotsford": 440, "Mission": 530, "Chilliwack": 640,
        "Squamish": 840, "Whistler": 1280,
    },
};

export const ensembleMusicians = {
    "String Solo": 1,
    "Piano Solo": 1,
    "String Duo": 2,
    "Violin & Piano Duo": 2,
    "String Trio": 3,
    "String Quartet": 4,
};