import api from './api';

export const getUsers = async (page = 1, search = '') => {
  const res = await api.get('/api/admin/users/', {
    params: {
      page,
      search,
    },
  });

  return res.data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/api/admin/users/${id}/delete/`);
};

export const toggleUserField = async (
  id: number,
  field: 'is_active' | 'is_staff'
) => {
  const res = await api.patch(`/api/admin/users/${id}/toggle/`, {
    field,
  });

  return res.data;
};
