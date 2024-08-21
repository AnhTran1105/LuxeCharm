function ArrowNext(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "rgba(255,255,255,1)",
        opacity: "",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px",
        borderRadius: "999px",
      }}
      onClick={onClick}
    >
      <svg
        className="h-4 w-4 rotate-[-90deg]"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 22 13"
      >
        <polyline
          points="21.557 1.222 11 11.778 0.443 1.222"
          fill="none"
          stroke="#121212"
          strokeMiterlimit="10"
        ></polyline>
      </svg>
    </div>
  );
}

export default ArrowNext;
