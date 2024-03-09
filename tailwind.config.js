/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];

export const theme = {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#F59FC3",
        10: "#FFF1F8",
        20: "#FFDEEF",
        30: "#FFCDE5",
        40: "#FFB2D3",
        50: "#FDA7CB",
        60: "#F59FC3",
        70: "#E685AE",
        80: "#CC6E99",
        90: "#B35985",
        100: "#994671",
      },
      secondary: {
        10: "#F7EFE9",
        20: "#E9D8CB",
        30: "#DAC1AD",
        40: "#B69478",
        50: "#A27D60",
        60: "#8C6749",
        70: "#865C3A",
        80: "#7D512D",
        90: "#744622",
        100: "#683C18",
      },
      tertiary: {
        10: "#FBFDEA",
        20: "#F4F8CB",
        30: "#EBF0B0",
        40: "#D3DA80",
        50: "#C3CB6B",
        60: "#B2BA59",
        70: "#A9B245",
        80: "#9FA834",
        90: "#929C25",
        100: "#838D18",
      },
      danger: {
        DEFAULT: "#BA1A1A",
        accent: "#FFEDEA",
      },
      warning: {
        DEFAULT: "#EEA604",
        accent: "#FFF7E4",
      },
      success: {
        DEFAULT: "#007A0D",
        accent: "#D6FFDA",
      },
      neutral: {
        10: "#FFFFFF",
        20: "#FDFCFF",
        30: "#F1F0F4",
        40: "#E3E2E6",
        50: "#909094",
        60: "#76777A",
        70: "#5D5E61",
        80: "#45474A",
        90: "#2F3033",
        100: "#1C1B1F",
      },
    },
    padding: {
      128: "32rem",
      140: "35rem",
      148: "37rem",
    },
    height: {
      128: "32rem",
      140: "35rem",
      148: "37rem",
      "9/10": "90%",
    },
    fontFamily: {
      reynaldo: ["var(--font-reynaldo)", "serif"],
    },
    keyframes: {
      cloud: {
        "0%, 100%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.05)" },
      },
      mascot: {
        "0%, 100%": { transform: "rotate(-5deg)" },
        "50%": { transform: "rotate(5deg)" },
      },
      title: {
        "0%, 100%": { transform: "rotate(-1deg)" },
        "50%": { transform: "rotate(1deg)" },
      },
      "overlay-show": {
        from: { opacity: "0" },
        to: { opacity: "0.5" },
      },
    },
    animation: {
      cloud: "cloud 10s ease-in-out infinite",
      mascot: "mascot 10s ease-in-out infinite",
      title: "title 5s ease-in-out infinite",
      "overlay-show": "overlay-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  backgroundImage: {
    "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  },
};
export const plugins = [];