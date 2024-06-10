
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
}

export const Checkbox = ({ checked, onChange, name } : CheckboxProps) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden peer"
      />
      <div className="w-5 h-5 border border-gray-500 rounded-full flex justify-center items-center">
        <div className={`w-2 h-2 inline-block border rounded-full border-none ${checked ? 'bg-customGreen rounded-full' : ''}`}></div>
      </div>
      <span className="ml-2 text-gray-700">{name}</span>
    </label>
  );
}