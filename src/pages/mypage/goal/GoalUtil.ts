// yyyy-mm-dd 형식을 yyyymmdd 형식으로 변환하는 함수
export const formatDateToYyyymmdd = (dateString: string): string => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const dd = date.getDate().toString().padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
};

// yyyymmdd 형식을 yyyy-mm-dd 형식으로 변환하는 함수
export const formatDateToYyyyMmDd = (dateString: string): string => {
  const yyyy = dateString.slice(0, 4);
  const mm = dateString.slice(4, 6);
  const dd = dateString.slice(6, 8);
  return `${yyyy}-${mm}-${dd}`;
};
