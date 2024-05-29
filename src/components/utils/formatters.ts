export const addCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const currentTime = (): string => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${hours}:${formattedMinutes}`;
}