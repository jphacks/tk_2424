import { AxiosResponse } from 'axios';
import { axiosInstance } from 'src/libs/axios';

import useSWR from 'swr';

export type GarbageType = {
  garbage_id: number;
  user_id: number;
  longitude: number;
  latitude: number;
  is_discarded: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  note: string | null;
};

export const fetchGarbage = async () => {
  const { data }: AxiosResponse<GarbageType> = await axiosInstance.get(
    `${process.env.EXPO_PUBLIC_API_URL}/garbages`,
  );
  return data;
};

export const useSWRGarbage = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/garbages`,
    fetchGarbage,
  );
  return {
    garbage: data,
    isLoading,
    isError: error,
    mutate,
  };
};
