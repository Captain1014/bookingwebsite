import express from "express";
import { get } from "mongoose";
import { createHotel, getHotel, getHotels, updateHotel, deleteHotel } from "../controllers/hotelController.js";
// import {
//   countByCity,
//   countByType,
//   createHotel,
//   deleteHotel,
//   getHotel,
//   getHotelRooms,
//   getHotels,
//   updateHotel,
// } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
// import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", createHotel);


//UPDATE
router.put("/:id", updateHotel);
// router.put("/:id", verifyAdmin, updateHotel);
// //DELETE

router.delete("/:id", deleteHotel);

// router.delete("/:id", verifyAdmin, deleteHotel);
// //GET
router.get("/:id", getHotel);
// router.get("/find/:id", getHotel);
// //GET ALL 
router.get("/", getHotels);

// router.get("/", getHotels);
// router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);

export default router;
