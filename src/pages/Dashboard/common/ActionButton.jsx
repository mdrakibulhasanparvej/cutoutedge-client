import React from 'react';

const ActionButton = ({ onClick, icon: Icon, text, variant = 'primary', className = '', fullWidth = true, disabled = false, iconPosition = 'left' }) => {

    const baseClasses = 'flex flex-1 items-center justify-center px-3 py-1 gap-1.5 text-[13px] font-bold rounded-lg transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
    const widthClass = fullWidth ? 'w-full' : '';

    const variantStyles = {
        primary: 'bg-[#0F83B2] hover:bg-[#0c6b93] text-white',
        success: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        reject: 'bg-red-500 hover:bg-red-600 text-white',
        warning: 'bg-amber-500 hover:bg-amber-600 text-white',
        default: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200',
    };

    const styleClass = variantStyles[variant] || variantStyles.primary;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${widthClass} ${styleClass} ${className}`}
        >
            {Icon && iconPosition === 'left' && <Icon size={16} />}
            <span>{text}</span>
            {Icon && iconPosition === 'right' && <Icon size={16} />}
        </button>
    );
};

export default ActionButton;