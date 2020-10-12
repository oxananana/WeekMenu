import { useEffect, useState } from "react";

const useBatchQueries = (queryFn, { onError } = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  // debugger;

  const query = async () => {
    try {
      const response = await queryFn();
      setData(response);
      setIsLoading(false);
      console.log(response);
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
  }, []); // eslint-disable-line

  return [data, isLoading, error];
};

// const useBatchQueries2 = (requests, order) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const db = firebase.database();
//     let newData = [];

//     let promises = requests.map(({ request, order }) => {
//       return db
//         .ref(`/${request}`)
//         .orderByChild(order)
//         .once(
//           "value",
//           (snapshot) => {
//             let obj = {};
//             snapshot.forEach(function (child) {
//               obj[child.key] = child.val();
//             });
//             newData.push(obj);
//           },
//           (error) => {
//             console.log("get recipes error", error);
//             newData.push(null);
//           }
//         );
//     });

//     Promise.all(promises).then(() => {
//       setData(newData);
//       setIsLoading(false);
//     });
//   }, []);

//   return [data, isLoading];
// };

export default useBatchQueries;
