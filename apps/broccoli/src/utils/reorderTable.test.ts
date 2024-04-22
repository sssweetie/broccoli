import { describe, expect, it } from '@jest/globals';
import { reorderTable } from './reorderTable';
import { Table } from 'apps/libs/types/src';

describe('reordering table tasks', () => {
  const table: Table = {
    _id: '123',
    order: 0,
    title: 'Test Table',
    tasks: [
      { _id: '1', order: 1 },
      { _id: '2', order: 4 },
      { _id: '3', order: 2 },
    ],
  };

  const table1: Table = {
    _id: '123',
    order: 0,
    title: 'Test Table',
    tasks: [],
  };

  const table2: Table = {
    _id: '123',
    order: 0,
    title: 'Test Table',
    tasks: [
      { _id: '1', order: 1 },
      { _id: '2', order: 1 },
      { _id: '3', order: 1 },
    ],
  };

  it('should reorder tasks in the table', () => {
    const expectedOrder = Array.from(
      { length: table.tasks.length },
      (_, i) => i
    ).toString();

    reorderTable(table);
    const actualOrder = table.tasks.map((task) => task.order).toString();
    expect(actualOrder).toEqual(expectedOrder);
  });

  test('empty tasks return empty array', () => {
    const expectedOrder = Array.from(
      { length: table1.tasks.length },
      (_, i) => i
    ).toString();

    reorderTable(table1);
    const actualOrder = table1.tasks.map((task) => task.order).toString();
    expect(actualOrder).toEqual(expectedOrder);
  });

  it('should reorder tasks with different order indexes', () => {
    const expectedOrder = Array.from(
      { length: table2.tasks.length },
      (_, i) => i
    ).toString();

    reorderTable(table2);
    const actualOrder = table2.tasks.map((task) => task.order).toString();
    expect(actualOrder).toEqual(expectedOrder);
  });
});
