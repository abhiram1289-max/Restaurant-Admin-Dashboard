import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";

export default function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      axios
        .get(`/api/menu/search?q=${debouncedSearch}`)
        .then(res => setMenu(res.data));
    } else {
      fetchMenu();
    }
  }, [debouncedSearch]);

  const fetchMenu = async () => {
    const res = await axios.get("/api/menu");
    setMenu(res.data);
  };

  const toggleAvailability = async (item) => {
    const prev = menu;
    setMenu(menu.map(m =>
      m._id === item._id ? { ...m, isAvailable: !m.isAvailable } : m
    ));

    try {
      await axios.patch(`/api/menu/${item._id}/availability`);
    } catch {
      setMenu(prev);
      alert("Failed to update");
    }
  };

  return (
    <div>
      <h2>Menu Management</h2>

      <input
        placeholder="Search menu..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {menu.map(item => (
        <div key={item._id}>
          <b>{item.name}</b> – ₹{item.price}
          <button onClick={() => toggleAvailability(item)}>
            {item.isAvailable ? "Available" : "Unavailable"}
          </button>
        </div>
      ))}
    </div>
  );
}
