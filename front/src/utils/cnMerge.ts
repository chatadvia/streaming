// utils/classNames.ts
import clsx from 'clsx';

const cnMerge = (...classes: (string | undefined | false)[]) =>
  clsx(classes);

export default cnMerge;
