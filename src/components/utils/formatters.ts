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

// 'YYYY-MM-DD' to 'YYYY'
export const getYearFromDateString = (dateString: string): string => {
  const parts = dateString.split("-");
  return parts[0];
}

// 'YYYY-MM-DD' to 'MM'
export const getMonthFromDateString = (dateString: string): string => {
  const parts = dateString.split("-");
  return parts[1];
}

// 'YYYY-MM-DD' to 'YYYY년 MM월 DD일 W요일'
export const dateParse = (date: string): string => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const dayOfWeek = dateObject.getDay();

  const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayName = daysOfWeek[dayOfWeek];

  return `${year}년 ${month}월 ${day}일 ${dayName}`;
};

// 'YYYYMMDD' to 'YYYY-MM-DD'
export const goalDateParse = (date:string):string => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  
  return `${year}-${month}-${day}`;
};
