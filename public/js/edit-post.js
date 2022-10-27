async function editFormHandler(event) {
    event.preventDefault();
    const post_title = document.querySelector('#post_title').value;
    const description = document.querySelector('#description').value;
    const user_name = document.querySelector('#user_name').value;


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
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
        document.location.replace(`/post/${id}`);
    } else {
        alert('Failed to edit dish');
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
