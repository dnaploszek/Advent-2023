import { describe, expect, it } from 'vitest';
import readFile from './readFile';
import { split } from './split';

describe('split', () => {
  it('splits a string on new lines', async () => {
    const input = await readFile(`${__dirname}/test.txt`);
    const data = split(input);
    expect(data.length).toEqual(4);

    expect(data[0]).toEqual('1abc2');
    expect(data[1]).toEqual('pqr3stu8vwx');
    expect(data[2]).toEqual('a1b2c3d4e5f');
    expect(data[3]).toEqual('treb7uchet');
  });
});
