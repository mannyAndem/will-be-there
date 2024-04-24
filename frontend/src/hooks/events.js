import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { useEffect } from "react";

export const useCreateEvent = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (values) => {
      const mediaFilesInfo = [];
      const { media, ...data } = values;
      await media.forEach(async (file) => {
        const formData = new FormData();
        formData.append("media", file);
        const res = await axios.post("uploads/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        mediaFilesInfo.push(res.data);
      });

      console.log(mediaFilesInfo);
      data.media = mediaFilesInfo;

      return axios.post("event/create", JSON.stringify(data), {
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
  }, [isError]);

  return { create: mutate, isPending, isSuccess, isError };
};
