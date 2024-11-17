import axios, { AxiosResponse } from 'axios';
// import { axiosInstance } from 'src/libs/axios';

import useSWR from 'swr';

export type ImagePostResponseType = {
  message: string;
  image_url: string;
};

export const postBinaryImage = async (imageUri: string) => {
  // 画像をバイナリデータとして取得
  const response = await fetch(imageUri);
  const blob = await response.blob();
  console.log('blob', blob);

  // バイナリデータを直接送信
  const { data }: AxiosResponse<ImagePostResponseType> = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/yolo`,
    blob,
    // {
    //   headers: {
    //     'Content-Type': 'application/octet-stream',
    //   },
    // },
  );
  return data;
};

export const usePostBinaryImage = (imageUri: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    () => (imageUri ? `${process.env.EXPO_PUBLIC_API_URL}/yolo` : null),
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
