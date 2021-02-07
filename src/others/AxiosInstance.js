import Axios from "axios";

export default Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  withCredentials: true,
});
