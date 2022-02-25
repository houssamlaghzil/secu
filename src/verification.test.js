import {generateNumber} from "./verification";

test('generated number is > 0', () => {
    expect(generateNumber())
        .toBeGreaterThanOrEqual(0);
});

test('generated number is < 9999', () => {
    expect(generateNumber())
        .toBeLessThanOrEqual(9999);
});

