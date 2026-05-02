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

  const createItem = async (data: any, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await apiClient.post(endpoint, data);
      const newItem = response.data.data;
      setItems(prev => [newItem, ...prev]);
      toast.success(response.data.message || 'Created successfully');
      return newItem;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create');
      throw err;
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const updateItem = async (id: string | number, data: any, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await apiClient.put(`${endpoint}/${id}`, data);
      const updatedItem = response.data.data;
      setItems(prev => prev.map((item: any) => item.id === id ? updatedItem : item));
      toast.success(response.data.message || 'Updated successfully');
      return updatedItem;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update');
      throw err;
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const deleteItem = async (id: string | number, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await apiClient.delete(`${endpoint}/${id}`);
      setItems(prev => prev.filter((item: any) => item.id !== id));
      toast.success(response.data.message || 'Deleted successfully');
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
      return false;
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const toggleField = async (id: string | number, field: string, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await apiClient.patch(`${endpoint}/${id}/toggle-${field}`);
      const updatedItem = response.data.data;
      setItems(prev => prev.map((item: any) => item.id === id ? updatedItem : item));
      toast.success(response.data.message || 'Toggled successfully');
      return updatedItem;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to toggle');
      throw err;
    } finally {
      if (!silent) setLoading(false);
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
