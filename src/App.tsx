import React, {forwardRef} from 'react';
import Nav from "./components/Nav";
import './style/Main.scss'
import TodoItem from "./components/TodoItem";

const App:React.FC = () => {

    class item {
        uuid: string;
        title: string;
        constructor(uuid: string,title: string) {
            this.uuid = uuid;
            this.title = title;
        }

    }

    const [todoList, setTodoList] = React.useState<Array<any>>([]);
    const [inputValue, setInputValue] = React.useState<string>('');

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
            todoList.push(new item(uuid(), inputValue))
            setInputValue('')
            saveTodoList()
        }
    }

    const deleteItem = (uuid: string) => {
        const index = todoList.findIndex((item: any) => item.uuid === uuid)
        todoList.splice(index, 1)
        setTodoList([...todoList])
        saveTodoList()
    }

    const editItem = (uuid: string, content: string) => {
        console.log(uuid, content)
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
                                            key={`itemValue-${index}`}
                                            title={item.title}
                                            uuid={item.uuid}
                                            deleteItem={ (uuid: string) => { deleteItem(uuid) } }
                                            editItem={ (uuid: string, content: string) => { editItem(uuid, content) } }
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
