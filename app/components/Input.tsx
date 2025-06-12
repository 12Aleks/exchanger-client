import { forwardRef } from "react";
import Image from "next/image";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    iconSrc?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, iconSrc, ...props }, ref) => {
    return (
        <div className="w-full relative">
            <input
                ref={ref}
                {...props}
                className={`no-spinner p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100 ${iconSrc ? "pr-10" : ""}`}
            />
            {iconSrc && (
                <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <Image src={iconSrc} alt="Icon" width={30} height={30} />
                </div>
            )}
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
});
Input.displayName = "Input";