function Button({
    children,
    variant = 'primary',
    type = 'button',
    onClick,
    disabled = false,
    className=''
}) {
    const baseStyles =
        'rounded-lg px-4 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50'

    const variants = {
        primary:
            'bg-indigo-600 text-white hover:bg-indigo-500',

        danger:
            'bg-red-600 text-white hover:bg-red-500',

        secondary:
            'border border-gray-700 text-gray-200 hover:bg-gray-800',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button