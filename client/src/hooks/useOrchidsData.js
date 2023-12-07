import { useState } from 'react';
import * as orchidService from "../services/orchidService.js";
import orchids from "../../../server/data/orchids.json";


export const useOrchidsData = () => {

  const [orchidsData, setOrchidsData] = useState(orchids);

  const fetchOrchids = async () => {
    try {
      const result = await orchidService.getAll();
      setOrchidsData((prevOrchids) => [...prevOrchids, ...result]);
    } catch (error) {
      console.error('Error fetching orchids:', error);
    }
  };

  const getOrchidById = (orchidId) => {
    return orchidsData.find((orchid) => orchid._id === orchidId) || null;
  };

  const isInEditMode = (orchidId, userEmail) => {
    return orchidId === userEmail;
  };


  return { orchidsData, fetchOrchids, getOrchidById, isInEditMode };
};
