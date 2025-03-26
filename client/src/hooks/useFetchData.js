import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";

const useFetchData = (key, initialValue = [], useStorage = true) => {
  const [data, setDataState] = useState(initialValue);
  const [storedData, setStoredData] = useLocalStorage(key, initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dataState = useStorage ? storedData : data;
  const setData = useStorage ? setStoredData : setDataState;

  // 🔹 Fetch data (GET)
  const fetchData = async (route, isCSV = false, api = "node") => {
    setLoading(true);
    setError(null);

    const url = `api/${route}`;

    try {
      const response = await fetch(url);

      if (response.status === 204) {
        toast.error("No hay datos en el rango de fecha");
        return;
      }

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const contentType = response.headers.get("Content-Type");

      if (isCSV || contentType.includes("text/csv")) {
        const blob = await response.blob();
        const csvUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = csvUrl;
        a.download = "komatsu_horno_40.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        const result = await response.json();
        setData(result);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Send data (POST, PUT, DELETE)
  const sendData = async (route, method = "POST", body = {}) => {
    setLoading(true);
    setError(null);
    const url = `${baseUrl}/${route}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error ${method} data: ${response.statusText}`);
      }

      const result = await response.json();
      // setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      alert(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data: dataState, loading, error, fetchData, sendData };
};

export default useFetchData;
