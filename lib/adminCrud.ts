import { useState } from 'react';
import apiClient from './apiClient';
import { toast } from 'sonner';

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export function useAdminCrud<T = any>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchItems = async (page = 1, perPage = 15) => {
    setLoading(true);
    try {
      const response = await apiClient.get(endpoint, {
        params: { page, per_page: perPage }
      });
      setItems(response.data.data);
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (data: any) => {
    setLoading(true);
    try {
      const response = await apiClient.post(endpoint, data);
      toast.success(response.data.message || 'Created successfully');
      return response.data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string | number, data: any) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`${endpoint}/${id}`, data);
      toast.success(response.data.message || 'Updated successfully');
      return response.data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string | number) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`${endpoint}/${id}`);
      toast.success(response.data.message || 'Deleted successfully');
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleField = async (id: string | number, field: string) => {
    setLoading(true);
    try {
      const response = await apiClient.patch(`${endpoint}/${id}/toggle-${field}`);
      toast.success(response.data.message || 'Toggled successfully');
      return response.data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to toggle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    setItems,
    loading,
    pagination,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    toggleField,
  };
}
