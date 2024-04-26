import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { useEffect } from "react";
import { queryClient } from "../react-query/react-query";

export const useCreateEvent = () => {
  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: async (values) => {
      const mediaFilesInfo = [];

      const { media, ...data } = values;

      await media.forEach(async (file) => {
        const formData = new FormData();
        formData.append("media", file);
        const res = await axios.post("uploads/media", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        mediaFilesInfo.push(res.data);
      });

      data.media = [...mediaFilesInfo];
      console.log(data);

      const res = await axios.post("events", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
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
