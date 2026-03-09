const AddressSelect = ({ label, value, options, onChange, disabled }) => {
  return (
    <div className='form-control w-full'>
      <label className='label-text text-xs mb-1'>{label}</label>
      <select
        value={value?.name || ""}
        onChange={(e) => {
          const selected = options.find((opt) => opt.name === e.target.value);
          onChange(selected);
        }}
        disabled={disabled}
        className='select select-bordered w-full select-sm'>
        <option value=''>Select {label}</option>
        {options?.map((opt) => (
          <option key={opt.name} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelect;
