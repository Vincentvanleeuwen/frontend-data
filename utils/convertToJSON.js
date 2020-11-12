// Loop through endPoints, convert them to JSON
export const convertToJSON = (result) => {
  let dataSetsToJson = result.map(dataSet => dataSet.json());
  return Promise.all(dataSetsToJson);
};
