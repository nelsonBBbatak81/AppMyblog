import React from "react";

function Spinner() {
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-75">
            <div className="w-full h-full flex justify-center items-center">
                <div
                    class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-green-600 rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Spinner;
