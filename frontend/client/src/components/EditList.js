import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

// export default below
const EditList = ({todo}) => {

        const [open, setOpen] = React.useState(false);
        const [description, setDescription] = useState(todo.description);
        console.log(todo);

             // HANDKE MATERIAL UI DIALOG BOX
            const handleClickOpen = () => {
                setOpen(true);
            }
            const handleCancelClose = () => {
                setOpen(false);
            }


            // SENDS PUT UPDATE REGUEST TO DATABASE
            const updateDescription = async (e) => {
            e.preventDefault();
            try {
                const body = { description };
                const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                
                console.log(response);
                setOpen(false);
            } catch (err) {
    
                console.error(err.message);
            }


        }
    return(
        <div>
        <Button onClick={handleClickOpen} variant="contained" color="primary">Edit</Button>

        <Dialog open={open} onClose={handleCancelClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit description
                  
                </DialogTitle>
                <DialogContent style={{width:600}}>
                  
                <InputLabel style={{marginTop: 20}}>Description</InputLabel>
                    <Input   
                        margin="dense"
                        id="description"
                        label="Description"
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth 
                    /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={e => updateDescription(e)} color="primary" size="small">
                        Save edit
                    </Button>
                </DialogActions>
            </Dialog>

            </div>
    )
};

export default EditList;