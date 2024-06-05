interface AccountAutoDebitAdjustGetResponse {
  accountId: number;
  accountType: string;
  accountNumber: string;
  accountAutoDebitId: number;
  autoDebitAmount: number;
}

interface UserGetResponse {
	userId: number;
	email: string;
	sex: string;
	age: number;
	qualificationTypeCd: string; 
	cityTypeCd: string;
	nickname: string;
	salary: number;
	salaryDay: number;
}

interface AccountGetResponse {
  accountId: number;
  accountNumber: string;
  accountTypeCd: string;
}
