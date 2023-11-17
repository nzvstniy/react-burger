import { CircleLoader  } from 'react-spinners';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
}

function Preload() {
  return (
          <CircleLoader 
            color={"#c33ceb"}
            cssOverride={override}
            size={150}
            aria-label="isLoading Spinner"
            data-testid="load"
          />
  );
}


export default Preload;