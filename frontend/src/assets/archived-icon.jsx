const ArchivedIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 11 L12 17.5" />
            <path d="M12 17.5 L9 14.5" />
            <path d="M15 14.5 L12 17.5" />
            <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
            <rect x="2" y="3" width="20" height="5" rx="1" />
        </svg>
    );
};

export default ArchivedIcon;
