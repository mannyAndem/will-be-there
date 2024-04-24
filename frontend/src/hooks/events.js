import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { useEffect } from "react";

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

      data.media = mediaFilesInfo;
      console.log(data);

      return axios.post("events", JSON.stringify(data), {
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
