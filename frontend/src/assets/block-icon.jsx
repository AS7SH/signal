const BlockIcon = ({ className }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            height="18"
            width="18"
            preserveAspectRatio="xMidYMid meet"
            className={className}
            fill="currentColor"
        >
            <title>ic-block</title>
            <path
                fill="currentColor"
                d="M12 22a10.1 10.1 0 0 1-9.21-6.1A9.74 9.74 0 0 1 2 12a10.1 10.1 0 0 1 6.1-9.21A9.74 9.74 0 0 1 12 2a10.1 10.1 0 0 1 9.21 6.1c.53 1.22.79 2.52.79 3.9s-.26 2.68-.79 3.9a10.1 10.1 0 0 1-5.31 5.31A9.74 9.74 0 0 1 12 22Zm0-2a7.81 7.81 0 0 0 4.9-1.7L5.7 7.1A7.95 7.95 0 0 0 4 12c0 2.23.78 4.13 2.33 5.68A7.72 7.72 0 0 0 12 20Zm6.3-3.1A7.95 7.95 0 0 0 20 12a7.7 7.7 0 0 0-2.32-5.67A7.72 7.72 0 0 0 12 4a7.81 7.81 0 0 0-4.9 1.7l11.2 11.2Z"
            ></path>
        </svg>
    );
};

export default BlockIcon;
