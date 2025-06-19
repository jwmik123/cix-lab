"use client";

import { useState, useEffect } from "react";

interface ContentFilterProps {
  categories: string[];
  years: number[];
  onFilterChange: (filters: { category: string; year: string }) => void;
  showYearFilter?: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  "creative-and-cultural-entrepreneurship":
    "Creative and Cultural Entrepreneurship",
  "innovation-in-arts-entertainment-and-science":
    "Innovation in Arts, Entertainment and Science",
  "fashion-and-luxury-goods": "Fashion and Luxury Goods",
  "creative-technologies-generative-ai":
    "Creative Technologies & Generative AI",
  "cultural-ecosystem-services": "Cultural Ecosystem Services",
};

export default function ContentFilter({
  categories,
  years,
  onFilterChange,
  showYearFilter = true,
}: ContentFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      year: selectedYear,
    });
  }, [selectedCategory, selectedYear, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          {/* Category Filter - Left Aligned */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${
                  selectedCategory === "all"
                    ? "bg-red-600 text-white border-red-600"
                    : "border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-red-600 text-white border-red-600"
                      : "border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300"
                  }`}
                >
                  {CATEGORY_LABELS[category] || category.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter - Right Aligned with Inline Label */}
          {showYearFilter && years.length > 0 && (
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Filter by Year
              </h3>
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm min-w-[120px]"
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
