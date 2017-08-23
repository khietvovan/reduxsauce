import {
  pipe,
  trim,
  merge,
  split,
  reject,
  map as mapRamda,
  fromPairs,
  anyPass,
  isNil,
  isEmpty
} from 'ramda';

const isNilOrEmpty = anyPass([isNil, isEmpty]);

const defaultOptions = {
  prefix: ''
};

export default (types, options = {}) => {
  if (isNilOrEmpty(types)) throw new Error('valid types are required');

  const { prefix } = merge(defaultOptions, options);

  return pipe(
    trim,
    split(/\s/),
    mapRamda(trim),
    reject(isNilOrEmpty),
    mapRamda(x => [x, prefix + x]),
    fromPairs
  )(types);
};
