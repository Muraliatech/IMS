import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        })
         
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
