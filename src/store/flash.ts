import { AlertColor } from '@mui/material';
import { atom } from 'recoil';

const flashState = atom<boolean>({
  key: 'flashState',
  default: false,
});

const flashMessage = atom<string | undefined>({
  key: 'flashMessage',
  default: '',
});

const flashType = atom<AlertColor>({
  key: 'flashType',
  default: 'success',
});

export { flashState, flashMessage, flashType };
