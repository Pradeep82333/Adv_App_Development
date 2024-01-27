// src/RegisterForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your registration logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Username:
        <input type="text" name="username" ref={register({ required: 'This field is required' })} />
        {errors.username && <span>{errors.username.message}</span>}
      </label>

      <label>
        Email:
        <input
          type="text"
          name="email"
          ref={register({
            required: 'This field is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          ref={register({ required: 'This field is required', minLength: 8 })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </label>

      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          ref={register({
            validate: (value) => value === watch('password') || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </label>

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
