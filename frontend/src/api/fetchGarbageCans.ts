import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from 'src/libs/axios';

import useSWR from 'swr';

export type GarbageCanType = {
  garbage_can_id: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  note: string | null;
};

export const fetchGarbageCans = async () => {
  const { data }: AxiosResponse<GarbageCanType> = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/garbage-cans`,
  );
  return data;
};

export const useSWRGarbageCans = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/garbage-cans`,
    fetchGarbageCans,
  );
  return {
    garbageCans: data,
    isLoading,
    isError: error,
    mutate,
  };
};
