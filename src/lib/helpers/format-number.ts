export const formatThousands = (value: number, locale = "en-US"): string =>
  new Intl.NumberFormat(locale).format(value);
