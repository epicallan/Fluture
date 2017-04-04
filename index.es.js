export {
  Future,
  Future as default,
  isFuture,
  reject,
  of,
  never,
  isNever
} from './src/core';

export * from './src/dispatchers/index';

export {after} from './src/after';
export {both} from './src/both';
export {chainRec} from './src/chain-rec';
export {first} from './src/race';
export {go, go as do} from './src/go';
export {parallel} from './src/parallel';
export {rejectAfter} from './src/reject-after';
