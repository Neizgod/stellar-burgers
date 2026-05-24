import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser, userSliceSelector } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { name, email, loginUserError, loginUserRequest } =
    useSelector(userSliceSelector);

  const user = {
    name: name,
    email: email
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [name, email]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedData: any = {};
    if (formValue.name !== name) updatedData.name = formValue.name;
    if (formValue.email !== email) updatedData.email = formValue.email;
    if (formValue.password) updatedData.password = formValue.password;

    if (Object.keys(updatedData).length === 0) return;

    setError('');

    dispatch(updateUser(updatedData));
  };

  useEffect(() => {
    if (loginUserError) {
      setError(loginUserError);
    }
  }, [loginUserError]);

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (loginUserRequest) return <Preloader />;

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error}
    />
  );
};
