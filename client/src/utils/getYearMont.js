export function getYearMonth(timestamp){
    const now = new Date(timestamp);
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = new Date(year, month, 1)
    return date
}