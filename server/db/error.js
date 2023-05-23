export const handleErrors = (code) => {
  switch (code) {
    case "22P02":
      return {
        status: 400,
        message: "Invalid format in the parameter: Only numbers are accepted",
      };
    case "28P01":
      return {
        status: 400,
        message: "Incorrect postgres password",
      };
    case "3D000":
      return {
        status: 400,
        message: "Database does not exist",
      };
    case "ECONNREFUSED":
      return {
        status: 400,
        message: "Failed to connect to the database",
      };
    case "400":
      return {
        status: 404,
        message: "You must complete all required fields: titulo, img, descripcion"
      };
    case "404":
      return {
        status: 404,
        message: "File not found"
      }
    default:
      return {
        status: 500,
        message: "Internal Server Error"
      };
  }
};

