
import express from 'express';
import multer from 'multer';
import path from 'path';
import Car from '../models/car.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = file.fieldname + '-' + Date.now() + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });


router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();

    
    const carsWithImageURLs = cars.map(car => ({
      ...car._doc,
      image: `http://localhost:6969/uploads/${car.image}`  
    }));

    res.status(200).json(carsWithImageURLs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cars', error: err.message });
  }
});



router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const {
      brand,
      model,
      rent,
      sheat,
      fuel,
      run,
      location,
      desc,
      features
    } = req.body;

    const car = new Car({
      brand,
      model,
      rent,
      sheat,
      fuel,
      run,
      location,
      desc,
      features: JSON.parse(features),
      image: req.file.filename
    });

    await car.save();
    res.status(201).json({ message: 'Car added successfully', car });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add car', error: err.message });
  }
});


router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;

    const updates = {
      ...req.body,
      features: JSON.parse(req.body.features)
    };

    
    if (req.file) {
      updates.image = req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update car', error: err.message });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete car', error: err.message });
  }
});


export default router;
