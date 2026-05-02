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
    // ... rest of ensemble pricing zones
};

export const ensembleMusicians = {
    "String Solo": 1,
    "Piano Solo": 1,
    "String Duo": 2,
    "Violin & Piano Duo": 2,
    "String Trio": 3,
    "String Quartet": 4,
};