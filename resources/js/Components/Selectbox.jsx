export default function Selectbox({
    className = "",
    options = [],
    currentValue = "",
    ...props
}) {
    return (
        <select
            defaultValue={currentValue}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
            {...props}
            
        >
         
            
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
