export const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};
export const getItem = (key) => {
  return localStorage.getItem(key);
};
export const removeItem = (arr) => {
  arr.map((key) => {
    localStorage.removeItem(key);
  });
  
};
