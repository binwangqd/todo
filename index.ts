import { TodoItem} from "./todoItem"
import { TodoCollection} from "./todoCollection"

let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true)
]

let collection = new TodoCollection("Adam", todos);