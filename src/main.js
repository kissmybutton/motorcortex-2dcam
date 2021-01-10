import ZoomTo from "./Incidents/ZoomTo";
import PanOnPath from "./Incidents/PanOnPath";

export default {
  npm_name: "motorcortex-2dcam",
  incidents: [
    {
        exportable: ZoomTo,
        name: "ZoomTo",
      // define your attributeValidationRules so MotorCortex can automatically validate them on instantiation 
      // also so your Incidents are directly embedable to DonkeyClip
    //   attributesValidationRules: {}
    },
    {
        exportable: PanOnPath,
        name: 'PanOnPath'
    }
  ],
  compositeAttributes: {
      position: ['x', 'y', 'zoom', 'path']
  }
};