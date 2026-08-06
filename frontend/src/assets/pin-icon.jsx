const PinIcon = ({ className }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            height="20"
            width="20"
            preserveAspectRatio="xMidYMid meet"
            className={className}
            fill="currentColor"
        >
            <title>ic-push-pin</title>
            <path
                fill="currentColor"
                d="M16 5v7l1.7 1.7a1 1 0 0 1 .3.73V15c0 .28-.1.52-.29.71A.94.94 0 0 1 17 16h-4v5.85c0 .28-.1.52-.29.71a.94.94 0 0 1-.71.29.97.97 0 0 1-.71-.29.97.97 0 0 1-.29-.71V16H7a.97.97 0 0 1-.71-.29A.97.97 0 0 1 6 15v-.57a1.03 1.03 0 0 1 .3-.73L8 12V5a.97.97 0 0 1-.71-.29A.97.97 0 0 1 7 4c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h8c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 16 5Zm-7.15 9h6.3L14 12.85V5h-4v7.85L8.85 14Z"
            ></path>
        </svg>
    );
};

export default PinIcon;
