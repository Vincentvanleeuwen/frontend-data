export const getPlaces = (data, type) => {
  return data.map(d => {
    if (d.type === type) {
      return d
    }
  })
  .filter(d => d !== undefined)
  .sort();
};