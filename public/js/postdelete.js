const deletePost = async (event) => {
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

document.querySelector('#delete-button').addEventListener('click', deletePost);