import { useEffect, useState } from "react";

const useQuery = (queryFn, initialData, { onError } = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);

  const query = async () => {
    try {
      const response = await queryFn();
      console.log("success", response);
      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);

      if (onError !== undefined) {
        onError(error);
      }
    }
  };

  useEffect(() => {
    query();
  }, []); // eslint-disable-line

  return [data, isLoading, error];
};

export default useQuery;
