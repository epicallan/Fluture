import {expect} from 'chai';
import {Future, rejectAfter} from '../index.es.js';
import * as U from './util';
import type from 'sanctuary-type-identifiers';

describe('rejectAfter()', () => {

  it('is a curried binary function', () => {
    expect(rejectAfter).to.be.a('function');
    expect(rejectAfter.length).to.equal(2);
    expect(rejectAfter(20)).to.be.a('function');
  });

  it('throws TypeError when not given a number as first argument', () => {
    const xs = [{}, [], 'a', new Date, undefined, null];
    const fs = xs.map(x => () => rejectAfter(x));
    fs.forEach(f => expect(f).to.throw(TypeError, /Future/));
  });

  it('returns an instance of Future', () => {
    expect(rejectAfter(20, 1)).to.be.an.instanceof(Future);
  });

});

describe('RejectAfter', () => {

  const m = rejectAfter(20, 1);

  it('extends Future', () => {
    expect(m).to.be.an.instanceof(Future);
  });

  it('is considered a member of fluture/Fluture', () => {
    expect(type(m)).to.equal(Future['@@type']);
  });

  describe('#fork()', () => {

    it('calls failure callback with the reason', () => {
      return U.assertRejected(m, 1);
    });

    it('clears its internal timeout when cancelled', done => {
      rejectAfter(20, 1).fork(U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

  describe('#extractLeft()', () => {

    it('returns array with the reason', () => {
      expect(m.extractLeft()).to.deep.equal([1]);
    });

  });

  describe('#toString()', () => {

    it('returns the code to create the RejectAfter', () => {
      expect(m.toString()).to.equal('Future.rejectAfter(20, 1)');
    });

  });

});