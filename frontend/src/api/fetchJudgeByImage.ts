import { AxiosResponse } from 'axios';
import { axiosInstance } from 'src/libs/axios';

import useSWR from 'swr';

export type ImagePostResponseType = {
  message: string;
  image_url: string;
};

export const postBinaryImage = async (imageUri: string) => {
  // 画像をバイナリデータとして取得
  const response = await fetch(imageUri);
  const blob = await response.blob();

  // バイナリデータを直接送信
  const { data }: AxiosResponse<ImagePostResponseType> = await axiosInstance.post(
    `${process.env.EXPO_PUBLIC_API_URL}/upload-image`,
    blob,
    {
      headers: {
        'Content-Type': blob.type,
      },
    },
  );
  return data;
};

export const usePostBinaryImage = (imageUri: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    () => (imageUri ? `${process.env.EXPO_PUBLIC_API_URL}/upload-image` : null),
    () => postBinaryImage(imageUri),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );
  return {
    response: data,
    isLoading,
    isError: error,
    mutate,
  };
};
