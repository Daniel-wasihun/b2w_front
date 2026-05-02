import { useState } from "react";
import { toast } from "sonner";

export function useAdminApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(promise: Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await promise as any;
      // Assuming the API response structure: { data: { data: T[], message?: string }, ... }
      const data = result.data?.data || result.data;
      if (result.data?.message) {
        toast.success(result.data.message);
      }
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || 
                     err.response?.data?.error || 
                     "Operation failed";
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}