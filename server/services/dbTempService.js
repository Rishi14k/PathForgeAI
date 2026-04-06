const RoadmapWeek = require("../models/RoadmapWeek");

const updateExistingWeeks = async () => {
  try {
    const result = await RoadmapWeek.updateMany(
      { isCompleted: { $exists: false } }, // Find docs where the field doesn't exist
      { $set: { isCompleted: false } }      // Set the default value
    );
    
    console.log(`Successfully updated ${result.modifiedCount} documents.`);
  } catch (error) {
    console.error("Error updating documents:", error);
  }
};
module.exports = updateExistingWeeks