const todos = localStorage.getItem("todos")
	? JSON.parse(localStorage.getItem("todos"))
	: [];
const ul_container = document.querySelector("#todo_list");
const addBtn = document.querySelector("#btn");
const button_remove = document.querySelector("#remove");
const title_input = document.querySelector("#todo_title");

function render() {
	const ul = document.createElement("ul");
	ul.className = "ul_list";

	todos.forEach((todo, index) => {
		ul.append(createTodo(todo, index));
	});
	ul_container.innerHTML = ul.innerHTML;
	localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(todo, index) {
	const todoElement = document.createElement("li");
	todoElement.className = "li_holder";
	todoElement.innerHTML = ` <div>
	<input class="${todo.isDone ? "input_checkbox checked" : "input_checkbox"} ${
		todo.isEdit ? "input_checkbox editmod" : "input_checkbox"
	}" type="checkbox" id="${todo.title}" ${
		todo.isDone && "checked"
	} onChange="checkedTodo(${index})">
	<label class="${
		todo.isEdit ? "label_checkbox editmod" : "label_checkbox"
	}" for="${todo.title}">${todo.title}</label>
	<input class="${
		todo.isEdit ? "input_text editmod" : "input_text"
	}" type="text" id="${todo.title}" value = "${todo.title}" >
	</div>
	<div>
	<button class="btn"><i id="edit" class="fa fa-edit" onClick="editTodo(${index})"></i></i></button>
	<button class="btn"><i id="remove" class="fa fa-remove" onClick="removeTodo(${index})"></i></button>
	<button class="btn"><i id="submit_edit" class="fa fa-check""></i></button>
	</div>`;
	return todoElement;
}

document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault();
	if (form.elements[0].value) {
		todos.unshift({ title: form.elements[0].value, isDone: false });
		render();
		form.elements[0].value = "";
	} else alert("Please fill to-do title!");
});

// remove from todos
function removeTodo(index) {
	todos.splice(index, 1);
	render();
}

// add check to todos
function checkedTodo(index) {
	todos[index] = {
		title: todos[index].title,
		isDone: !todos[index].isDone,
	};
	render();
}

function editTodo(index) {
	todos[index].isEdit = !todos[index].isEdit;

	render();
}

function editTodo(index) {
	title_input.value = todos[index].title;
	title_input.addEventListener("submit", (e) => {
		todos[index].title = e.target.value;
		e.preventDefault();
	});
	console.log(index);
}

render();

// title_input.value = todos[index].title;
// document.getElementById("form").addEventListener("submit", () => {
// 	console.log("object");
