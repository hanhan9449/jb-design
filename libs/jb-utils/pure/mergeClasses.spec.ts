import {test, describe, expect} from "vitest";
import {mergeClasses} from "./mergeClasses";

describe('mergeClasses work nice!', function () {
    test('normal string args work', () => {
        expect(mergeClasses('1', '2', '3')).toEqual('1 2 3');
    })

    test('conditional string args work', () => {
        expect(mergeClasses('1', false, '2', false, '3', false)).toEqual('1 2 3');
    })

    test('all falsy args work', () => {
        expect(mergeClasses('', false, false, false, false, false, '')).toEqual('')
    })
});