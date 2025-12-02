import { useEffect, useState } from "react";

type Metrics = {
  usersActive: number;
  tripsCompleted: number;
  openReports: number;
  co2: string;
};

export function useAdminMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    usersActive: 2547,
    tripsCompleted: 1283,
    openReports: 47,
    co2: "3.2T",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        // Por ahora datos mock
        if (mounted) {
          setMetrics({
            usersActive: 2547,
            tripsCompleted: 1283,
            openReports: 47,
            co2: "3.2T",
          });
        }
      } catch (err) {
        if (mounted) setError(String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { metrics, loading, error, setMetrics };
}
