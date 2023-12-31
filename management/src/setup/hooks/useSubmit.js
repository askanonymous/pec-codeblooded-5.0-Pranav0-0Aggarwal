import useAxiosPrivate from "./useAxiosPrivate";
import { useMutation } from "react-query";
import { useState } from "react";

const useSubmit = () => {

  const axiosPrivate= useAxiosPrivate()
  const [status, setStatus] = useState();
  const [isDone, setIsDone] = useState(false);
  const { mutate, isLoading } = useMutation(apiCall, {
    onSuccess: (res) => {
      setStatus(res.status);
      console.log('success bro')
    },
    onError: (err) => {
      if (!err?.response) {
        setStatus(500);
      } else setStatus(err.response?.status);
    },
    onSettled: (res) => {
      setIsDone(true);
    },
    onMutate: (res) => {
      setIsDone(false)
    }
  });

  return [
    (url, obj)=>mutate({url:url, obj:obj}),
    isLoading,
    status,
    isDone
  ];
  
  async function apiCall({ url, obj }) {
    const response = await axiosPrivate.post(url, obj.body, obj.query)
      return response;
  }
}
export default useSubmit;
