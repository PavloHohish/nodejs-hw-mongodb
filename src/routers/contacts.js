import { Router } from 'express';
import {
  getContactController,
  getContactsController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', ctrlWrapper(getContactController));

router.post('/', ctrlWrapper(addContactController));

router.put('/:id', ctrlWrapper(upsertContactController));

router.patch('/:id', ctrlWrapper(patchContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

export default router;
