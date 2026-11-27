import {useState} from 'react';


// Initial packing items
//const initialItems = [
//  { id: 1, description: "Shirt", quantity: 5, packed: false },
//  { id: 2, description: "Pants", quantity: 2, packed: true },
//];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({onAddItem}) {
  const [description, setDesc]= useState("")
  const [quantity, setQua]= useState(1)

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
  

    onAddItem(newItem);
    setDesc("");
    setQua(1);
   }


   return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select value={quantity} onChange= {(e) => setQua(Number(e.target.value))}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <input value={description} type="text" placeholder="Item..." onChange= {(e) => setDesc(e.target.value)}/>

      <button>Add</button>
      
    </form>
  );
}

function PackingList({itemProp}) {

  function Item({itemProp}) {
    return(
      <li>
        <span
         style= {{textDecoration: itemProp.packed ? 'line-through': 'none'}}
        >
          {itemProp.description} ({itemProp.quantity})
        </span>
      </li>
    )
  }
  return (
    <div className="list">
      <ul>
        {itemProp.map((item) => (
          <Item itemProp={item} key={item.id}/>
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems]= useState([])

    function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item])
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems}/>
      <PackingList itemProp={items}/>
      <Stats />
    </div>
  );
}

export default App;
