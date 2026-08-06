const PlusIcon = ({ className }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            className={className}
            fill="none"
        >
            <title>plus-rounded</title>
            <path
                fill="currentColor"
                d="M11 13H5.5a1 1 0 1 1 0-2H11V5.5a1 1 0 1 1 2 0V11h5.5a1 1 0 1 1 0 2H13v5.5a1 1 0 1 1-2 0V13Z"
            ></path>
        </svg>
    );
};

export default PlusIcon;
