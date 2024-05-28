import { useState } from 'react';
import { GreenButton } from '../../../components/ui/GreenButton';
import { TopLine } from '../../../components/ui/TopLine';

type Account = {
  id: number;
  accountNumber: string;
};

export const AccountOpenUpdatePage = () => {
  const accountList: Account[] = [
    { id: 1, accountNumber: '111-22222-33333' },
    { id: 2, accountNumber: '2339-102-59-30408' },
    { id: 3, accountNumber: '302-1236-4057-81' },
    { id: 4, accountNumber: '1111-222-33333' },
    { id: 5, accountNumber: '223-3004-100558' },
  ];

  const [selectedAccounts, setSelectedAccounts] = useState<{
    salary: number | null;
    saving: number | null;
    spending: number | null;
    reserve: number | null;
  }>({
    salary: null,
    saving: null,
    spending: null,
    reserve: null,
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const value = parseInt(event.target.value, 10);
    setSelectedAccounts({
      ...selectedAccounts,
      [type]: value,
    });
  };

  const getFilteredAccounts = (excludeType: string) => {
    const selectedIds = Object.keys(selectedAccounts)
      .filter((key) => key !== excludeType)
      .map((key) => selectedAccounts[key as keyof typeof selectedAccounts])
      .filter((id) => id !== null);
    
    return accountList.filter((account) => !selectedIds.includes(account.id));
  };

  return (
    <>
      <div>
        <TopLine name={'계좌 설정'} />
        <div className="m-10">
          <h3 className="text-lg font-bold mt-10">입출금 통장</h3>
          <div className="mt-8">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💸 월급 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">계좌</div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.salary || ''}
                    onChange={(e) => handleSelectChange(e, 'salary')}
                  >
                    <option value="" disabled>
                      선택하세요
                    </option>
                    {getFilteredAccounts('salary').map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.accountNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💰 저축 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">계좌</div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.saving || ''}
                    onChange={(e) => handleSelectChange(e, 'saving')}
                  >
                    <option value="" disabled>
                      선택하세요
                    </option>
                    {getFilteredAccounts('saving').map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.accountNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💳 소비 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">계좌</div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.spending || ''}
                    onChange={(e) => handleSelectChange(e, 'spending')}
                  >
                    <option value="" disabled>
                      선택하세요
                    </option>
                    {getFilteredAccounts('spending').map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.accountNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💡 예비 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">계좌</div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.reserve || ''}
                    onChange={(e) => handleSelectChange(e, 'reserve')}
                  >
                    <option value="" disabled>
                      선택하세요
                    </option>
                    {getFilteredAccounts('reserve').map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.accountNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <GreenButton name={'확인'} path={''} />
          </div>
        </div>
      </div>
    </>
  );
};
