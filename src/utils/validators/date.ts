export const isValidDate = (date: string) => {
    const newDate = new Date(date);
    const dateNow = new Date(Date.now());
    return newDate < dateNow ;
};