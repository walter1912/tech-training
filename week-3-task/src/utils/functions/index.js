// handle string
export const toCapitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  export const getFirstLetters = (str) => {
    return str
      .split(" ") 
      .map((word) => word.charAt(0)) 
      .join(""); 
  };