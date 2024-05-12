import React, { useEffect, useRef, useState } from "react";

export default function Dropdown({ data, placeholder, id, updateFilters, singleSelect = false }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(()=>{
    setDropdownData(data
        .filter(
          (d) =>
            d?.name?.toString()?.toLowerCase().startsWith(inputValue?.toLowerCase()) &&
            !selectedItems.includes(d.name.toString().toLowerCase())
        ))
  },[selectedItems,inputValue])

  useEffect(()=>{
    updateFilters(selectedItems, id)
  },[JSON.stringify(selectedItems)])

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
      setInputValue("");
    }
  };
  const Badge = ({ item }) => (
    <div className="badge">
      <div
        className="badge-text"
        onClick={() => setShowDropdown(!showDropDown)}
      >
        {item.name}
      </div>
      <div className="badge-btn" onClick={() => removeItem(item.name)}>
        X
      </div>
    </div>
  );

  const removeAllSelect = () => {
    setSelectedItems([]);
  };

  const removeItem = (name) => {
    setSelectedItems(selectedItems.filter((item) => item !== name.toString().toLowerCase()));
  };

  const dropdownSelect = (name) => {
    setSelectedItems(!singleSelect ? [...selectedItems, name] : [name]);
    setInputValue("");
    setShowDropdown(false);
  };

  return (
    <div ref={dropdownRef}>
        {selectedItems.length ? <div className="dropdown-heading">{placeholder}</div> : null}
        <div className="position-relative">
      <div className="dropdown-header">
        <div className="badges-container">
          {data.map((item, ind) =>
            selectedItems.includes(item?.name?.toString().toLowerCase()) ? <Badge item={item} /> : null
          )}
          <div className="input-style">
            <input
              type="text"
              placeholder={selectedItems.length === 0 ? placeholder : ""}
              value={inputValue}
              onClick={()=>setShowDropdown(true)}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowDropdown(true);
              }}
            />
          </div>
        </div>
        <div className="is-flex">
          <div className="dropdown-btn" onClick={removeAllSelect}>
            X
          </div>
          <div className="vertical-divider"></div>
          <div
            className="dropdown-btn"
            onClick={() => setShowDropdown(!showDropDown)}
          >
            V
          </div>
        </div>
      </div>
      {showDropDown ? (
        <div className="dropdown-body">
          {
            dropdownData.length ? dropdownData.map((d, index) => (
              <div
                className="dropdown-item"
                onClick={() => dropdownSelect(d.name.toString().toLowerCase())}
              >
                {d.name}
              </div>
            )) : 'No items found'}
        </div>
      ) : null}
    </div></div>
  );
}
