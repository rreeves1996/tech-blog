const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title-input').value.trim();
    const text = document.querySelector('#post-content-input').value.trim();

    console.log(title);
    console.log(text);


    if(title && text) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

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


document.querySelector('#new-post-submit').addEventListener('click', newPost);
document.querySelector('#delete-button').addEventListener('click', deletePost);