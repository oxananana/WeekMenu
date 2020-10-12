import { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/database";

const useQuery = (queryFn, { onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  // debugger;

  const query = async () => {
    try {
      const response = await queryFn();
      console.log(response);
      setData(response);
      setIsLoading(false);
    } catch (error) {
      // debugger;
      setError(error);
      setIsLoading(false);

      if (onError !== undefined) {
        onError(error);
      }
    }
  };

  useEffect(() => {
    query();
  }, []);

  return [data, isLoading, error];
};

const useQuery2 = (request) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const db = firebase.database();
    db.ref(`/${request}`)
      .once("value")
      .then((snapshot) => {
        setData(snapshot.val());
        setIsLoading(false);
        console.log(snapshot.val());
      })
      .catch((error) => {
        console.log("get recipes error", error);
        setIsLoading(false);
      });
  }, [request]);

  return [data, isLoading];
};

export default useQuery;
