document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    $('#registrationForm').on('submit', function(event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const dob = $('#dob').val();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toastr.error('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            toastr.error('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            toastr.error('Passwords do not match.');
            return;
        }

        const dobDate = new Date(dob);
        const currentDate = new Date();
        if (dobDate >= currentDate) {
            toastr.error('Please enter a valid date of birth.');
            return;
        }

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                toastr.success('Registration successful!');
                $('#registrationForm')[0].reset();
            },
            error: function() {
                toastr.error('An error occurred. Please try again.');
            }
        });
    });
});