import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser, userSliceSelector } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { loginUserError, loginUserRequest } = useSelector(userSliceSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (loginUserError) {
      setError(loginUserError);
    }
  }, [loginUserError]);

  if (loginUserRequest) return <Preloader />;

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
