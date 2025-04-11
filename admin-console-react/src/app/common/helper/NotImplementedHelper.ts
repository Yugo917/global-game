export const alertNotImplemented = (obj?: object) => {
  if (obj) {
    alert(`Not Implemented : ${JSON.stringify(obj)}`);
  } else {
    alert("Not Implemented");
  }
};
