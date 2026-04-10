const canGenerateRoadmap = (user) => {
  if (user.planType === "paid") return true;

  return user.roadmapGenerated < 1;
};


const canUseDiscovery = (user) => {
  if (user.planType === "paid") return true;

  return user.discoveryGenerated < 2;
};

module.exports = {
    canGenerateRoadmap,
    canUseDiscovery
}