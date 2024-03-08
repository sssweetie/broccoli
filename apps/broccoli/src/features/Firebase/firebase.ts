import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCHfLniBLYLj5eV4GV9izzuOlZfFL5tnOQ',
  authDomain: 'broccoli-dc32b.firebaseapp.com',
  projectId: 'broccoli-dc32b',
  storageBucket: 'broccoli-dc32b.appspot.com',
  messagingSenderId: '406860771082',
  appId: '1:406860771082:web:c322ccca9fba8db04b54f3',
};

initializeApp(firebaseConfig);
const storage = getStorage();

export const getRandomBackgroundURL = async (number: number) => {
  const image = 'background-' + number + '.jpg';
  const storageRef = ref(storage, image);
  const url = await getDownloadURL(storageRef);
  return url;
};
