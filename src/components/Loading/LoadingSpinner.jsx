import React from 'react';

const LoadingSpinner = ({ text, size = "md", variant = "section", color = "text-sky-500" }) => {

    const variants = {
        full: "fixed inset-0 flex flex-col justify-center items-center z-50 bg-white/80",
        section: "flex flex-col justify-center items-center py-10 w-full",
        inline: "inline-flex items-center gap-2"
    };

    const sizes = {
        xs: "loading-xs",
        sm: "loading-sm",
        md: "loading-md",
        lg: "loading-lg"
    };

    return (
        <div className={`${variants[variant]} ${color}`}>
            <span className={`loading loading-spinner ${sizes[size]}`}></span>
            {text && <p className={variant === 'inline' ? 'text-sm' : 'mt-2'}>{text}</p>}
        </div>
    );
};

export default LoadingSpinner;