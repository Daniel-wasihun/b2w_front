// Admin-specific constants
export const ADMIN_TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful',
    LOGOUT: 'Logged out successfully',
    FETCH_USER: 'User data updated',
    CREATE: 'Item created successfully',
    UPDATE: 'Item updated successfully',
    DELETE: 'Item deleted successfully',
  },
  ERROR: {
    FETCH_FAILED: 'Failed to fetch data',
    CREATE_FAILED: 'Failed to create item',
    UPDATE_FAILED: 'Failed to update item',
    DELETE_FAILED: 'Failed to delete item',
    VALIDATION_FAILED: 'Validation failed',
  },
} as const;

// Date formats
export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  MEDIUM: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

// Default table settings
export const DEFAULT_TABLE_SETTINGS = {
  PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
} as const;