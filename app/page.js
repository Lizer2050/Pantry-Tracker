

// import styles from "./page.module.css";

'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {Box, Typography, Modal, Stack, TextField, Button} from '@mui/material'
import { collection, doc, getDoc, getDocs, query, setDoc, deleteDoc } from "firebase/firestore";
import SearchBar from './search';
import {db} from "../firebase"

export default function Home() {
 
// SETTING STATES
 //Set state for inventory (that is the list of items)
 const[inventory, setInventory] = useState([])

 //Set state for portal
 const[open,setOpen] = useState(false)

 //Set state to store name of item added to the inventory
 const[itemName, setItemName] = useState('')



// UPDATE INVENTORY
 const updateInventory = async () => {
  const snapshot = query(collection(firestore, 'inventory'))
  const docs = await getDocs(snapshot)
  const inventoryList = []
  docs.forEach((doc) => {
    inventoryList.push({
      name: doc.id,
      ...doc.data()
    })
  })
  setInventory(inventoryList)
 }


 //  ADDING ITEM FROM AN INVENTORY
const addItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const {quantity} = docSnap.data()
    await setDoc(docRef, {quantity: quantity +1})
  }else{
    await setDoc(docRef, {quantity: 1})
  }

  await updateInventory()
}


//  REMOVING ITEM FROM AN INVENTORY
const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    const {quantity} = docSnap.data()
    if (quantity === 1) {
      await deleteDoc(docRef)
    }
    else {
      await setDoc(docRef, {quantity: quantity -1})
    }
  }

  await updateInventory()
}


//  UsiNg useEffect for to update the chnages that will be made in the inventory.
 useEffect(() => {
  updateInventory()
 }, [])


 // Adding Helper models functions
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)


// Search Bar functionalities
const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    // Here, you can add logic to fetch search results from an API or filter your data.
    // For example:
    const response = await getDocs(collection(db, 'inventory'));
    const data = await response.json();
    setResults(data.results);
  };

  const [searchTerm, setSearchTerm] = useState('');

  // Recording the typing event
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    conolse.log(event)
  };


  const filteredItems = inventory.filter(item => 
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  /*const filteredItems = inventory.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );*/



  // const data =  response.docs.map(doc => doc.data());

return (
  <Box width="100vw"
  height="100vh"
  display="flex"
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  gap={2}
  >

    <Modal open = {open} onClose = {handleClose}>
      <Box
      position = 'absolute'
      top = "50%"
      left = "50%"
      width = {400}
      // transform = "translate(-50%, -50%)"
      bgcolor = "white"
      border = "2px solid #000"
      boxShadow = {24}
      p= {4}
      display = "flex"
      flexDirection = "column"
      gap = {3}
      sx = {{
        transform: "translate(-50%, -50%)"
      }}
      >
       <Typography variant = "h6"> Add Item </Typography> 

       <Stack width = "100%" direction = "row" spacing = {2}>
         <TextField
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value)
          }}
        />
         <Button
          variant="outlined"
          onClick={() => {
            addItem(itemName)
            setItemName('')
            handleClose()
          }}>
          ADD
         </Button>
       </Stack>
      </Box>
    </Modal>

    <Button
    variant="contained"
    onClick={() => {
      handleOpen()
    }}>
      Add New Item
    </Button>

    
   
    {/* <SearchBar onSearch={handleSearch} />
      <Typography>
      {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </Typography> */}


       {/* SEARCH */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for an item..."
      />

      <button type="submit">Search</button>


    <Box border = "1px solid #333">

      {/* Box for the Title */}
      <Box 
       width = "800px"
       height="100px" 
       bgcolor='#ADD8E6'
       display="flex"
       alignItems='center'
       justifyContent="center">
        <Typography variant='h2' color='#333'>
          Inventory Items
        </Typography>
      </Box>

      <Stack width='800px' height='300px' spacing={2} overflow='auto'>
        {inventory.map(({name, quantity}) => (
          <Box 
           key={name}
           width='100%'
           minheight='150px'
           display='flex'
           alignItems ="center"
           justifyContent='space-between'
           bgcolor="#f0f0f0"
           padding={5}
           >
            <Typography variant='h3' color = '#333' textAlign='center'>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>

            <Typography variant='h3' color='#333' textAlign='center'>
              {quantity}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button 
               variant="contained"
               onClick={() => {
                addItem(name)
              }}>
                Add
              </Button>

              <Button 
               variant="contained"
               onClick={() => {
                removeItem(name)
              }}>
                Remove
              </Button>
            </Stack>

          </Box>
        ))}
      </Stack>


    </Box>

   

  </Box>
);

}













{/* <Typography variant ='h1'>
Inventory Management
</Typography> */}



 



