import { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
function Todolistproject() {
  const [completeScreen, setCompletescreen] = useState(false);
  const [todoItems, setTodoitems] = useState([]);
  const [newTitle, setTitle] = useState();
  const [newDescription, setNewdescription] = useState();
  const [completeTodos,setCompletedTodos]=useState([])
  const [editIndex, setEditIndex] = useState(null);
  
  

  const handleItems = () => {
    if(!newTitle||!newDescription){
      alert("Please fill both title and description")
      return;
    }
    if (editIndex !== null) {
      // If editing an item
      const updatedTodoItems = todoItems.map((item, index) =>
        index === editIndex ? { ...item, title: newTitle, description: newDescription } : item
      );
      setTodoitems(updatedTodoItems);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoItems));
      setEditIndex(null); // Clear the edit index
    } else {
      // If adding a new item
      const newTodoItem = {
        title: newTitle,
        description: newDescription,
      };
      const updatedTodoArr = [...todoItems, newTodoItem];
      setTodoitems(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    }
    setTitle(""); // Clear the input fields
    setNewdescription(""); // Clear the input fields
    
    
    
  };
  const deleteTodoList=(index)=>{
    let reduceTodoList=[...todoItems];
    reduceTodoList.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reduceTodoList));
    setTodoitems(reduceTodoList)
  };
  const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=dd+'-'+mm+'-'+yyy+' at '+h+':'+m+':'+s;
    let filteredItem={
      ...todoItems[index],
      completedOn:completedOn
    };
    let updateCompleteArr=[...completeTodos];
    updateCompleteArr.push(filteredItem)
    setCompletedTodos(updateCompleteArr)
    deleteTodoList(index)
    localStorage.setItem('completedTodos',JSON.stringify(updateCompleteArr))
  }
  const handleCompletedtodos=(index)=>{
    let reduceTodoList=[...completeTodos];
    reduceTodoList.splice(index);
    localStorage.setItem('completedTodos',JSON.stringify(reduceTodoList));
    setCompletedTodos(reduceTodoList)
  }
  const editTodoItem=(index)=>{
    setTitle(todoItems[index].title);
    setNewdescription(todoItems[index].description);
    setEditIndex(index); // Set the index of the item being edited
  }
useEffect(()=>{
  let savedData= JSON.parse(localStorage.getItem('todolist'))
  let savedCompletedTodo= JSON.parse(localStorage.getItem('completedTodos'))
  if(savedData){
    setTodoitems(savedData)
  }
  if(savedCompletedTodo){
    setCompletedTodos(savedCompletedTodo)
  }
},[])
  return (
    <>
      <div className="container ">
         <h2 className="text-center" style={{marginBottom:'2.5rem',fontSize:'2rem'}}>TODO-LIST</h2>
        <div className="todo_content   ">
          <div className="todo_input d-flex flex-column">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control form-control-lg input-one"
              id="title"
              placeholder="Enter title?"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
            required/>
          </div>
          <div className="todo_input d-flex flex-column inputTwo">
            <label htmlFor="d-flex flex-column">Description</label>
            <input
              type="text"
              className="form-control form-control-lg my-1 input-two"
              id="d-flex flex-column"
              placeholder="Enter Description?"
              value={newDescription}
              onChange={(e) => setNewdescription(e.target.value)}
            required/>
          </div>
          <button className="btn btn-primary alig-items-center" onClick={handleItems}>
            Add
          </button>
        </div>
        <div className="todo_list_btn py-3">
          <button
            className={`secondary_Btn p-2 text-white ${
              completeScreen === false && "active"
            }`}
            onClick={() => setCompletescreen(false)}
          >
            Task
          </button>
          <button
            className={`secondary_Btn p-2 text-white ${
              completeScreen === true && "active"
            }`}
            onClick={() => setCompletescreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo_list_items my-2">
          <ul className="ul">
            {completeScreen===false && todoItems.map((item, index) => (
              <li key={index} className="item-data">
                <div className="todotext">
                <div className="parent-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                </div>
                <div className="icons">
                <MdOutlineDelete onClick={()=>deleteTodoList(index)} size='25' className="del-btn" title="Delete?"/>
                <FaCheck onClick={()=>handleComplete(index)} size='25'style={{color:' rgb(82, 216, 82)',cursor:'pointer'}} title="Complete?"/>
                <FaEdit onClick={() => editTodoItem(index)} size='25' className="edit-btn"/>
                </div>
                </div>
              </li>
            ))}
             {completeScreen===true && completeTodos.map((item, index) => (
              <li key={index} className="item-data">
                <div className="complete-item-parent">
                <div className="complete-item">
                <h2 style={{padding:'0.2rem 1rem'}}>{item.title}</h2>
                <p className="completed-data">{item.description}</p>
                <p style={{padding:'0.2rem 1rem'}}><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div className="icons complete-icon">
                <MdOutlineDelete onClick={()=>handleCompletedtodos(index)} size='25' className="del-btn" title="Delete?"/>
                
                </div>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todolistproject;
