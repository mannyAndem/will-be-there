import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "../api/axios";

export const useCreateEvent = () => {
  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: async (values) => {
      const { media, ...data } = values;
      const formData = new FormData();
      media.forEach((file) => formData.append("media", file));

      const mediaRes = await axios.post("uploads/medias", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      data.media = mediaRes.data;
      console.log(data);

      return axios.post("events", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (isSuccess) {
      console.log(data);
    }
  }, [isError, isSuccess]);

  return { create: mutate, isPending, isSuccess, isError };
};

export const useGetEvents = () => {
  const { isSuccess, isPending, isError, data, error } = useQuery({
    queryFn: async () => {
      const res = await axios.get("events");
      return res.data.data;
    },
    queryKey: ["events"],
  });

  return { isSuccess, isError, isPending, data, error };
};
