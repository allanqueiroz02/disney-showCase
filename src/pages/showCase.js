import React from "react";
import api from "../services/api";
import MenuBar from "../components/menuBar";

import Container from "@mui/material/Container"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '63%',
    bgcolor: '#ff9200',
    border: '2px solid #0900ff',
    boxShadow: 24,
    p: 4
};

const ShowCase = () => {
    const [characterData, setCharacterData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [character, setCharacter] = React.useState({});
    const [filter, setFilter] = React.useState("");

    const handleOpen = (updateClickedCharacter) => { setOpen(true); setCharacter(updateClickedCharacter) }
    const handleClose = () => setOpen(false);

    React.useEffect(async () => {
        try {
            const res = await api.get("/characters");
            console.log(res.data);
            setCharacterData(res.data)
        } catch (error) {
            console.log("É, deu erro", error);
        }
    }, [])

    const ModalCharacter = () => {
        return <div>
            <Modal open={open}
                onClose={handleClose}>
                <Box sx={styleModal}>
                    <Typography variant="h4" >
                        Olá, me chamo {character.name}
                    </Typography>
                    <Divider sx={{ margin: 1 }} />
                    <ShowDescriptionItem variant="h6" characterItem={character.allies}>-Aliados:</ShowDescriptionItem>
                    <ShowDescriptionItem variant="h6" characterItem={character.enemies}>-Inimigos:</ShowDescriptionItem>
                    <ShowDescriptionItem variant="h6" characterItem={character.films}>-Filmes:</ShowDescriptionItem>
                    <ShowDescriptionItem variant="h6" characterItem={character.parkAttractions}>-Atrações:</ShowDescriptionItem>
                    <ShowDescriptionItem variant="h6" characterItem={character.shortFilms}>-Curtas:</ShowDescriptionItem>
                    <ShowDescriptionItem variant="h6" characterItem={character.tvShows}>-Programas de TV:</ShowDescriptionItem>
                    <ShowDescriptionItem variant="h6" characterItem={character.videoGames}>-Jogos de Videogame:</ShowDescriptionItem>
                </Box>
            </Modal>
        </div>
    }
    const ShowDescriptionItem = ({ variant, characterItem, children }) => {
        return <React.Fragment>
            <Typography variant={variant} >
                {children}{characterItem.length ? <ul>
                    {
                        characterItem.map(item => <li key={item}>{item}</li>)
                    }
                </ul> : "Não possui"}
            </Typography>
        </React.Fragment>

    }

    return (
        <>
            <MenuBar setFilter={setFilter}/>
            <Container maxWidth="lg">
                {
                    characterData.data ? <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}>
                        {   !filter ?
                            characterData.data.map((item) => (
                                <div key={item._id}>
                                    <Card sx={{
                                        margin: 2,
                                        width: 180
                                    }}>
                                        <CardActionArea onClick={() => handleOpen(item)}>
                                            <CardMedia component="img"
                                                src={item.imageUrl}
                                                alt={
                                                    `character's card: ${item.name}`
                                                }
                                                height="160"
                                                sx={
                                                    { objectFit: "fill" }
                                                } />
                                            <Divider sx={
                                                { margin: 1 }
                                            } />
                                            <CardContent>
                                                <Typography gutterBottom variant="h7">
                                                    {item.name} </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            )) : characterData.data.map(item =>{
                                if(item.name.toLowerCase().includes(filter.toLowerCase()))
                                return (
                                    <div key={item._id}>
                                    <Card sx={{
                                        margin: 2,
                                        width: 180
                                    }}>
                                        <CardActionArea onClick={() => handleOpen(item)}>
                                            <CardMedia component="img"
                                                src={item.imageUrl}
                                                alt={
                                                    `character's card: ${item.name}`
                                                }
                                                height="160"
                                                sx={
                                                    { objectFit: "fill" }
                                                } />
                                            <Divider sx={
                                                { margin: 1 }
                                            } />
                                            <CardContent>
                                                <Typography gutterBottom variant="h7">
                                                    {item.name} </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                                )
                            })
                        }

                        <Stack spacing={2}>
                            <Pagination count={characterData.totalPages}
                                variant="outlined"
                                shape="rounded"
                                showFirstButton
                                showLastButton
                                sx={{
                                    padding: 3,
                                    marginLeft: 3
                                }} />
                        </Stack>
                    </Box> : <h3>CARREGANDO</h3>
                }
            </Container>
            {open ? <ModalCharacter /> : null}
        </>
    )
}

export default ShowCase;
