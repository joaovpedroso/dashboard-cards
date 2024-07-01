const formatDate = (date: string): string =>
    new Date(`${date} 00:00:00`).toLocaleDateString("pt-BR");


export { formatDate };