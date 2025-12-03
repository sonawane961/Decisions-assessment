import React from "react";

const Icon = ({ iconName }) => {
  switch (iconName) {
    case "TrashIcon":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Delete</title>
          <path
            d="M3 6h18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="6"
            width="18"
            height="15"
            rx="2"
            ry="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 11v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "EditIcon":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.3 5.3l6.4 6.4M4 20l2.4-.5 8.8-8.8-2.4-2.4L4 17.6V20zM17.7 3.3a1.5 1.5 0 0 1 2.1 2.1l-1.8 1.8-2.4-2.4 2.1-1.5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return <p>Icon Not Found</p>;
  }
};

export default Icon;
