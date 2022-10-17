const commentFormHandler = async (event) => {
    event.preventDefault();


    const comment = document.querySelector('#comment').value.trim();
    const post = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post, comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the post page
            document.location.reload();
        } else {
            alert('failed to create comment');
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);