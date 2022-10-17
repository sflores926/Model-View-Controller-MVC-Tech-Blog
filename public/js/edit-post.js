const editPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#post-desc').value.trim();

    const post = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts/${id}', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the post page
            document.location.reload('/post/${id}');
        } else {
            alert('failed to edit post');
        }
    }
};

document
    .querySelector('.edit-post')
    .addEventListener('click', delButtonHandler);