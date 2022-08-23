const newComment = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-input').value.trim();
    const post_id = event.target.getAttribute('data-id');
    
    console.log(text);
    console.log(post_id);

    if(text && post_id) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ text, post_id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#submit-comment').addEventListener('click', newComment);
