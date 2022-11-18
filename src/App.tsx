import React, {useState} from 'react';
import Nav from "./components/Nav";
import './style/Main.scss'
import TodoItem from "./components/TodoItem";


const App:React.FC = () => {

    class item {
        uuid: string;
        title: string;
        checked: boolean = false;
        constructor(uuid: string,title: string, checked: boolean) {
            this.uuid = uuid;
            this.title = title;
            this.checked = checked
        }

    }

    const [todoList, setTodoList] = useState<Array<any>>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const init = () => {
        if (localStorage.getItem('todoList') != null) {
            setTodoList(JSON.parse(localStorage.getItem('todoList') || '[]'));
        }
    }

    const uuid = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const saveTodoList = () => {
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }

    const addItems = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputValue.length >= 4) {
            todoList.unshift(new item(uuid(), inputValue, false))
            setInputValue('')
            saveTodoList()
        }
    }

    const deleteItem = (uuid: string) => {
        let index = todoList.findIndex((item: any) => item.uuid === uuid)
        todoList.splice(index, 1)
        setTodoList([...todoList])
        saveTodoList()
    }

    const editItem = (uuid: string, content: string, isCheck: boolean) => {
        const newList = todoList.map((item: item) => {
            if (item.uuid === uuid) {
                item.title = content;
                item.checked = isCheck
            }
            return item
        })
        setTodoList(newList)
        saveTodoList()
    }


    React.useEffect(() => { init() }, [])


    return (
        <div className="App" id='App'>
            <Nav />
            <main className='main flex-row flex-justify-center'>
                <section className='todo'>
                    <h1 className='todo__title'>Welcome back, Stan</h1>
                    { todoList.length > 0 && <h2 className='todo__subtitle'>You've got {todoList.length} tasks to perform</h2> }
                    { todoList.length === 0 && <h2 className='todo__subtitle'>Nothing</h2> }
                    <div className='todo__wrapper'>
                        <form
                            className="todo__wrapper__head flex-row flex-align-center"
                            onSubmit={ (e) => { addItems(e) } }
                        >
                            <input type='checkbox'/>
                            <input
                                type='text'
                                value={inputValue}
                                placeholder='Add a new task...'
                                onChange={ (e) => { handleInput(e) } }
                            />
                        </form>
                        <div className="todo__wrapper__items">
                            {
                                todoList.map((item, index) => {
                                    return (
                                        <TodoItem
                                            key={item.uuid}
                                            title={item.title}
                                            checked={item.checked}
                                            uuid={item.uuid}
                                            deleteItem={ (uuid: string) => { deleteItem(uuid) } }
                                            editItem={ (uuid: string, content: string, isCheck:boolean) => { editItem(uuid, content, isCheck) } }
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
