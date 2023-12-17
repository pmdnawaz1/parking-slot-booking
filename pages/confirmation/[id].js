// pages/confirmation/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchSlotById } from '../../utils/api';

const Confirmation = () => {
  const router = useRouter();
  const { id } = router.query;
  const [confirmedSlot, setConfirmedSlot] = useState(null);

  useEffect(() => {
    const getConfirmedSlot = async () => {
      try {
        const slot = await fetchSlotById(id);
        setConfirmedSlot(slot);
      } catch (error) {
        // Handle error
        console.error('Error fetching confirmed slot:', error);
      }
    };

    getConfirmedSlot();
  }, [id]);

  if
