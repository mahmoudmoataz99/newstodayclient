import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ categories, onCategorySelect }) => {
  return (
    <select
      onChange={(e) => onCategorySelect(e.target.value)}
      className="mb-6 px-4 py-2 rounded bg-gray-100 border"
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  );
};

export default CategoryFilter;
