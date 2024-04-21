import { FC } from 'react';

interface BackgroundImageProps {
  backgroundImage?: string;
}

export const BackgroundImage: FC<BackgroundImageProps> = ({
  backgroundImage,
}) => {
  if (!backgroundImage) {
    return null;
  }

  return (
    <img
      alt="table background"
      src={backgroundImage}
      className="table-background"
    />
  );
};
