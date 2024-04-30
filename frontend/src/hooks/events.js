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
        const formData = new FormData();
        media.forEach((file) => formData.append("media", file));
        mediaRes = await axios.post("uploads/medias", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        data.media = mediaRes.data;
      } else {
        media.forEach((data) => {
          delete data.id;
          delete data.eventId;
        });
        data.media = media;
      }

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

export const useGetEvent = (id, enabled) => {
  const { isSuccess, isPending, isError, data, error, refetch } = useQuery({
    queryFn: async () => {
      const res = await axios.get(`events/${id}`);
      return res.data.data;
    },
    queryKey: [`event/${id}`],
    enabled: enabled ?? true,
  });

  return { isSuccess, isError, isPending, data, error, refetch };
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { create: mutate, isSuccess, isPending, isError, error, data };
};
