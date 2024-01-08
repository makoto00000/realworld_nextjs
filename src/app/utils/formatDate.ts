export const formatDate = (dateString: string) => {
  const getOrdinal = (n: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };
  const date = new Date(dateString);
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = getOrdinal(date.getDate());
  const formattedDate = `${month} ${day}`;
  return formattedDate;
};