// Fetch the database URL
export const fetchAllData = async (endPoints) => {

  const allEndpoints = endPoints.map(endPoint => fetch(endPoint));
  return Promise.all(allEndpoints);

};