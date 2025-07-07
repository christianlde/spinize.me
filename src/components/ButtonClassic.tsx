interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    className?: string; // Optional additional classes
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'; // Optional prop for button size
    children?: React.ReactNode;
    onClick?: () => void; // Optional onClick handler
    disabled?: boolean;
}

const sizeClasses = {
    xsmall: 'h-4 md:h-6 text-xs md:text-sm',
    small: 'h-6 md:h-8 text-sm md:text-base',
    medium: 'h-10 md:h-10 text-lg md:text-xl',
    large: 'h-10 md:h-12 text-2xl md:text-3xl',
    xlarge: 'h-16 md:h-18 text-4xl md:text-5xl',
    xxlarge: 'h-18 md:h-20 text-5xl md:text-6xl',
};

export default function ButtonClassic({ label, className, size = 'medium', children, onClick, disabled = false }: Props) {
    return <button
    className={`rounded-full w-fit hover:scale-105 transition-all duration-200 ${sizeClasses[size]} ${className} ${disabled && 'opacity-50'}`}
    onClick={onClick}
    disabled={disabled}>
        {label}
        {children}
    </button>
}
