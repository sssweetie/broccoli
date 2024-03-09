import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { firebaseConfig } from '../../services/firebaseConfig';

initializeApp(firebaseConfig);
const storage = getStorage();

export const getRandomBackgroundURL = async (number: number) => {
  const image = 'background-' + number + '.jpg';
  const storageRef = ref(storage, image);
  const url = await getDownloadURL(storageRef);
  return url;
};
