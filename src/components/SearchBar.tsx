import { useState, useRef, useEffect } from "react";

export default function SearchPopover() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-64">
      <input
        type="text"
        placeholder="Type search origin"
        className="w-full rounded border px-3 py-2"
        onFocus={() => setOpen(true)}
        onChange={() => setOpen(true)} // open as you type
      />
      {open && (
        <div className="absolute right-0 left-0 z-10 mt-1 rounded border bg-white shadow-lg">
          <div className="cursor-pointer p-2 hover:bg-gray-100">Hey 1</div>
          <div className="cursor-pointer p-2 hover:bg-gray-100">Hey 2</div>
        </div>
      )}
    </div>
  );
}
