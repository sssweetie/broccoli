import clsx from 'clsx';
import { FC } from 'react';
import { ModalCreateBoardProps } from '../../ModalCreateBoard';

type ImagesProps = 'images' | 'selectedIndex' | 'onClick';

export const Images: FC<Pick<ModalCreateBoardProps, ImagesProps>> = ({
  images,
  selectedIndex,
  onClick,
}) => {
  return (
    <section className="pick-up-image">
      {images.map((image, index) => (
        <img
          key={image}
          alt="background"
          src={image}
          className={clsx('pick-up-image__background', {
            'pick-up-image__background--with-border': selectedIndex === index,
          })}
          onClick={() => onClick(index)}
        />
      ))}
    </section>
  );
};
