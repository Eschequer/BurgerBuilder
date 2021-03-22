import axios from "axios";

export default axios.create({
  baseURL: "https://burgerapp-7f3e6-default-rtdb.firebaseio.com",
});
