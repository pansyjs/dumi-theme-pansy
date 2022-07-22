import { context } from 'dumi/theme';
import { useContext, useMemo } from 'react';

export const useLinkMap = () => {
  const { menu } = useContext(context);
  const linkMap = useMemo(() => {
    const stack = Array.isArray(menu) ? menu.slice() : [];
    const map: { [title: string]: any } = stack.length > 0 ? {} : null
    while (stack.length) {
      const current = stack.pop();
      if (Array.isArray(current.children)) {
        stack.push(...current.children);
      }
      map[current.title.split(' ')[0]] = current;
      map[current.title] = current;
      map[current.path] = current;
    }
    return map;
  }, [menu]);
  return linkMap;
};
