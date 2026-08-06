const MessageIcon = ({ className }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            className={className}
            fill="currentColor"
        >
            <title>wds-ic-chat</title>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 9 .94 5.53A1 1 0 0 1 1.79 4h17.54C20.81 4 22 5.2 22 6.67v10.66c0 1.48-1.2 2.67-2.67 2.67H5.67A2.67 2.67 0 0 1 3 17.33V9Zm2-.55L3.53 6h15.8c.37 0 .67.3.67.67v10.66c0 .37-.3.67-.67.67H5.67a.67.67 0 0 1-.67-.67V8.45Z"
                clipRule="evenodd"
            ></path>
            <path
                fill="currentColor"
                d="M7 10a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
            ></path>
        </svg>
    );
};

export default MessageIcon;
