import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "../api/axios";
import { queryClient } from "../react-query/react-query";

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

      const res = await axios.post("events", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return { create: mutate, isPending, isSuccess, isError, error, data };
};

export const usePatchEvent = () => {
  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: async ({ values, eventId }) => {
      const { media, ...data } = values;
      let mediaRes = null;

      if (media[0] instanceof File) {
        console.log("is file.");
        const formData = new FormData();
        media.forEach((file) => formData.append("media", file));
        mediaRes = await axios.post("uploads/medias", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        data.media = mediaRes.data;
      } else {
        console.log("isn't file");
        data.media = media;
      }

      console.log(data);

      const res = await axios.patch(`events/${eventId}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return { patch: mutate, isPending, isSuccess, isError, error, data };
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

export const useGetEvent = (id) => {
  const { isSuccess, isPending, isError, data, error } = useQuery({
    queryFn: async () => {
      const res = await axios.get(`events/${id}`);
      return res.data.data;
    },
    queryKey: [`event/${id}`],
  });

  return { isSuccess, isError, isPending, data, error };
};

export const useCreateRsvp = () => {
  const { isSuccess, isPending, isError, error, data, mutate } = useMutation({
    mutationFn: async ({ eventId, data }) => {
      const res = await axios.post(`events/${eventId}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data.data;
    },
  });

  return { create: mutate, isSuccess, isPending, isError, error, data };
};
