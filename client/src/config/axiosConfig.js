import axios from "axios";
import { baseURL } from "../constants/constants";

const axiosInstance = axios.create({ baseURL });

export { axiosInstance };
