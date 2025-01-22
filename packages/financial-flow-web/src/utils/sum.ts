interface Entry {
    [key: string]: Entry | number;
}

export const sum = (item: Entry): number => {
    return Object.values(item).reduce<number>((acc, curr) => {
        if (typeof curr === 'number') {
            return acc + curr;
        } else if (typeof curr === 'object') {
            return acc + sum(curr);
        }
        return acc;
    }, 0);
}