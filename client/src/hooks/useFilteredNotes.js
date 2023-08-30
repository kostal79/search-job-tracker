import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pageLimit } from '../constants';
import { useSearchParams } from 'react-router-dom';
import { setNotes } from '../redux/slices/noteSlice';

export default function useFilteredNotes(notes) {
    const dispatch = useDispatch();
    const [searchParams, _] = useSearchParams();
    const activePage = Number(searchParams.get("page")) || 1;
    const notesStore = useSelector(state => state.notes.notes)
    
    useEffect(() => {
      dispatch(setNotes(notes));
    }, [searchParams]);
    
    return notesStore.slice((activePage -1) * pageLimit, activePage * pageLimit + 1);
}
