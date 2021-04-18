import React, {useEffect, useState} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditList from './EditList';


  export default function List() {
    
    const [todos, setTodos] = useState([]);

    // Delete Todo by ID

    const deleteTodo = async (id) => {
        try{ 
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            
          console.log(deleteTodo);
        }catch(err){
            console.error(err.message);
        }
    }




    const getTodos = async () => {
        try{ 
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);  // Populates todo with Json data from the database
            console.log(jsonData);
        }catch(err){
            console.error(err.message);
        }
    }

    // Does the fetch all the time automatically
    useEffect(() => {   
        getTodos();
    })

    return (
    <React.Fragment>
     
      <Table size="small" style={{marginTop: 50}}>
        <TableHead style={{marginTop:20, marginBottom: 20}}>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
            {todos.map(todo => (
            <TableRow key={todo.todo_id}>
              <TableCell>{todo.todo_id}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell><EditList todo = {todo}/></TableCell>
              <TableCell>

                <Button onClick={() => {deleteTodo(todo.todo_id)}} variant="contained" color="secondary" size="small">Delete</Button>

              </TableCell>
            </TableRow>
            ))}
           
        </TableBody>
      </Table>
    </React.Fragment>
     
    );
  }


