/**
 * Contract: useCrudFiesta Composable
 *
 * Shared helper composable used across all Cf* components.
 * Provides route building, value formatting, and sort icon resolution.
 */

export interface UseCrudFiestaReturn {
  /** Build a full URL from a Laravel route name + params, using Ziggy */
  buildRoute: (routeName: string, params?: Record<string, string | number>) => string

  /**
   * Format a cell value for display, resolving relation values if present.
   * E.g., for a 'post_id' column with relation { relation: 'post', display_field: 'title' },
   * returns row.post.title instead of row.post_id.
   */
  formatColumnValue: (
    row: Record<string, unknown>,
    field: string,
    relation?: { relation: string; display_field: string }
  ) => string

  /**
   * Return the appropriate Lucide icon name for the current sort state.
   *  - null if this column is not the active sort
   *  - 'ArrowUp' if ascending
   *  - 'ArrowDown' if descending
   */
  getSortIcon: (field: string, sortField: string | null, sortOrder: 'asc' | 'desc' | null) => string | null

  /** Return the next sort order in the toggle cycle: null → 'asc' → 'desc' → null */
  getNextSortOrder: (field: string, currentField: string | null, currentOrder: 'asc' | 'desc' | null) => 'asc' | 'desc' | null
}