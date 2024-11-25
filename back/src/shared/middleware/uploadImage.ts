import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (imagePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error('Erro ao fazer upload da imagem: ' + error.message);
      } else {
        throw new Error('Erro desconhecido ao fazer upload da imagem');
      }
  }
};
