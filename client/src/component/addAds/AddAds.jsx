import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AddAds.css'
import { axiosInstance } from '../../config';
import { TextareaAutosize } from '@mui/material';

export default function AddAds() {
    const [open, setOpen] = useState(false);

    const [newAdDetails, setNewAdDetails] = useState({
        companyName: "",
        primaryText: "",
        headline: "",
        description: "",
        CTA: "",
        imageUrl: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const newAd = async (data) => {
        const res = await axiosInstance.post('/createAd', data).catch((err) => {
            window.alert(Object.values(err.response.data.message)[0]);
        });
        if (res.status === 201) window.alert("Ad Created");
    }

    const handleAdd = () => {
        const newAdData = { ...newAdDetails };
        newAd(newAdData);
        setNewAdDetails("");
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = ({ target: { name, value } }) => {
        setNewAdDetails({ ...newAdDetails, [name]: value });
    };

    return (
        <div className='create_new_Ad_button'>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                style={{
                    'fontWeight': 'bolder',
                    'fontSize': '15px',
                    'padding': '8px 15px',
                    'backgroundColor': 'black'
                }}
            >
                Create New Ad
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Ad</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        style={{ fontSize: '18px', fontWeight: 'bold' }}
                    >
                        Important : <br />
                        1.) Image url must be a google drive image link. <br />
                    </DialogContentText>
                    <div style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: '0.5rem',
                        marginTop: '15px'
                    }}>
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Company Name"
                            name="companyName"
                            required
                            type='text'
                        />
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Headline"
                            name="headline"
                            required
                            type='text'
                        />
                        <TextareaAutosize
                            onChange={handleInput}
                            type='text'
                            placeholder='Primary Text'
                            name='primaryText'
                            style={{ fontSize: '15px', padding: '15px' }}
                        />
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Description"
                            name="description"
                            type='text'
                        />
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="CTA"
                            name="CTA"
                            required
                            type='text'
                        />
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Image Url"
                            name="imageUrl"
                            required
                            type='url'
                        />

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ backgroundColor: 'black' }} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" style={{ backgroundColor: 'black' }} onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}