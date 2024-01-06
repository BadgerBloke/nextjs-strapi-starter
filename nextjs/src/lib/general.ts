export const slugify = (str?: string): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export const shortDate = (inputDateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
    const inputDate: Date = new Date(inputDateStr);
    return inputDate.toLocaleDateString('en-US', options);
};

export const formatDate = (inputDateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const inputDate: Date = new Date(inputDateStr);
    return inputDate.toLocaleDateString('en-US', options);
};

export const getAvatarText = (name: string) => {
    return name.split(' ').length > 1 ? name.split(' ')[0][0] + name.split(' ')[1][0] : name[0] + name[name.length - 1];
};
