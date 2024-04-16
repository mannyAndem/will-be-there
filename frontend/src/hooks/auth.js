/**
 * File contains hooks to handle authentication
 */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import axios from '../api/axios'

export const useGetCurrentUser = () => {
  // const { user } = useAuthContext()
  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => axios.get('auth/me'),
  })

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
    }
    if (isError) {
      console.error(error)
    }
  }, [isSuccess, isError])

  return { data, isSuccess, isError, isPending, error }
}

export const useLogin = () => {
  const { isError, isPending, isSuccess, error, mutate, data } = useMutation({
    mutationFn: (data) =>
      axios.post('auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }),
  })

  if (isSuccess) {
    localStorage.setItem('access_token', data?.data?.token.access_token)
    localStorage.setItem('refresh_token', data?.data?.token.refresh_token)
  }

  return { login: mutate, isSuccess, isError, isPending, error }
}

export const useSignup = () => {
  const { isError, isPending, isSuccess, data, error, mutate } = useMutation({
    mutationFn: (data) =>
      axios.post('auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }),
  })

  if (isSuccess) {
    localStorage.setItem('access_token', data?.data?.token.access_token)
    localStorage.setItem('refresh_token', data?.data?.token.refresh_token)
  }

  return { signup: mutate, isSuccess, isError, isPending, error }
}

export const useForgotPassword = () => {
  const { mutate, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: (data) =>
      axios.post('auth/forgot-password', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
  })

  return { isSuccess, isPending, isError, error, trigger: mutate }
}

export const useResetPassword = () => {
  const { isSuccess, isError, isPending, error, mutate } = useMutation({
    mutationFn: (data) =>
      axios.post('auth/change-password', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
  })

  return { isSuccess, isError, isPending, error, resetPassword: mutate }
}

export const useGoogleSignup = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryFn: () => axios.get('auth/google/redirect'),
    enabled: false,
    queryKey: ['google'],
  })

  return { data, isPending, isError, error, refetch }
}
