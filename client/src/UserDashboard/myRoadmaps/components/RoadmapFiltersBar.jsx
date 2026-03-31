import React from 'react'
import { Search, SlidersHorizontal } from 'lucide-react';

const filterTabs = [
    { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
  { key: 'completed', label: 'Completed' },
]

const RoadmapFiltersBar = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  counts,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Filter tabs */}
      <div
        className="flex items-center gap-1 p-1 rounded-xl flex-shrink-0"
        style={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(45, 55, 72, 0.5)' }}
      >
        {filterTabs.map((tab) => (
          <button
            key={`filter-${tab.key}`}
            onClick={() => onFilterChange(tab.key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: filter === tab.key ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
              color: filter === tab.key ? '#9F67FF' : '#9CA3AF',
              border: filter === tab.key ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid transparent',
            }}
          >
            {tab.label}
            <span
              className="text-xs px-1.5 py-0.5 rounded-full mono"
              style={{
                background: filter === tab.key ? 'rgba(124, 58, 237, 0.2)' : 'rgba(45, 55, 72, 0.5)',
                color: filter === tab.key ? '#C084FC' : '#6B7280',
                fontSize: '10px',
              }}
            >
              {counts?.[tab.key] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative flex-1">
        <Search 
          size={14} 
          className="absolute left-3 top-1/2 -translate-y-1/2" 
          style={{ color: '#6B7280' }} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search roadmaps, topics, tags..."
          className="input-field pl-9"
        />
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <SlidersHorizontal size={14} style={{ color: '#6B7280' }} />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field py-2 text-sm"
          style={{ width: 'auto', paddingRight: '32px', cursor: 'pointer' }}
        >
          <option value="recent">Most Recent</option>
          <option value="progress">By Progress</option>
          <option value="title">Alphabetical</option>
        </select>
      </div>
    </div>
  )
}

export default RoadmapFiltersBar