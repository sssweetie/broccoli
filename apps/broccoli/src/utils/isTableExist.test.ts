import { describe, expect, it } from '@jest/globals';
import { isTableExist } from './isTableExist';
import { Table } from 'apps/libs/types/src';

describe('is table exist', () => {
  const table: Table = {
    _id: '123',
    title: '123',
    tasks: [],
    order: 0,
  };
  it('should return false with 0 args', () => {
    expect(isTableExist()).toBe(false);
  });

  it('should return true with table arg', () => {
    expect(isTableExist(table)).toBe(true);
  });
});
