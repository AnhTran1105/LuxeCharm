import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ConfirmModal from "../../components/ConfirmModal";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loading/loadingSlice";
import { sendMessage } from "../../redux/notification/notificationSlice";

function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkingVisible, setCheckingVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const userResponse = await axios.get("/users");
        setUsers(userResponse);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isRefresh]);

  const onSubmit = async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete("/users", {
        data: { userIds: selectedIds },
      });
      dispatch(sendMessage({ message: response.message, type: "success" }));
      setIsRefresh(!isRefresh);
    } catch (error) {
      dispatch(sendMessage({ message: error.messsage, type: "error" }));
    } finally {
      setSelectedIds([]);
      setCheckingVisible(false);
      dispatch(stopLoading());
    }
  };

  return (
    users && (
      <div className="my-10 flex flex-col gap-5 px-[50px]">
        <div className="flex gap-4 justify-between">
          <div className="flex gap-4">
            <a className="button" href="/users/create-user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                className="fill-color-foreground mr-2"
                id="add"
              >
                <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              <span>Create new user</span>
            </a>
            <button
              className="button"
              onClick={() => setCheckingVisible(!checkingVisible)}
            >
              {!checkingVisible ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-color-foreground mr-2"
                    id="check"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                  </svg>
                  <span>Select users</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    className="fill-color-foreground mr-2"
                    id="close"
                  >
                    <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                  <span>Unselect users</span>
                </>
              )}
            </button>
          </div>
          <button
            className={`button ${
              selectedIds.length > 0 ? "visible" : "invisible"
            }`}
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 60 60"
              width={24}
              height={24}
              viewBox="0 0 60 60"
              id="delete"
              className="fill-color-foreground mr-2"
            >
              <path
                d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1
	h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2
	c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6
	h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z"
              ></path>
              <path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z"></path>
            </svg>
            <span>
              {selectedIds.length > 1
                ? `Delete ${selectedIds.length} Users`
                : "Delete 1 user"}
            </span>
          </button>
        </div>
        <ConfirmModal
          title="Delete Users"
          description="Are you sure you want to delete these users?"
          onValueChange={setIsModalOpen}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSubmit={onSubmit}
        />
        <table id="table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              {checkingVisible && <th>Select</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                onClick={() => {
                  if (!checkingVisible)
                    window.location.href =
                      window.location.origin + `/users/${user._id}`;
                }}
                className="cursor-pointer text-foreground75 hover:text-color-foreground"
              >
                <td>{index + 1}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                {checkingVisible && (
                  <td className="relative">
                    <div
                      className="flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                      onClick={() => {
                        if (selectedIds.includes(user._id)) {
                          const arr = selectedIds.filter(
                            (id) => id !== user._id
                          );
                          setSelectedIds(arr);
                        } else {
                          setSelectedIds([...selectedIds, user._id]);
                        }
                      }}
                    >
                      <i className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          enableBackground="new 0 0 512 512"
                          viewBox="0 0 512 512"
                          id="square"
                        >
                          <path
                            d="M486.468,491.821H26.47c-3.977,0-7.202-3.224-7.202-7.201V28.317c0-3.978,3.225-7.201,7.202-7.201h459.998
    				c3.978,0,7.201,3.224,7.201,7.201V484.62C493.669,488.598,490.445,491.821,486.468,491.821z M33.671,477.419h445.595v-441.9
    				H33.671V477.419z"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className={`absolute fill-color-foreground top-0 left-0 ${
                            selectedIds.some((id) => id === user._id)
                              ? "opacity-100"
                              : "opacity-0"
                          } transition-opacity duration-100 ease-linear`}
                          id="check"
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                        </svg>
                      </i>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Users;
