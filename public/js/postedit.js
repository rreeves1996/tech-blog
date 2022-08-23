const editPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#edit-post-title-input').value.trim();
    const text = document.querySelector('#edit-post-content-input').value.trim();
    const id = event.target.getAttribute('data-id');

    if(title && text && id) {
        const response = await fetch(`/update-post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text, id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#edit-post-submit').addEventListener('click', editPost);