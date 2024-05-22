import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

type EditToolbarProps = {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
};

const EditToolbar = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer
      sx={{ display: 'flex', margin: '1rem', justifyContent: 'flex-end' }}
    >
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Adicionar
      </Button>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
