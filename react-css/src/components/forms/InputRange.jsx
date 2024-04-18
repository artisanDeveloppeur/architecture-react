export function InputRange({ label, priceRange, handlePriceChange }) {
  return (
    <div>
      <label htmlFor='priceRange'>{label}</label>
      <input
        type="range"
        className='form-range'
        min={0}
        max={10}
        defaultValue={`${priceRange[0]}`}
        onChange={handlePriceChange}
      />
    </div>
  )
}

//        defaultValue={`${priceRange[0]},${priceRange[1]}`}
