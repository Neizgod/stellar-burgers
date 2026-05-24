import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSliceSelector } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSliceSelector).name;

  return <AppHeaderUI userName={userName} />;
};
