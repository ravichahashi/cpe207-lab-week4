// 1. Book Class: Represents a Book
class Input {
    constructor(name, email, subj, msg) {
        this.name = name;
        this.email = email;
        this.subj = subj;
        this.msg = msg;
    }
}

// 2. UI Class: Handle UI Tasks
class UI {
    static displayInputs() {
        // 3. predefined books
        //     const StoredBooks = [
        //       {
        //         title: 'Book One',
        //         author: 'John Boe',
        //         isbn: '11111111'
        //       },
        //       {
        //         title: 'Book One',
        //         author: 'John Boe',
        //         isbn: '11111111'
        //       }
        //     ];
        //     const books = StoredBooks;

        const inputs = Store.getInputs();

        inputs.forEach((input) => UI.addInputToList(input));
    }

    // 4. add book
    static addInputToList(input) {
        const list = document.querySelector('#inputList');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${input.name}</td>
        <td>${input.email}</td>
        <td>${input.subj}</td>
        <td>${input.msg}</td>
        <td><a href="#" class="button small delete"> X </a></td>
      `;

        list.appendChild(row);
    }

    // 11. delete book  
    static deleteInput(el) {
        // if element contains .delete class
        if (el.classList.contains('delete')) {
            // remove <a> -> <td> -> <tr>       
            el.parentElement.parentElement.remove();
        }
    }

    // 13. show alert  
    // <div class="alert alert-success/alert-danger>Message</div>
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#inputForm');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // 9. clear fields  
    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#subject').value = '';
        document.querySelector('#message').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getInputs() {
        let inputs;
        if (localStorage.getItem('inputs') === null) {
            inputs = [];
        } else {
            inputs = JSON.parse(localStorage.getItem('inputs'));
        }

        return inputs;
    }

    static addInput(input) {
        const inputs = Store.getInputs();
        inputs.push(input);
        localStorage.setItem('inputs', JSON.stringify(inputs));
    }

    static removeInput(subj) {
        const inputs = Store.getInputs();
        console.log(inputs);
        inputs.forEach((input, index) => {
            console.log(index);
            if (input.subj === subj) {
                inputs.splice(index, 1);
            }
        });
        console.log(inputs);
        localStorage.setItem('inputs', JSON.stringify(inputs));
    }
}

// 4. Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayInputs);

// 5. Event: Add a Book
document.querySelector('#inputForm').addEventListener('submit', (e) => {
    // 7. Prevent actual submit action
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subj = document.querySelector('#subject').value;
    const msg = document.querySelector('#message').value;

    // 12. Validate
    if (name === '' || email === '' || subj === '' || msg === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // 6. Instatiate book
        const input = new Input(name, email, subj, msg);
        // console.log(book);

        // 8. Add Book to UI
        UI.addInputToList(input);

        // Add book to store
        Store.addInput(input);

        // 13. Show success message
        UI.showAlert('Input Added', 'success');

        // 9. Clear fields
        UI.clearFields();
    }
});

// 10. Event: Remove a Book - event propagation by selecting the parent
document.querySelector('#inputList').addEventListener('click', (e) => {
    console.log(e.target);

    // 11. Remove book from UI
    UI.deleteInput(e.target);

    // Remove book from store
    console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    Store.removeInput(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    // 13. Show success message
    UI.showAlert('Input Removed', 'success');
});
