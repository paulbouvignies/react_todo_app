import React from "react";
import '../style/TodoItem.scss'
import {Simulate} from "react-dom/test-utils";

type TodoItemProps = {
    title: string;
    uuid: string;
    deleteItem: (uuid: string) => void;
    editItem: (uuid: string, content: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {

    const { title, uuid } = props;

    const [isCheck, setIsCheck] = React.useState<boolean>(false);

    const deleteItem = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        props.deleteItem(uuid)
    }

    const editItem = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        let content:string = '';
        props.editItem(uuid, content)
    }

    const selectItem = () => {
        setIsCheck(!isCheck)
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
                    readOnly={ true }
                    value={title}
                />
            </div>
            <button
                className="todoItem__delete flex-row flex-center"
                onClick={ (e) => { deleteItem(e) } }
            >
                <i className=" todoItem__delete__icon fa-solid fa-trash"></i>
            </button>
            <button
                className="todoItem__edit flex-row flex-center"
                onClick={ (e) => { editItem(e) } }
            >
                <i className=" todoItem__delete__icon fa-solid fa-pen"></i>
            </button>
        </div>
  );
}
export default TodoItem;