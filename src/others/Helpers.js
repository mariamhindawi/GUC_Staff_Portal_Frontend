const getItem = (items, itemID) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === itemID) {
      return items[i];
    }
  }
  return null;
};

const removeFromPath = (path, number) => {
  const splitPath = path.split("/");
  if (number < splitPath.length) {
    splitPath.length -= number;
    return splitPath.join("/");
  }
  return "";
};

export { getItem, removeFromPath };
