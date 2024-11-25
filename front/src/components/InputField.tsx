interface InputFieldProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
  }
  
  const InputField: React.FC<InputFieldProps> = ({
    name,
    placeholder,
    value,
    onChange,
    type = 'text',
  }) => {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full"
      />
    );
  };
  
  export default InputField;
  