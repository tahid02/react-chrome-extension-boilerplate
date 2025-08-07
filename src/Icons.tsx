import React from "react";
export const loadingSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "48px" }}
    viewBox="0 0 200 200"
  >
    <radialGradient
      id="a11"
      cx=".66"
      fx=".66"
      cy=".3125"
      fy=".3125"
      gradientTransform="scale(1.5)"
    >
      <stop offset="0" stopColor="#000000"></stop>
      <stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop>
      <stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop>
      <stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop>
      <stop offset="1" stopColor="#000000" stopOpacity="0"></stop>
    </radialGradient>
    <circle
      transform-origin="center"
      fill="none"
      stroke="url(#a11)"
      strokeWidth="17"
      strokeLinecap="round"
      strokeDasharray="200 1000"
      strokeDashoffset="0"
      cx="100"
      cy="100"
      r="70"
    >
      <animateTransform
        type="rotate"
        attributeName="transform"
        calcMode="spline"
        dur=".5"
        values="360;0"
        keyTimes="0;1"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      ></animateTransform>
    </circle>
    <circle
      transform-origin="center"
      fill="none"
      opacity=".2"
      stroke="#000000"
      strokeWidth="17"
      strokeLinecap="round"
      cx="100"
      cy="100"
      r="70"
    ></circle>
  </svg>
);
export const removeIcon = (
  <svg
    className="w-6 h-6 text-[#374151] dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
    />
  </svg>
);

export const renameIcon = (
  <svg
    className="w-6 h-6 text-[#374151] dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
    />
  </svg>
);

export const swithAccount = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.98em"
    height="1em"
    viewBox="0 0 256 262"
  >
    <path
      fill="#4285f4"
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
    />
    <path
      fill="#34a853"
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
    />
    <path
      fill="#fbbc05"
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
    />
    <path
      fill="#eb4335"
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
    />
  </svg>
);
export const GoogleSignInIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.98em"
    height="1em"
    viewBox="0 0 256 262"
  >
    <path
      fill="#4285f4"
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
    />
    <path
      fill="#34a853"
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
    />
    <path
      fill="#fbbc05"
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
    />
    <path
      fill="#eb4335"
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
    />
  </svg>
);
export const threeDotIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-three-dots-vertical"
    viewBox="0 0 16 16"
  >
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
  </svg>
);
export const starIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ width: "24px" }}
  >
    <path
      fill="gray"
      d="m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333z"
    />
  </svg>
);

export const copyIcon = (
  <svg
    style={{ width: "24px" }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="gray"
      d="M21 10v10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1zM6 14H5V5h9v1a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2z"
    />
  </svg>
);

export const shareableLinkIcon = (
  <svg
    style={{ width: "24px" }}
    version="1.1"
    id="SEO"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    viewBox="0 0 128 128"
  >
    <g id="row1">
      <path
        fill="gray"
        id="icon:4"
        d="M81 57.4c-1.6-4.1-4.1-7.7-7.3-10.5l-.1-.1c-7.3-6.5-18-8.7-27.8-4.9L17.3 53C3.4 58.5-3.6 74.2 1.8 88.2c2.6 6.7 7.7 12.1 14.4 15 3.5 1.5 7.2 2.3 11 2.3 3.3 0 6.6-.6 9.8-1.9l26.9-10.5c-3.8-1-7.4-2.6-10.7-4.9l-19.3 7.5c-4.6 1.8-9.7 1.7-14.3-.3-4.6-2-8.1-5.7-9.9-10.3-3.7-9.6 1-20.5 10.7-24.2L49 49.8c2.2-.9 4.5-1.3 6.7-1.3 2.6 0 5.1.5 7.6 1.6 4.6 2 8.1 5.7 9.9 10.3 1.6 4.1 1.7 8.5.3 12.7 1.1-.1 2.3-.4 3.3-.8l5.9-2.3c.5-4.1-.1-8.4-1.7-12.6zm-6.7 29.8c-3.7 0-7.4-.8-11-2.3-6.7-2.9-11.8-8.2-14.4-15-1.3-3.4-1.9-7-1.8-10.6l8.4.3c-.1 2.5.3 4.9 1.3 7.3 1.8 4.6 5.3 8.3 9.9 10.3 4.6 2 9.7 2.1 14.3.3l26.6-10.3c4.6-1.8 8.3-5.3 10.3-9.9 2-4.6 2.1-9.7.3-14.3-3.7-9.6-14.6-14.4-24.2-10.7l-20.7 8.1-3.1-7.9L91 24.4c13.9-5.4 29.7 1.5 35.1 15.5 2.6 6.7 2.4 14.1-.5 20.8-2.9 6.7-8.2 11.8-15 14.4L84.1 85.3c-3.2 1.2-6.5 1.9-9.8 1.9z"
      />
    </g>
  </svg>
);

export const locateIcon = (
  <svg
    id="Search_24"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="24" height="24" stroke="none" fill="#000000" opacity="0" />
    <g transform="matrix(0.83 0 0 0.83 12 12)">
      <path
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "gray",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="translate(-15.01, -15.01)"
        d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 C 25.54378557313715 26.968271794792877 25.916235992218144 27.07350663500295 26.26667805152247 26.982149810984033 C 26.617120110826793 26.89079298696512 26.89079298696512 26.617120110826793 26.982149810984033 26.26667805152247 C 27.07350663500295 25.916235992218144 26.968271794792877 25.54378557313715 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
