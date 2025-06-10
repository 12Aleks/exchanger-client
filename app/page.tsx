import ExchangePage from "@/app/exchange/page";
import VideoBackground from "@/app/components/VideoBackground";


export default function Home() {
    return (
        <div
            className="flex items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="w-full flex flex-col row-start-2 items-center justify-center sm:items-start">
                <div className="min-h-screen min-w-full  bg-blue-800 flex items-center justify-center relative">

                    <VideoBackground />

                    <div className="w-full max-w-screen-xl px-4 md:px-10">
                        <div className="z-10 flex flex-col gap-8">
                            <h1 className="text-center text-2xl font-bold mb-4 text-white">Currency Exchange</h1>
                            <ExchangePage/>
                        </div>
                    </div>
                    <div
                        className="z-0 absolute bottom-0 h-[50%] w-full overflow-hidden before:absolute before:bottom-[-200px]
                             before:left-[-300px] before:right-[-300px] before:top-0 before:rounded-[100%] before:bg-gray-50">
                    </div>
                </div>
            </main>
        </div>
    );
}
