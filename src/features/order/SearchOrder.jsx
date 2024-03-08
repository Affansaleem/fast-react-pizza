import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="rounded-full px-4 py-2 text-sms bg-yellow-100 placeholder: text-stone-400 w-28 sm:w-64 sm:focus:w-72 focus ring-yellow-500 focus:ring-opacity-50 focus:outline-none transition-all duration-300"
        placeholder={"Search order#"}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </form>
  );
}

export default SearchOrder;
