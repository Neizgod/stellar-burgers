import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  registerUser,
  userSliceSelector
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUserError, loginUserRequest } = useSelector(userSliceSelector);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    dispatch(registerUser({ name: userName, email, password }));
    navigate('/login');
  };

  useEffect(() => {
    if (loginUserError) {
      setError(loginUserError);
    }
  }, [loginUserError]);

  if (loginUserRequest) return <Preloader />;

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
