'use strict';

const todoControl = document.querySelector('.todo-control'),
        headerInput = document.querySelector('.header-input'),
        todoList = document.querySelector('.todo-list'),
        todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = function(){
    let tempArray = JSON.parse(localStorage.getItem(1));
    for(let key in tempArray){
        todoData.push(tempArray[key]);
    }
    
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value +'</span>' +
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' + 
            '</div>';
        if(item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnToDoRemove = li.querySelector('.todo-remove');
        btnToDoRemove.addEventListener('click', function(){
            let elem = this.parentNode.parentNode;
            elem.parentNode.removeChild(elem);
            render();
        });
        
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== ''){
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
    
        todoData.push(newTodo);
        let string = JSON.stringify(todoData);
        localStorage.setItem(1, string);
        headerInput.value = '';
        render();
    } else {
        alert('строка ввода не должна быть пустой!');
        return;
    }
    
});

render();