import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";

const accounts = [
  { id: 1, number: "1001-2222-33333", state: "월급" },
  { id: 2, number: "302-1236-405-81", state: "생활" },
  { id: 3, number: "2339-102-59-30480", state: "저축" },
  { id: 4, number: "223-33004-1654", state: "예비" },
  { id: 4, number: "1203-265-965-654", state: "null" },
];

type Props = {
  count: number;
  number: string;
  state: string;
};

const Account = ({ count, number, state }: Props) => {
  return (
    <>
      <div className="flex p-4 mb-2 border rounded-lg shadow-sm bg-white">
        <span className="text-sm text-customGreen font-bold">계좌 {count}</span>
        <span className="ml-5">{number}</span>
        {state !== "null" && (
          <span className="ml-auto px-2 py-1 text-sm text-white bg-lime-500 rounded">
            {state}
          </span>
        )}
      </div>
    </>
  );
};

export const AccountOpenList = () => {
  return (
    <>
      <div>
        <TopLine name={"입출금 통장 설정"} />
        <div>
          <div className="m-10">
            <span className="text-xl font-bold">입출금 통장</span>
            <div className="mt-4 space-y-4">
              {accounts.map((account, count) => (
                <Account
                  key={account.id}
                  count={count + 1}
                  number={account.number}
                  state={account.state}
                />
              ))}
            </div>
            <div className="mt-10">
              <GreenButton path={"update"} name={"수정하기"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
