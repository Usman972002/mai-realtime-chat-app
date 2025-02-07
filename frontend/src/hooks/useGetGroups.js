import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetGroups = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/groups");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setGroups(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getGroups();
  }, []);

  return { loading, groups };
};

export default useGetGroups;