"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Church } from "@/types/db";

interface ChurchComboboxProps {
  value: Church | null;
  onChange: (church: Church | null) => void;
}

export function ChurchCombobox({ value, onChange }: ChurchComboboxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Church[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value || query.trim().length === 0) {
      setResults([]);
      return;
    }

    const supabase = createClient();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("churches")
        .select("id, code, name")
        .or(`code.ilike.%${query}%,name.ilike.%${query}%`)
        .limit(10);
      setResults(data ?? []);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor="church" className="block text-sm font-medium text-gray-700">
        교회
      </label>
      {value ? (
        <div className="mt-1 flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
          <span className="text-sm">
            {value.name}{" "}
            <span className="text-gray-400">({value.code})</span>
          </span>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setQuery("");
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            변경
          </button>
        </div>
      ) : (
        <input
          id="church"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="교회 코드(예: CH-8921) 또는 이름으로 검색"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoComplete="off"
        />
      )}

      {isOpen && !value && query.trim().length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {isLoading && (
            <li className="px-3 py-2 text-sm text-gray-400">검색 중...</li>
          )}
          {!isLoading && results.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-400">
              검색 결과가 없습니다
            </li>
          )}
          {results.map((church) => (
            <li key={church.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(church);
                  setIsOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                {church.name}{" "}
                <span className="text-gray-400">({church.code})</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
