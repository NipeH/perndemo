import React, { useState } from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

export default function InputData() {

    // POSTS NEW DESCRIPTION TO THE DATABASE
    const [description, setDescription] = useState("")

    const submitData = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(response);
        } catch (err) {

            console.error(err.message);
        }
    }

    return (
        <div position="center">
            <InputLabel style={{ marginTop: 20, marginleft: 100}}>Add stuff to the table</InputLabel>
            <Input
                marginBottom="30"
                value={description}
                onChange={e => setDescription(e.target.value)}
                label="description"
                name="description"
                margin="dense"
                width="50"
            />
            <Button onClick={submitData} style={{ marginTop: 20, marginLeft: 20 }} variant="contained" color="primary">Add to list</Button>
        </div>
    );

}


