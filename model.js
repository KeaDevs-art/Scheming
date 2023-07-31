const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  object: {
    type: String,
    default: "visitors",
  },
  typeOfVisitor: {
    type: String,
    required: [true, "Please provide type of visitor."],
    enum: ["Friends & Family", "Delivery", "Other"],
  },
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: [true, "We'd love to know your first name!"],
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: [true, "We'd love to know your last name!"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  identification: {
    type: String,
    required: [
      true,
      "Please provide a type of identification. (Your ID number or passport number.)",
    ],
    trim: true,
  },
  numberPlate: {
    type: String,
  },
  companyName: {
    type: String,
    trim: true,
  },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Properties",
    required: true,
  },
  unitId: {
    type: Schema.Types.ObjectId,
    ref: "Units",
    required: true,
  },
  duration: {
    type: String,
    required: [
      true,
      "Oops! We didn't get for how long you gonna be visiting us.",
    ],
  },
});

visitorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "propertyId",
    select:
      "propertyName propertyType buildingName address city country postalCode propertyImage propertyBlock",
  });
  this.populate({
    path: "unitId",
    select:
      "unitName unitNumber unitOwnerName numberOfBedrooms numberOfBathRooms unitType RentAmount parkingGarage floorNumber Amenities surfaceArea Description leaseTerm rentalRates maximumOccupancy Location CondoAssociationFees petPolicy propertyTaxes ",
  });
  next();
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
