/* eslint-disable @typescript-eslint/no-explicit-any */
import './addTable.scss';

import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { UseMutationResult } from '@tanstack/react-query';
import { ITable } from 'apps/libs/types/src';

interface Props {
  elementCount: number;
  createTable: UseMutationResult<void, Error, Partial<ITable>, unknown>;
}

export const AddTable = ({ createTable, elementCount }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const turnEditModeOn = () => {
    setEditMode(true);
  };

  const turnEditModeOff = () => {
    setEditMode(false);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    createTable.mutate({ order: elementCount, tasks: [], title });
  };

  return editMode ? (
    <form className="edit-table" onSubmit={onSubmit}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        size="small"
      />
      <section className="edit-table__buttons">
        <Button
          variant="contained"
          size="small"
          sx={{
            fontSize: '10px',
            padding: '6px 8px',
            fontWeight: '600',
          }}
          type="submit"
        >
          Create table
        </Button>
        <IconButton sx={{ padding: 0 }} onClick={turnEditModeOff}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </section>
    </form>
  ) : (
    <div className="add-table" onClick={turnEditModeOn}>
      <span className="add-table__plus">+</span>Create a table
    </div>
  );
};
