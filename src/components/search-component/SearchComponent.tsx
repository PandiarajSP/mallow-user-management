import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";

interface SearchProps<T> {
  data: T[];
  placeholder?: string;
  handler: (filteredData: T[]) => void;
  reset?: any;
}

const Search = <T extends Record<string, any>>({
  data,
  placeholder = "Search",
  handler,
  reset,
}: SearchProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      handler(data);
      return;
    }

    const lowerValue = value.toLowerCase();

    const filtered = data.filter((item) =>
      Object.values(item).some(
        (field) =>
          field !== null &&
          field !== undefined &&
          (typeof field === "string" || typeof field === "number") &&
          field.toString().toLowerCase().includes(lowerValue)
      )
    );

    handler(filtered);
  };

  useEffect(() => setSearchValue(""), [reset]);

  return (
    <Input
      placeholder={placeholder}
      value={searchValue}
      onChange={handleChange}
      allowClear
      suffix={<SearchOutlined />}
    />
  );
};

export default Search;
