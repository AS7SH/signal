import signal from "@/assets/signal.png";
import { Empty, EmptyContent, EmptyHeader } from "../ui/empty";

const MainEmptyPanel = () => {
    return (
        <Empty>
            <EmptyHeader>
                <img
                    src={signal}
                    alt="Signal Logo"
                    className="h-24 w-24 object-contain opacity-80"
                />
            </EmptyHeader>

            <EmptyContent>
                <h2 className="text-2xl font-light text-primary">
                    Signal for Desktop
                </h2>
                <p className="text-sm text-secondary">
                    Send and receive messages without keeping your phone online.{" "}
                    <br />
                    Use Signal on up to 4 linked devices and 1 phone at the same
                    time.
                </p>

                {/* Optional: A little end-to-end encryption badge */}
                <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <span>End-to-end encrypted</span>
                </div>
            </EmptyContent>
        </Empty>
    );
};

export default MainEmptyPanel;
