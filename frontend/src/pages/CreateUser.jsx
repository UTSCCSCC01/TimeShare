import React from 'react';
export const CreateUser = () => {
    return (

        <div>
        <form action="localhost:5000" method="POST">
            <label>
                username:
                <input type="text" name="username" />
            </label>
            <label>
                email:
                <input type="text" name="useremail" />
            </label>
            <label>
                password:
                <input type="text" name="password" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </div>
        );
}