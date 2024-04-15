import { useMemo } from 'react'

export const useUUID = <T extends string>(...args: T[]) => {
  const obj = useMemo(() => {
    const newObj = {} as Record<T, string>;
    args.forEach(arg => (newObj[arg] = self.crypto.randomUUID()));
    return newObj;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return obj;
};