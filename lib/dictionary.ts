import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ne: () => import('@/dictionaries/ne.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.en();
  }
  const loadFn = dictionaries[locale];
  const dict = await loadFn();
  return dict as unknown as Awaited<ReturnType<typeof dictionaries.en>>;
};
