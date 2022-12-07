import spinner from './assets/spinner.gif';

function Spinner() {
  return (
    <div className="mt-20">
      <img
        src={spinner}
        className="mx-auto text-center"
        width="180"
        alt="Loading..."
      />
    </div>
  );
}

export default Spinner;
