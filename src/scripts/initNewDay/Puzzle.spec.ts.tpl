import { describe, expect, it } from 'vitest';

import readFile from "../../utils/readFile";

import { first, second } from "./Puzzle";

describe('Puzzle 1', () => {
    it('solves part 1', async () => {
        const input = await readFile(`./input1.txt`);
        expect(first(input)).toBe(/* TODO: first solution */);
    });

    it('solves part 2', async () => {
        const input = await readFile(`./input2.txt`);
        expect(second(input)).toBe(/* TODO: second solution */
    })
});