import { useEffect, useState } from "react"
import { DUMMY_DATA } from "../../testData"
import { Tab, Tabs, Box, TextField } from "@mui/material"
import TableWrapper from "./TableWrapper"

 
const MainPage = () => {
    const [nameInput, setNameInput] = useState("")
    const [surnameInput, setSurnameInput] = useState("")
    const [idInput, setIdInput] = useState<number>(-1)
    const [dataToShow, setDataToShow] = useState(DUMMY_DATA)
    const [skolenieInput, setSkolenieInput] = useState("")

    const columns = Object.keys(DUMMY_DATA[0]).map(k =>{
        return {
            id: k,
            label: k,
            minWidth: 120,
            format: null,
        }
    })

    console.log(columns);
    

    const [columnsToShow, setColumnsToShow] = useState(columns)

    useEffect(
        () => {
            setDataToShow(DUMMY_DATA
                .filter(row => {
                        return (row['meno'].toLowerCase().startsWith(nameInput)) && 
                            (row['priezvisko'].toLowerCase().startsWith(surnameInput))&&
                            (idInput === -1 ? true : row['id'] === idInput)
            }))
        },
        [nameInput, idInput, surnameInput]
    )

    useEffect(
        () => {
            console.log(skolenieInput);
            
            setColumnsToShow(columns
                .filter(col =>{
                    return (col['id'] === 'meno') ||
                        (col['id'] === 'priezvisko') ||
                        (col['id'] === 'id') ||
                        (col['id'].toLowerCase().startsWith(skolenieInput)) 
                }

                )
                )
        },
        [skolenieInput]
    )



    return(
        <>
        <Box display={"flex"} flexDirection={"row"}>
            <Tabs orientation="vertical" value={1}>
                <Tab label="Konciace skolenia" value={0}/>
                <Tab label="Zakladne skolenia" value={1}/>
                <Tab label="Skolenia" value={2}/>
            </Tabs>
            <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} flexDirection={"row"}>
                    <TextField
                        id="ID"
                        label="ID"
                        type="number"
                        defaultValue=""
                        onChange={e => setIdInput(e.target.value !== "" ? parseInt(e.target.value) : -1)}
                    />
                    <TextField
                        id="Meno"
                        label="Meno"
                        defaultValue=""
                        onChange={e => setNameInput(e.target.value.toLowerCase())}
                    />
                    <TextField
                        id="Priezvisko"
                        label="Priezvisko"
                        defaultValue=""
                        onChange={e => setSurnameInput(e.target.value.toLowerCase())}
                    />
                    <TextField
                        id="Skolenie"
                        label="Skolenie"
                        defaultValue=""
                        onChange={e => setSkolenieInput(e.target.value.toLowerCase())}
                    />
                </Box>
                <TableWrapper rows={dataToShow} columns={columnsToShow}/>
            </Box>
            
        </Box>
        
        </>
    )
}
export default MainPage