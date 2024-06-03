import { TopLine } from "../../../components/ui/TopLine";

const accounts = [
  { id: 1, number: "1001-2222-33333" },
  { id: 2, number: "302-1236-405-81" },
  { id: 3, number: "2339-102-59-30480" },
  { id: 4, number: "223-33004-1654" },
  { id: 4, number: "1203-265-965-654" },
];

type Props = {
  count: number;
  number: string;
};

const Account = ({ count, number }: Props) => {
  return (
    <>
      <div className="flex p-4 mb-2 border rounded-lg shadow-sm bg-white items-center">
        <span className="text-sm text-customGreen font-bold">적금 {count}</span>
        <span className="ml-5">{number}</span>
      </div>
    </>
  );
};

export const AccountSavingList = () => {
  return (
    <>
      <div>
        <TopLine name={"적금 설정"} />
        <div className="m-10">
          <span className="text-xl font-hana-m">적금 통장</span>
          <div className="mt-4 space-y-4">
            {accounts.map((account, count) => (
              <Account
                key={account.id}
                count={count + 1}
                number={account.number}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
