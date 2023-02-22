function updateDataUsername(arr: any, id: string, name: string) {
  if (arr.length === 0) return;
  for (let key in arr[0]) {
    if (Array.isArray(arr[0][key])) updateDataUsername(arr[0][key], id, name);
    if (
      typeof arr[0][key] === "object" &&
      arr[0][key].constructor === Object &&
      arr[0][key].hasOwnProperty("username") &&
      arr[0][key]._id === id
    ) {
      arr[0][key].username = name;
    }
  }
  if (
    typeof arr[0] === "object" &&
    arr[0].constructor === Object &&
    arr[0].hasOwnProperty("username") &&
    arr[0]._id === id
  ) {
    arr[0].username = name;
  }
  updateDataUsername(arr.slice(1), id, name);
}

export default updateDataUsername;
