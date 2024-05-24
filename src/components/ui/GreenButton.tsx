type Props = {
  name: string;
};

export const GreenButton = ({ name }: Props) => {
  return (
    <>
      <button className="green-button">{name}</button>
    </>
  );
};
