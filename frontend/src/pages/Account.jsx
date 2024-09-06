import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

function Account() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[478px] py-9 px-[15px] text-center">
        <h1 className="text-[40px]">Account</h1>
        <div>
          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="group leading-5 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              id="logout"
            >
              <path
                className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                fillRule="evenodd"
                d="M3 12.5h12v-1H3v1Z"
                clipRule="evenodd"
              ></path>
              <path
                className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                fillRule="evenodd"
                d="m6.146 8.146-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5.708-.707L3.707 12l3.147-3.146-.708-.708zM8.5 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v16a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5v-3h1v2.5h11v-15h-11V7h-1V4z"
                clipRule="evenodd"
              ></path>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
