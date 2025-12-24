import api from './api';

export const adminLogin = async (username: string, password: string) => {
  const res = await api.post('/api/admin/login/', {
    username,
    password,
  });

  localStorage.setItem('access', res.data.access);
  localStorage.setItem('refresh', res.data.refresh);

  return res.data;
};