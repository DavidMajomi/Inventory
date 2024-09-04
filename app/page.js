'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import {firestore} from '@/firebase'
import { Box, Modal, Button, Typography, Stack, TextField } from "@mui/material";
import { query, getDocs, getDoc, setDoc, deleteDoc, collection } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory ] = useState([])
  const [open, setOpen ] = useState(false)
  const [itemName, setItemName] = useState("")

  async function updateInventory() {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  async function removeItem(item) {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity > 1) {
        await setDoc(docRef, {
          quantity: quantity - 1
        })
      } else if (quantity === 1) {
        await deleteDoc(docRef)
      }
    }

    await updateInventory()
  }

  async function addItem(item) {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, {
        quantity: quantity + 1
      })
    } else {
      await setDoc(docRef, {qauntity: 1})
    }
    await updateInventory()
  }
  useEffect(() => {
    updateInventory()
  }, [])


  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <> 
    <Box width="100vw" height="100vh" display="flex" justifyContent="center"
    alignItems="center" flexDirection="column" gap={2}>
      <Modal
      open={open}
      onclose={handleClose}
      >
        <Box position={"absolute"} top="50%" left="50%"
        sx={{transform: 'translate(-50%, -50%'}} width={400} bgcolor="white"
        border="2px solid #000" boxShadow={24} p={4} display="flex"
        flexDirection="column" gap={3}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value)
            }}
            />
            <Button variant="outlined" onClick={() => {
              addItem(itemName)
              setItemName("")
              handleClose()
            }}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* <Typography variant="h1" > Inventory management</Typography> */}
      <Button variant="contained" onClick={() => {
        handleOpen()

      }}> Add new Item </Button>
      <Box border="1px solid #333">
        <Box
        width="800px"
        height="100px"
        bgcolor="#ADD8E6"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        >
          <Typography variant="h2" color="#333">
            Inventory items
          </Typography>

        </Box>
        <Stack width={"800px"} height={"300px"} spacing={2} overflow="auto">
          {
            inventory.map(({name, quantity}) => (
              <Box key={name} width="100%" display={"flex"} minHeight={"150px"}
              alignItems="center" bgcolor={"#f0f0f0"} justifyContent="space-between"
              padding={5}>
                <Typography variant="h3" color="#333" textAlign={"center"}> {name.charAt(0).toUpperCase() + name.slice(1)} </Typography>
                <Typography variant="h3" color="#333" textAlign={"center"}> {quantity} </Typography>
                <Button variant="contained" onClick={() => removeItem(name)}>Remove</Button>
              </Box>
            ))
          }
        </Stack>
      </Box>
    </Box>
    </>
  );
}
