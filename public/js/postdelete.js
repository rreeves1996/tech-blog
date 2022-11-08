const deleteButton = document.querySelectorAll('#delete-button');

const deletePost = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`api/post/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert("Couldn't delete post!")
    }
};

deleteButton.forEach((button) => button.addEventListener('click', deletePost));