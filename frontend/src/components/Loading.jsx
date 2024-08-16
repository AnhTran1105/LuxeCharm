import BeatLoader from "react-spinners/BeatLoader";

function Loading({ loading }) {
  return (
    <div className="sweet-loading">
      <BeatLoader
        cssOverride={{ display: "flex", justifyContent: "center" }}
        color="#121212"
        loading={loading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
        loader
      />
    </div>
  );
}

export default Loading;
