const FormField = ({ 
  id, 
  name, 
  type, 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  icon,
  autoComplete,
  colorScheme = 'blue' 
}) => {
  const colorClasses = {
    blue: 'focus:ring-blue-500 focus:border-blue-500',
    green: 'focus:ring-green-500 focus:border-green-500'
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className={`pl-10 w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : `border-gray-300 ${colorClasses[colorScheme]} hover:border-gray-400`
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="flex items-center mt-2 text-sm text-red-600 animate-fade-in">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;