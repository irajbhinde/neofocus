import { useEffect, useState } from "react";
import { useOnboardingContext } from "../../context/user-context";
import "../focus/focus.css";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";

export default function Focus() {
  const [focus, setFocus] = useState("");
  const [editFlag, setEditFlag] = useState({
    editing: false,
  });
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [actionType, setActionType] = useState("unchecked");
  const { userDetails, setUserDetails } = useOnboardingContext();
  const { todoStatus, onboardingStatus } = userDetails;
  const todoHandler = () => {
    localStorage.removeItem("focusContent");
    localStorage.setItem("focusContent", focus);
    setUserDetails({
      ...userDetails,
      todoStatus: true,
    });
    setEditFlag(editFlag.editing === false);
    setDeleteFlag(false);
    setActionType("unchecked");
  };

  const deleteHandler = () => {
    setFocus("");
    setDeleteFlag(true);
  };

  const editHandler = () => {
    setEditFlag({
      editing: true,
    });
  };

  useEffect(() => {
    if (todoStatus) {
      const getFocusContent = async () => {
        try {
          const ObjectContent = localStorage.getItem("focusContent");
          setFocus(ObjectContent);
        } catch (error) {
          console.log(error);
        }
      };
      getFocusContent();
    }
  }, []);

  const focusKeyHandler = (e) => {
    if (e.key === "Enter") {
      todoHandler();
    }
  };
  const FocusContent = (
    <>
      <p className="focus-text">Todays Focus</p>
      <span className="focus-content">
        <CheckBoxOutlineBlank onClick={() => setActionType("checked")} />{" "}
        {focus}
        <span className="unchecked-icons">
          <EditIcon onClick={editHandler} />{" "}
          <DeleteIcon onClick={deleteHandler} />
        </span>
      </span>
    </>
  );
  const EditComponent = (
    <div className="edit-container">
      <input
        onKeyPress={(e) => focusKeyHandler(e)}
        value={focus}
        type="text"
        className="user-input"
        onChange={(e) => setFocus(e.target.value)}
      />
      <div className="btn-container">
        <button
          disabled={focus === ""}
          onClick={todoHandler}
          className="btn-setfocus"
        >
          Set Focus
        </button>
      </div>
    </div>
  );

  const CheckedComponent = (
    <>
      <p className="focus-text">Todays Focus</p>
      <span className="focus-content">
        <CheckBoxIcon onClick={() => setActionType("unchecked")} />
        <span className="line-through">{focus}</span>
        <span className="new-task">
          <AddIcon />{" "}
          <span onClick={deleteHandler} className="new-task-text">
            Add a New Focus
          </span>
        </span>
      </span>
      <p className="checked-msg">Great Job!</p>
    </>
  );

  const SetFocusComponent = (
    <>
      <p className="todo">What's your main focus for today ?</p>
      <input
        onKeyPress={(e) => focusKeyHandler(e)}
        onChange={(e) => setFocus(e.target.value)}
        className="user-input"
        type="text"
      />
      <div className="btn-container">
        <button
          disabled={focus === ""}
          onClick={todoHandler}
          className="btn-setfocus"
        >
          Set Focus
        </button>
      </div>
    </>
  );

  return (
    <div>
      {onboardingStatus ? (
        <div className="todo-container">
          {todoStatus ? (
            <>
              {actionType === "unchecked" ? (
                <>
                  {editFlag.editing
                    ? EditComponent
                    : deleteFlag
                    ? SetFocusComponent
                    : FocusContent}
                </>
              ) : (
                <>{deleteFlag ? SetFocusComponent : CheckedComponent}</>
              )}
            </>
          ) : (
            <>{SetFocusComponent}</>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
