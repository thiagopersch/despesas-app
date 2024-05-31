import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

const Uploader = () => {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleUploadImage = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);

    axios
      .post('/upload-image', formData)
      .then((response) => {
        setImageUrl(response.data.imageUrl);
        setUploading(false);
      })
      .catch((error) => {
        console.error(error);
        setUploading(false);
      });
  };

  return (
    <div>
      <Grid
        container
        direction="row-reverse"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleImageChange}
          hidden
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Escolher imagem
          </Button>
        </label>
        {!uploading && !imageUrl && (
          <Typography variant="body1" color="error">
            Sem imagem anexada!
          </Typography>
        )}
        {uploading && <Typography variant="body1">Uploading...</Typography>}

        {!uploading && imageUrl && (
          <Image
            src={imageUrl}
            width={300}
            height={300}
            quality={80}
            alt="Uploaded Image"
          />
        )}
      </Grid>
    </div>
  );
};

export default Uploader;
