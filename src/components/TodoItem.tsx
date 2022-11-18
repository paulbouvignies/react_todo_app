import React from "react";
import '../style/TodoItem.scss'
import SelectCategories from "./SelectCategorie";

type TodoItemProps = {
    title: string;
    uuid: string;
    checked: boolean;
    deleteItem: (uuid: string) => void;
    editItem: (uuid: string, content: string, isCheck: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {

    const { title, uuid, checked  } = props;

    const [titleState, setTitleState] = React.useState<string>(title);
    const [isCheck, setIsCheck] = React.useState<boolean>(checked);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    const deleteItem = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        props.deleteItem(uuid)
    }

    const editItem = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, state:boolean) => {
        e.stopPropagation();

        if (state) {
            setIsEditing(true)
        }
        else {
            setIsEditing(false)
            props.editItem(uuid, titleState, isCheck)
        }
    }

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitleState(e.target.value)
    }

    const selectItem = () => {
        if (!isEditing){
            setIsCheck(!isCheck)
            props.editItem(uuid, titleState, !isCheck)
        }
    }

    const getClass = () => {
        let className = 'todoItem flex-row flex-align-center';
        if (isCheck) {
            className += ' todoItem--checked'
        }
        return className;
    }

    return (
        <div
            className={ getClass() }
            onClick={ () => { selectItem() } }
        >
            <div className="todoItem__head flex-row flex-align-center">
                <input
                    readOnly={ true }
                    checked={isCheck}
                    className="todoItem__head__checkbox"
                    type="checkbox"
                />
                <input
                    type='text'
                    className="todoItem__head__title"
                    readOnly={ !isEditing }
                    value={titleState}
                    onChange={ (e) => { handleInput(e) } }
                />
            </div>

            { !isEditing &&
                <button
                    className="todoItem__delete flex-row flex-center"
                    onClick={ (e) => { deleteItem(e) } }
                >
                    <i className=" todoItem__delete__icon fa-solid fa-trash"></i>
                </button>
            }
            {!isEditing && !isCheck &&
                <button
                    className="todoItem__edit flex-row flex-center"
                    onClick={(e) => { editItem(e, true) }}
                >
                    <i className=" todoItem__delete__icon fa-solid fa-pen"></i>
                </button>
            }
            { isEditing && !isCheck &&
                <button
                    className="todoItem__delete flex-row flex-center"
                    onClick={(e) => { editItem(e, false) }}
                >
                    <i className=" todoItem__delete__icon fa-solid fa-save"></i>
                </button>
            }
        </div>
  );
}
export default TodoItem;