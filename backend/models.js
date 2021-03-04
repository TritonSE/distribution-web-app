const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableContentSchema = new Schema({
  agencyNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  staff: {
    type: String,
    required: true,
  },
});

const ContactSchema = new Schema({
  contact: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const DistributionDaysSchema = new Schema({
  monday: {
    type: Boolean,
    required: true,
  },
  tuesday: {
    type: Boolean,
    required: true,
  },
  wednesday: {
    type: Boolean,
    required: true,
  },
  thursday: {
    type: Boolean,
    required: true,
  },
  friday: {
    type: Boolean,
    required: true,
  },
  saturday: {
    type: Boolean,
    required: true,
  },
  sunday: {
    type: Boolean,
    required: true,
  },
});

const DistributionTimesSchema = new Schema({
  monday: {
    type: String,
    required: true,
  },
  tuesday: {
    type: String,
    required: true,
  },
  wednesday: {
    type: String,
    required: true,
  },
  thursday: {
    type: String,
    required: true,
  },
  friday: {
    type: String,
    required: true,
  },
  saturday: {
    type: String,
    required: true,
  },
  sunday: {
    type: String,
    required: true,
  },
});

const AgencySchema = new Schema({
  /**
   * Accessing the TableContentSchema
   *
   * Ex. tableContent.name
   */
  tableContent: {
    type: TableContentSchema,
    required: true,
  },
  mainSiteAddress: {
    type: String,
    required: true,
  },
  sanDiegoDistrict: {
    type: String,
    required: true,
  },
  countyDistrict: {
    type: String,
    required: true,
  },
  stateAssemblyDistrict: {
    type: String,
    required: true,
  },
  stateSenateDistrict: {
    type: String,
    required: true,
  },
  federalCongressionalDistrict: {
    type: String,
    required: true,
  },
  additionalAddresses: {
    type: [String],
  },
  billingAddress: {
    type: String,
    required: true,
  },
  billingZipcode: {
    type: String,
    required: true,
  },

  /* Contacts Section */
  contacts: {
    type: [ContactSchema],
    required: true,
  },

  /* Compliance Section */
  scheduledNextVisit: {
    type: String,
    required: true,
  },
  dateOfMostRecentAgreement: {
    type: String,
    required: true,
  },
  dateOfInitialPartnership: {
    type: String,
    required: true,
  },
  fileAudit: {
    type: String,
  },
  monitored: {
    type: String,
    required: true,
  },
  foodSafetyCertification: {
    type: String,
    required: true,
  },

  /* Distribution Section */
  distributionDays: {
    type: DistributionDaysSchema,
    required: true,
  },
  distributionStartTimes: {
    type: DistributionTimesSchema,
    required: true,
  },
  distributionStartDate: {
    type: String,
    required: true,
  },
  distributionFrequency: {
    type: Number,
    required: true,
  },
  userSelectedDates: {
    type: [String],
  },
  userExcludedDates: {
    type: [String],
  },

  // Checkboxes for Distribution Section
  pantry: {
    type: Boolean,
  },
  mealProgram: {
    type: Boolean,
  },
  homeboundDeliveryPartner: {
    type: Boolean,
  },
  largeScaleDistributionSite: {
    type: Boolean,
  },
  residentialFacility: {
    type: Boolean,
  },

  /* Capacity Section */
  // Storage Type
  standAloneFreezer: {
    type: Number,
  },
  freezerFridge: {
    type: Number,
  },
  chestFreezer: {
    type: Number,
  },
  singleDoorFreezer: {
    type: Number,
  },
  freezerFridgeCombo: {
    type: Number,
  },
  walkInFreezer: {
    type: Number,
  },
  doubleDoorFridge: {
    type: Number,
  },
  sideBySideFridge: {
    type: Number,
  },
  singleDoorFridge: {
    type: Number,
  },
  walkInFridge: {
    type: Number,
  },
  dryStorageClimateControl: {
    type: Number,
  },
  dryStorageNonClimateControl: {
    type: Number,
  },

  // Transportation Type
  pickUpTruck: {
    type: Number,
  },
  van: {
    type: Number,
  },
  car: {
    type: Number,
  },

  /* Retail Rescue Section */
  retailRescue: {
    type: Boolean,
  },
  preparedFoodCapacity: {
    type: Boolean,
  },
  capacityWithRRD: {
    type: Boolean,
  },

  /* Demographics Section */
  youth: {
    type: Boolean,
  },
  senior: {
    type: Boolean,
  },
  homeless: {
    type: Boolean,
  },
  veteran: {
    type: Boolean,
  },
  healthcare: {
    type: Boolean,
  },
  college: {
    type: Boolean,
  },
  disabilitySpecific: {
    type: Boolean,
  },
  residential: {
    type: Boolean,
  },
  immigrant: {
    type: Boolean,
  },
});

const Agency = mongoose.model("Agency", AgencySchema);

module.exports = { Agency };
