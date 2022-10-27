async function newFormHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('#post_title').value;
    const description = document.querySelector('#description').value;
    const user_name = document.querySelector('#user_name').value;

    const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            description,
            guest_name,
            user_name,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add post');
    }
}

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
