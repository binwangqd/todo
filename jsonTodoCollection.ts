import {TodoItem} from "./todoItem";
import {TodoCollection} from "./todoCollection";
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

type schemaType ={
    tasks: {id:number; task: string; complete: boolean}[]
};

export class JsonTodoCollection extends TodoCollection{
    private database: lowdb.LowdbSync<schemaType>;


    constructor(public userName: string, todoItems: TodoItem[] = []) {
        super(userName, []);
        this.database = lowdb(new FileSync("Todos.json"));
        if (this.database.has("tasks").value())  {
            let dbItems = this.database.get("tasks").value();
            dbItems.forEach(item => this.itemMap.set(item.id, 
                new TodoItem(item.id, item.task, item.complete)));
        } else {
            this.database.set("tasks", todoItems).write();
            todoItems.forEach(item => this.itemMap.set(item.id, item));
        }
    }

    addTodo(task:string):number{
        let result = super.addTodo(task);
        this.storeTask();
        return result;
    }

    markComplete(id:number, complete:boolean):void{
        super.markComplete(id,complete);
        this.storeTask();
    }

    removeComplete():void{
        super.removeComplete();
        this.storeTask();
    }

    private storeTask(){
        this.database.set("tasks", [...this.itemMap.values()]).write();
    }
}