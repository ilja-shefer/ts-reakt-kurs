import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="form">
      <form>
        <div className="row">
          <TextField
            label="Имя"
            {...register('firstName', { required: 'Это обязательное поле!' })}
            helperText={errors.firstName && errors.firstName.message}
            error={!!errors.firstName}
            variant="filled"
            fullWidth
          />
          <TextField
            label="Фамилия"
            {...register('lastName', { required: 'Это обязательное поле!' })}
            helperText={errors.lastName && errors.lastName.message}
            error={!!errors.lastName}
            variant="filled"
            fullWidth
          />
        </div>
        <div className="row">
          <TextField
            {...register('email', {
              required: 'Это обязательное поле!',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Это неверная почта!',
              },
            })}
            helperText={errors.email && errors.email.message}
            error={!!errors.email}
            label="E-mail"
            variant="filled"
            fullWidth
          />
          <TextField
            type="password"
            label="Пароль"
            variant="filled"
            {...register('password', {
              required: 'Это обязательное поле!',
              minLength: {
                value: 5,
                message: 'Минимальная длина пароля 5 символов',
              },
            })}
            helperText={errors.password && errors.password.message}
            error={!!errors.password}
            fullWidth
          />
        </div>
        <div className="row">
          <TextField name="about" label="Дополнительная информация" variant="filled" fullWidth />
        </div>

        <div className="row">
          <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
            Зарегестрироваться
          </Button>
          <Button
            type="button"
            onClick={() => {
              reset();
            }}
            variant="contained"
            color="secondary">
            Очистить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
