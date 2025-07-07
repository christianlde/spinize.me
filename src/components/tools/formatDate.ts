export function formatDate(date: string, option: string = 'ymdhis'): string {
    // Option is a string containing combinations like:
    // 'y' = year
    // 'm' = month
    // 'd' = day
    // 'h' = hour
    // 'i' = minute
    // 's' = second

    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    let formattedDate = '';

    for (let i = 0; i < option.length; i++) {
        switch (option[i]) {
            case 'y':
                formattedDate += `${year} `;
                break;
            case 'm':
                formattedDate += `${month} `;
                break;
            case 'd':
                formattedDate += `${day} `;
                break;
            case 'h':
                formattedDate += `${hours}h `;
                break;
            case 'i':
                formattedDate += `${minutes}m `;
                break;
            case 's':
                formattedDate += `${seconds}s `;
                break;
            default:
                break;
        }
    }

    // Trim any trailing spaces
    return formattedDate.trim();
}
