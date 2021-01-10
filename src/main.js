import ZoomTo from "./Incidents/ZoomTo";
import FollowPath from "./Incidents/FollowPath";

export default {
  npm_name: "motorcortex-2dcam",
  incidents: [
    {
        exportable: ZoomTo,
        name: "ZoomTo",
        attributesValidationRules: {
            animatedAttrs: {
                type: 'object',
                props: {
                    position: {
                        type: 'object',
                        props: {
                            x: {
                                type: 'number',
                                optional: true,
                                min: 0
                            },
                            y: {
                                type: 'number',
                                optional: true,
                                min: 0
                            },
                            zoom: {
                                type: 'number',
                                optional: true,
                                min: 0
                            }
                        }   
                    }
                }
            }
        }
    },
    {
        exportable: FollowPath,
        name: 'FollowPath',
        attributesValidationRules: {
            animatedAttrs: {
                type: 'object',
                props: {
                    position: {
                        type: 'object',
                        props: {
                            path: {
                                type: 'string',
                                optional: false
                            },
                            zoom: {
                                type: 'number',
                                optional: true,
                                min: 0
                            }
                        }       
                    }
                }
            },
            transition: {
                type: 'number',
                integer: true,
                min: 0,
                optional: true
            },
            from: {
                type: 'number',
                min: 0,
                max: 1,
                optional: true
            },
            to: {
                type: 'number',
                min: 0,
                max: 1,
                optional: true
            }
        }
    }
  ],
  compositeAttributes: {
      position: ['x', 'y', 'zoom', 'path']
  }
};