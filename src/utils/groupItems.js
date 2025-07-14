export const groupItems = (items, size) => {
    const groups = [];
    for (let i = 0; i < items.length; i += size) {
        groups.push(items.slice(i, i + size));
    }
    return groups;
};
export const groupFixedItems = (items, size) => {
    const groups = [];

    if (items.length <= size) {
        groups.push(items);
        return groups;
    }

    let index = 0;
    while (true) {
        const group = [];


        for (let i = 0; i < size && index < items.length; i++, index++) {
            group.push(items[index]);
        }


        let j = 0;
        while (group.length < size) {
            group.push(items[j % items.length]);
            j++;
        }

        groups.push(group);


        if (index >= items.length) break;
    }

    return groups;
};
