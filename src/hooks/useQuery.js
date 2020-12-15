import { useEffect, useState } from "react";

const useQuery = (queryFn, initialData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);

  const query = async () => {
    try {
      const response = await queryFn();
      setData(response);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    query();
  }, []); // eslint-disable-line

  return [data, isLoading, error];
};

export default useQuery;
