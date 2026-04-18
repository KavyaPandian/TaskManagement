import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const useFetch = () => {

  const [state, setState] = useState({
    loading: false,
    data: null,
    successMsg: "",
    errorMsg: "",
  });

  const fetchData = useCallback(async (config, otherOptions = {}) => {
    const { showSuccessToast = true, showErrorToast = true } = otherOptions;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await api(config);   // ✅ USE api(config)

      const data = res.data;

      setState({
        loading: false,
        data,
        successMsg: data.msg || "Success",
        errorMsg: "",
      });

      if (showSuccessToast && data.msg) {
        toast.success(data.msg);
      }

      return data;   // ✅ cleaner return

    } catch (error) {
      console.error("API ERROR:", error); // 🔥 DEBUG LINE

      const msg =
        error.response?.data?.msg ||
        error.message ||
        "Something went wrong";

      setState({
        loading: false,
        data: null,
        errorMsg: msg,
        successMsg: "",
      });

      if (showErrorToast) {
        toast.error(msg);
      }

      throw error; // ✅ important for debugging
    }
  }, []);

  return [fetchData, state];
};

export default useFetch;