export default function formatName(name: string): string {
    if (!name) return '';
    // Replace spaces in the album name with hyphens and encode it
    const name_after = name
    .replace(/ /g, '-') // 1. Replace spaces with hyphens
    .replace(/[&]/g, 'and') // 2. Replace '&' with 'and'
    .replace(/[^a-zA-Z0-9ÄÖäöâôÂÔüÜß-]/g, ''); // 3. Clean non-alphanumeric characters
    return name_after;
} // 4. Return the formatted name
