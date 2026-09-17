"use client";

import { useId, useMemo, useState } from "react";

import { MediaCard } from "@/components/media/media-card";
import { mediaDefaultSort, mediaFilters } from "@/data/media-inventory";
import {
  filterMediaItems,
  searchMediaItems,
  sortMediaItems,
} from "@/lib/media-archive";
import type { MediaFilter, MediaItem, MediaSortOrder } from "@/types/media";
import { cn } from "@/utils/cn";

type MediaArchiveProps = Readonly<{
  items: readonly MediaItem[];
}>;

export function MediaArchive({ items }: MediaArchiveProps) {
  const searchId = useId();
  const sortId = useId();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MediaFilter>("All");
  const [sort, setSort] = useState<MediaSortOrder>(mediaDefaultSort);

  const visibleItems = useMemo(
    () =>
      sortMediaItems(
        searchMediaItems(filterMediaItems(items, filter), query),
        sort,
      ),
    [items, filter, query, sort],
  );

  return (
    <>
      <div className="media-archive__toolbar">
        <div className="media-archive__controls">
          <div className="form-field media-archive__search">
            <label className="form-label" htmlFor={searchId}>
              Search coverage
            </label>
            <input
              className="form-control"
              id={searchId}
              type="search"
              placeholder="Search coverage..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="form-field media-archive__sort">
            <label className="form-label" htmlFor={sortId}>
              Sort by
            </label>
            <select
              className="form-control"
              id={sortId}
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as MediaSortOrder)
              }
            >
              <option value="oldest">Oldest first</option>
              <option value="newest">Newest first</option>
            </select>
          </div>
        </div>

        <div
          className="media-archive__filters"
          role="group"
          aria-label="Filter coverage by type"
        >
          {mediaFilters.map((option) => (
            <button
              key={option}
              className={cn(
                "media-archive__filter",
                option === filter && "media-archive__filter--active",
              )}
              type="button"
              aria-pressed={option === filter}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="media-archive__count" role="status">
          Showing {visibleItems.length} of {items.length} results
        </p>
      </div>

      {visibleItems.length > 0 ? (
        <div className="media-archive__grid">
          {visibleItems.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="media-archive__empty">
          No coverage matches your search or filter yet. Try a different term or
          choose All.
        </p>
      )}
    </>
  );
}
