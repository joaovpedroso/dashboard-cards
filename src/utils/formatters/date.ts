const formatDate = (date: string): string =>
    new Date(`${date} 00:00:00`).toLocaleDateString("pr-BR");


export { formatDate };