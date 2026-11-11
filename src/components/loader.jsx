
export default function Loader() {
    return (
        <div className="w-full h-full min-h-screen bg-[url(/Login-bg.jpg)] bg-cover bg-center flex justify-center items-center relative">

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Loader Card */}
            <div className="relative w-[300px] h-[250px] bg-red-950/30 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.15)] flex flex-col justify-center items-center">

                {/* Spinner */}
                <div className="w-[65px] h-[65px] border-[4px] border-red-300/20 border-t-red-600 rounded-full animate-spin shadow-[0_0_20px_rgba(220,38,38,0.3)]"></div>

                {/* Loading Text */}
                <h2 className="text-white text-lg font-bold mt-7 tracking-widest">
                    LOADING
                </h2>

                <p className="text-red-300 text-xs mt-2">
                    Please wait a moment...
                </p>

            </div>

        </div>
    );
}
