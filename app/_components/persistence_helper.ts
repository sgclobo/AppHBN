export const storageHelper = {
  getItem: async (key: string) => {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  },
  setItem: async (key: string, value: string) => {
    if (typeof window !== 'undefined') localStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  }
};
