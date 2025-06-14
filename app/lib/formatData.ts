export function formatShortDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}.${month}`;
}

export function formatFullDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" }); // e.g. June
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}