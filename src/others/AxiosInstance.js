import Axios from "axios";

export default Axios.create({
  baseURL: "https://staff-portal-guc.herokuapp.com/",
  withCredentials: true,
});
